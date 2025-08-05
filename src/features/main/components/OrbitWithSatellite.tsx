'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { nextApiRequest } from '@/backend/client/axios';
import { LetterDisplay } from '@/backend/types/letters';
import { IMAGE_PATHS } from '@/constants';
import { SpeechBubble } from '@/shared';
import { SpaceMailModal } from '@/shared/ui/Modal/SpaceMailModal';

const ORBIT_BASE_SIZE = 600;
const SATELLITE_WIDTH = 30;
const SATELLITE_HEIGHT = 60;
const ORBIT_COUNT = 5;

const orbitConfigs = [
  { color: '#FFD230', speed: 'spin-slow', image: '/images/main/satellite1.svg' },
  { color: '#70C3BB', speed: 'spin-fast', image: '/images/main/satellite2.svg' },
  { color: '#67CBDC', speed: 'spin-reverse-slow', image: '/images/main/satellite3.svg' },
  { color: '#735AB1', speed: 'spin-mid', image: '/images/main/satellite4.svg' },
  { color: '#D24D9B', speed: 'spin-reverse-fast', image: '/images/main/satellite5.svg' },
];

export default function OrbitWithSatellite() {
  const [letters, setLetters] = useState<LetterDisplay[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchLetters() {
      try {
        // 먼저 POST 요청 → 생성 여부 확인
        const postRes = await nextApiRequest.post('/api/story/letters');
        const { isAdded } = postRes.data as { isAdded: boolean };

        // 그 다음 GET 요청 → 편지 리스트 가져오기
        const getRes = await nextApiRequest.get('/api/story/letters');
        const data = getRes.data as LetterDisplay[];

        const mapped = data.map((letter) => ({
          step: Number(letter.step),
          content: letter.content,
          recipient_name: letter.recipient_name,
        }));

        setLetters(mapped);

        // 새로 생성된 경우만 모달 열기
        if (isAdded) {
          setIsModalOpen(true);
        }
      } catch (e) {
        console.error('편지 불러오기 실패:', e);
        toast.error('편지를 불러오는데 실패했습니다. 다시 시도해주세요.');
      }
    }

    fetchLetters();
  }, []);

  return (
    <div
      className="absolute"
      style={{
        top: '50%',
        left: '50%',
        width: ORBIT_BASE_SIZE,
        height: ORBIT_BASE_SIZE,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {orbitConfigs.map(({ color, speed, image }, i) => {
        const orbitSize = ORBIT_BASE_SIZE - (ORBIT_COUNT - 1 - i) * 80;
        const offset = (ORBIT_BASE_SIZE - orbitSize) / 2;
        const satelliteTransform = `translate(-50%, -${orbitSize / 2 + SATELLITE_HEIGHT / 2}px)`;

        if (letters.length > i) {
          return (
            <div key={i}>
              <div
                className={`absolute rounded-full border-2 border-dashed ${speed}`}
                style={{
                  width: orbitSize,
                  height: orbitSize,
                  top: offset,
                  left: offset,
                  borderColor: `${color}50`,
                  zIndex: 5 - i,
                }}
              >
                <div
                  className="absolute"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: satelliteTransform,
                  }}
                >
                  <Image
                    src={image}
                    alt={`Satellite ${i + 1}`}
                    width={SATELLITE_WIDTH}
                    height={SATELLITE_HEIGHT}
                  />
                </div>
              </div>
            </div>
          );
        }
      })}

      {/* 중앙 행성 + 외계인 */}
      <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 relative w-auto h-[220px]">
        {/* 말풍선 */}
        <div className="absolute top-[-90px] left-1/2 -translate-x-1/2 z-20">
          <SpeechBubble tailDirection="bottom">지구인님, 오늘 거래하실 건가요?</SpeechBubble>
        </div>
        {/* 외계인 */}
        <Image
          src={IMAGE_PATHS.ALIEN}
          alt="Alien"
          width={100}
          height={100}
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: '-15px', zIndex: 1 }}
        />
        {/* 행성 */}
        <Image
          src={IMAGE_PATHS.MY_PLANET}
          alt="MyPlanet"
          width={200}
          height={200}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        />
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .spin-slow {
          animation: spin 20s linear infinite;
        }
        .spin-mid {
          animation: spin 15s linear infinite;
        }
        .spin-fast {
          animation: spin 10s linear infinite;
        }
        .spin-reverse-slow {
          animation: spin-reverse 18s linear infinite;
        }
        .spin-reverse-mid {
          animation: spin-reverse 14s linear infinite;
        }
        .spin-reverse-fast {
          animation: spin-reverse 10s linear infinite;
        }
      `}</style>

      {letters.length > 0 && (
        <SpaceMailModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          name={letters.at(-1)?.recipient_name ?? '웃기는 지구인'}
        />
      )}
    </div>
  );
}
