import { eq, and, desc, asc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users,
  topics, InsertTopic, Topic,
  exercises, InsertExercise, Exercise,
  chatSessions, InsertChatSession,
  chatMessages, InsertChatMessage,
  userProgress, InsertUserProgress,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ───
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) { console.error("[Database] Failed to upsert user:", error); throw error; }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Topics ───
export async function getAllTopics() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(topics).orderBy(asc(topics.order));
}

export async function getTopicBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(topics).where(eq(topics.slug, slug)).limit(1);
  return result[0];
}

export async function insertTopic(topic: InsertTopic) {
  const db = await getDb();
  if (!db) return;
  await db.insert(topics).values(topic);
}

// ─── Exercises ───
export async function getExercisesByTopic(topicId: number, level?: string) {
  const db = await getDb();
  if (!db) return [];
  if (level) {
    return db.select().from(exercises)
      .where(and(eq(exercises.topicId, topicId), eq(exercises.level, level as any)));
  }
  return db.select().from(exercises).where(eq(exercises.topicId, topicId));
}

export async function getExerciseById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(exercises).where(eq(exercises.id, id)).limit(1);
  return result[0];
}

export async function insertExercise(exercise: InsertExercise) {
  const db = await getDb();
  if (!db) return;
  await db.insert(exercises).values(exercise);
}

export async function insertExercises(exerciseList: InsertExercise[]) {
  const db = await getDb();
  if (!db) return;
  if (exerciseList.length === 0) return;
  await db.insert(exercises).values(exerciseList);
}

// ─── Chat Sessions ───
export async function createChatSession(session: InsertChatSession) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.insert(chatSessions).values(session);
  return result[0].insertId;
}

export async function getUserChatSessions(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(chatSessions)
    .where(eq(chatSessions.userId, userId))
    .orderBy(desc(chatSessions.updatedAt));
}

export async function getChatSessionById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(chatSessions).where(eq(chatSessions.id, id)).limit(1);
  return result[0];
}

// ─── Chat Messages ───
export async function addChatMessage(message: InsertChatMessage) {
  const db = await getDb();
  if (!db) return;
  await db.insert(chatMessages).values(message);
}

export async function getSessionMessages(sessionId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(chatMessages)
    .where(eq(chatMessages.sessionId, sessionId))
    .orderBy(asc(chatMessages.createdAt));
}

// ─── User Progress ───
export async function getUserProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(userProgress).where(eq(userProgress.userId, userId));
}

export async function upsertUserProgress(data: { userId: number; topicId: number; correct: boolean }) {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select().from(userProgress)
    .where(and(eq(userProgress.userId, data.userId), eq(userProgress.topicId, data.topicId)))
    .limit(1);

  if (existing.length === 0) {
    await db.insert(userProgress).values({
      userId: data.userId,
      topicId: data.topicId,
      exercisesCompleted: 1,
      exercisesCorrect: data.correct ? 1 : 0,
      currentStreak: data.correct ? 1 : 0,
      bestStreak: data.correct ? 1 : 0,
    });
  } else {
    const p = existing[0];
    const newStreak = data.correct ? p.currentStreak + 1 : 0;
    const newBest = Math.max(p.bestStreak, newStreak);
    await db.update(userProgress)
      .set({
        exercisesCompleted: p.exercisesCompleted + 1,
        exercisesCorrect: p.exercisesCorrect + (data.correct ? 1 : 0),
        currentStreak: newStreak,
        bestStreak: newBest,
        lastActivityAt: new Date(),
      })
      .where(eq(userProgress.id, p.id));
  }
}
