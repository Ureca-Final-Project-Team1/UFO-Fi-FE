'use client';

import React from 'react';

import serviceRaw from '@/assets/terms/service.md?raw';
import { Icon } from '@/shared';
import { renderTermsWithHeadingsAndLinks } from '@/shared/utils/termsRenderer';

export default function TermsPage() {
  return (
    <div>
      <div className="relative w-full flex items-center py-4 px-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
          aria-label="back 버튼"
        >
          <Icon name="ChevronLeft" size="md" color="white" className="w-6 h-6 text-white" />
        </button>
        <h1 className="body-20-bold text-white w-full text-center">이용약관</h1>
      </div>
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
