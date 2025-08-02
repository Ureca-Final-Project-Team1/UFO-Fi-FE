'use client';

import React from 'react';

import { privacyMarkdown } from '@/constants/terms/privacy';
import { MarkdownRenderer } from '@/features/common/components/MarkdownRenderer/MarkdownRenderer';
import { Title } from '@/shared';

export default function TermsPage() {
  return (
    <div>
      <Title title="개인정보 처리방침" iconVariant="back" />
      <div className="flex flex-col gap-1 leading-relaxed hide-scrollbar">
        {MarkdownRenderer(privacyMarkdown)}
      </div>
    </div>
  );
}
