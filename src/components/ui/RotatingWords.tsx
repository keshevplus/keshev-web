interface RotatingWordsProps {
  words: string[];
  className?: string;
}

// Stacks each word in the same position, taking turns fading in/out via the
// existing .animate-word-cycle keyframe (9s loop), staggered so only one is
// visible at a time - loops forever, no JS state or extra dependency needed.
export default function RotatingWords({ words, className }: RotatingWordsProps) {
  const cycleSeconds = 9;
  return (
    <span className="relative inline-grid align-bottom">
      {words.map((word, idx) => (
        <span
          key={word}
          className={`animate-word-cycle ${className ?? ''}`}
          style={{ gridArea: '1 / 1', animationDelay: `${(idx * cycleSeconds) / words.length}s` }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
