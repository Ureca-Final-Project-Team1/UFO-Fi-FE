'use client';

import React from 'react';

import { serviceMarkdown } from '@/constants/terms/service';
import { renderTermsWithHeadingsAndLinks } from '@/constants/terms/termsRenderer';
import { Title } from '@/shared';

export default function TermsPage() {
  return (
    <div>
      <Title title="이용약관" iconVariant="back" />
      <div className="flex flex-col gap-1 leading-relaxed hide-scrollbar">
        {renderTermsWithHeadingsAndLinks(serviceMarkdown)}
      </div>
    </div>
  );
}
