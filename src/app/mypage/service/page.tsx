'use client';

import React from 'react';

import { serviceMarkdown } from '@/constants/terms/service';
import { MarkdownRenderer } from '@/features/common/components/MarkdownRenderer/MarkdownRenderer';
import { Title } from '@/shared';

export default function TermsPage() {
  return (
    <div>
      <Title title="이용약관" iconVariant="back" />
      <div className="flex flex-col gap-1 leading-relaxed hide-scrollbar">
        {MarkdownRenderer(serviceMarkdown)}
      </div>
    </div>
  );
}
