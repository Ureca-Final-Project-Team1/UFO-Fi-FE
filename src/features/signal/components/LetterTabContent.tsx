import LetterComponent from './LetterComponent';
import SignalProgressBar from './SignalProgressBar';

export default function LetterTabContent() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
      <div className="z-30 scale-85">
        <SignalProgressBar />
      </div>
      <div>
        <LetterComponent />
      </div>
    </div>
  );
}
