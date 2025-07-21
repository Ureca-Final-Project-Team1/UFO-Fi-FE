'use client';

import React from 'react';

import privacyRaw from '@/assets/terms/privacy.md?raw';
import { Title } from '@/shared';
import { renderTermsWithHeadingsAndLinks } from '@/shared/utils/termsRenderer';

export default function TermsPage() {
  return (
    <div>
      <Title title="개인정보 처리방침" iconVariant="back" />
      <div className="text-white overflow-y-auto text-sm max-h-[80vh] p-2 rounded-lg flex flex-col gap-1 leading-relaxed hide-scrollbar">
        {renderTermsWithHeadingsAndLinks(privacyRaw)}
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </div>
  );
}
