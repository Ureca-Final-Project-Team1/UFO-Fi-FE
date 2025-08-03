import LetterComponent from './LetterListComponent';
import SignalProgressBar from './SignalProgressBar';

export default function LetterTabContent() {
  return (
    <section
      aria-label="전파거리 관련 탭 콘텐츠"
      className="w-full h-full flex flex-col justify-center items-center space-y-4"
    >
      <div className="z-30 scale-90">
        <SignalProgressBar />
      </div>
      <article>
        <LetterComponent />
      </article>
    </section>
  );
}
