import LetterComponent from './LetterListComponent';
import SignalProgressBar from './SignalProgressBar';

interface LetterTabContentProps {
  tutorialStep: number;
}

export const LetterTabContent = ({ tutorialStep }: LetterTabContentProps) => {
  return (
    <section
      aria-label="전파거리 관련 탭 콘텐츠"
      className="w-full h-full flex flex-col justify-center items-center space-y-4"
    >
      <div className={`scale-90${tutorialStep === 1 ? ' relative z-50' : ''}`}>
        <SignalProgressBar />
      </div>
      <article className={tutorialStep === 2 ? 'relative z-50 overflow-y-hidden' : ''}>
        <LetterComponent />
      </article>
    </section>
  );
};
