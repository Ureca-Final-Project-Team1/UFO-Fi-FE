'use client';

import React from 'react';

import serviceRaw from '@/assets/terms/service.md?raw';
import { Title } from '@/shared';
import { renderTermsWithHeadingsAndLinks } from '@/shared/utils/termsRenderer';

export default function TermsPage() {
  return (
    <div>
      <Title title="이용약관" iconVariant="back" />
      <div className="text-white overflow-y-auto text-sm max-h-[80vh] p-2 rounded-lg flex flex-col gap-1 leading-relaxed hide-scrollbar">
        {renderTermsWithHeadingsAndLinks(serviceRaw)}
      </div>
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
