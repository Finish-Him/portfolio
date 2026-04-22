import type { Express, Request, Response } from "express";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
import { ENV } from "./_core/env";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import * as db from "./db";
import type { User } from "../drizzle/schema";

// Hardcoded users
const SIMPLE_USERS: Record<string, { password: string; name: string; email: string; role: "admin" | "user" }> = {
  admin: { password: "admin", name: "Admin", email: "admin@mscacademy.com", role: "admin" },
  Moises: { password: "admin", name: "Moises Costa", email: "moises@mscacademy.com", role: "admin" },
};

function getSecret() {
  return new TextEncoder().encode(ENV.cookieSecret || "msc-academy-secret-key-2024");
}

async function createToken(username: string, name: string): Promise<string> {
  const issuedAt = Date.now();
  const expirationSeconds = Math.floor((issuedAt + 365 * 24 * 60 * 60 * 1000) / 1000);
  return new SignJWT({
    openId: `simple_${username}`,
    appId: ENV.appId || "msc-academy",
    name,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(expirationSeconds)
    .sign(getSecret());
}

export async function authenticateSimple(req: Request): Promise<User | null> {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;

  const cookies = parseCookieHeader(cookieHeader);
  const sessionCookie = cookies[COOKIE_NAME];
  if (!sessionCookie) return null;

  try {
    const { payload } = await jwtVerify(sessionCookie, getSecret(), { algorithms: ["HS256"] });
    const openId = payload.openId as string;
    if (!openId) return null;

    const user = await db.getUserByOpenId(openId);
    return user ?? null;
  } catch {
    return null;
  }
}

export function registerSimpleAuthRoutes(app: Express) {
  // Login endpoint
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Usuário e senha são obrigatórios" });
      }

      const user = SIMPLE_USERS[username];
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Usuário ou senha incorretos" });
      }

      // Upsert user in DB
      const openId = `simple_${username}`;
      await db.upsertUser({
        openId,
        name: user.name,
        email: user.email,
        role: user.role,
        loginMethod: "simple",
        lastSignedIn: new Date(),
      });

      // Create JWT token
      const token = await createToken(username, user.name);

      // Set cookie
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, token, {
        ...cookieOptions,
        maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
      });

      const dbUser = await db.getUserByOpenId(openId);
      return res.json({ success: true, user: dbUser });
    } catch (error) {
      console.error("[SimpleAuth] Login error:", error);
      return res.status(500).json({ error: "Erro interno" });
    }
  });

  // Check session endpoint
  app.get("/api/auth/check", async (req: Request, res: Response) => {
    const user = await authenticateSimple(req);
    if (user) {
      return res.json({ authenticated: true, user });
    }
    return res.json({ authenticated: false, user: null });
  });
}
