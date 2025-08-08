import { useReadingProgress } from "@/hooks/useReadingProgress";

const ReadingProgress = () => {
  const progress = useReadingProgress();
  return (
    <div className="fixed inset-x-0 top-0 z-40 h-1">
      <div className="h-full bg-primary" style={{ width: `${progress}%` }} aria-hidden="true" />
      <span className="sr-only">Reading progress {Math.round(progress)} percent</span>
    </div>
  );
};

export default ReadingProgress;
