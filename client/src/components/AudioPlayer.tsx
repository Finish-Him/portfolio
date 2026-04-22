import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Pause, Play, RotateCcw, Loader2 } from "lucide-react";

type AudioPlayerProps = {
  audioUrl: string | null;
  isLoading?: boolean;
  compact?: boolean;
};

export default function AudioPlayer({ audioUrl, isLoading = false, compact = true }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!audioUrl) return;
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setHasEnded(true);
    });
    audio.addEventListener("error", () => {
      setError(true);
      setIsPlaying(false);
    });

    return () => {
      audio.pause();
      audio.removeEventListener("ended", () => {});
      audio.removeEventListener("error", () => {});
    };
  }, [audioUrl]);

  const handlePlay = () => {
    if (!audioRef.current) return;
    if (hasEnded) {
      audioRef.current.currentTime = 0;
      setHasEnded(false);
    }
    audioRef.current.play().catch(() => setError(true));
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const handleReplay = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => setError(true));
    setIsPlaying(true);
    setHasEnded(false);
  };

  if (isLoading) {
    return (
      <Button variant="ghost" size="icon" className="h-7 w-7" disabled>
        <Loader2 className="h-3.5 w-3.5 animate-spin text-msc-purple" />
      </Button>
    );
  }

  if (!audioUrl || error) return null;

  return (
    <div className="inline-flex items-center gap-0.5">
      {isPlaying ? (
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handlePause}>
          <Pause className="h-3.5 w-3.5 text-msc-purple" />
        </Button>
      ) : hasEnded ? (
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleReplay}>
          <RotateCcw className="h-3.5 w-3.5 text-msc-purple" />
        </Button>
      ) : (
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handlePlay}>
          <Play className="h-3.5 w-3.5 text-msc-purple" />
        </Button>
      )}
    </div>
  );
}
