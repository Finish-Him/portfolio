import { motion } from "framer-motion";

type AvatarState = "idle" | "thinking" | "speaking" | "celebrating";

type ArquimedesAvatarProps = {
  state?: AvatarState;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE_MAP = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-28 h-28",
};

const STATE_STYLES: Record<AvatarState, { border: string; animation: any; glow?: string }> = {
  idle: {
    border: "border-msc-purple/50",
    animation: {},
  },
  thinking: {
    border: "border-msc-blue",
    animation: {
      scale: [1, 1.02, 1],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
    glow: "shadow-[0_0_12px_rgba(107,47,160,0.3)]",
  },
  speaking: {
    border: "border-msc-purple",
    animation: {
      scale: [1, 1.04, 1],
      transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
    },
    glow: "shadow-[0_0_16px_rgba(107,47,160,0.5)]",
  },
  celebrating: {
    border: "border-msc-gold",
    animation: {
      scale: [1, 1.08, 1],
      rotate: [0, -3, 3, 0],
      transition: { duration: 1, repeat: 2, ease: "easeInOut" },
    },
    glow: "shadow-[0_0_20px_rgba(212,168,67,0.5)]",
  },
};

export default function ArquimedesAvatar({
  state = "idle",
  size = "md",
  className = "",
}: ArquimedesAvatarProps) {
  const config = STATE_STYLES[state];

  return (
    <motion.div
      className={`relative shrink-0 ${className}`}
      animate={config.animation}
    >
      <img
        src="/manus-storage/Arquimedes_f63227f7.webp"
        alt="Arquimedes"
        className={`${SIZE_MAP[size]} rounded-full object-cover border-2 ${config.border} ${config.glow || ""}`}
      />
      {/* Online indicator */}
      {size !== "lg" && (
        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${
          state === "idle" ? "bg-green-500" :
          state === "thinking" ? "bg-yellow-500" :
          state === "speaking" ? "bg-msc-purple" :
          "bg-msc-gold"
        }`} />
      )}
      {/* State label for large avatar */}
      {size === "lg" && state !== "idle" && (
        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-medium text-white ${
          state === "thinking" ? "bg-msc-blue" :
          state === "speaking" ? "bg-msc-purple" :
          "bg-msc-gold"
        }`}>
          {state === "thinking" ? "Pensando..." :
           state === "speaking" ? "Falando..." :
           "Parabéns!"}
        </div>
      )}
    </motion.div>
  );
}
