import OrbitWithSatellite from '@/features/main/components/OrbitWithSatellite';
import PlanetProgressBar from '@/features/main/components/PlanetProgressBar';

export default function HomePage() {
  return (
    <div className="w-full min-h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <OrbitWithSatellite />
      </div>

      <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-30">
        <PlanetProgressBar />
      </div>
    </div>
  );
}
