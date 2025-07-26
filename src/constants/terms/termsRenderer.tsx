import React from 'react';

/**
 * 약관/정책 텍스트를 heading, 리스트, 링크 등으로 변환하여 렌더링하는 함수
 * @param text - 마크다운 스타일의 약관/정책 원본 텍스트
 */
export function renderTermsWithHeadingsAndLinks(text: string) {
  const lines = text.split('\n');
  const result: React.ReactNode[] = [];
  let olBuffer: string[] = [];
  let ulBuffer: string[] = [];
  let isOl = false;
  let isUl = false;

  const processLinks = (text: string) => {
    const parts = [];
    let lastIndex = 0;

    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    const urlRegex = /((?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s\)]*)?)/g;

    const matches = [];
    let match;

    while ((match = emailRegex.exec(text)) !== null) {
      matches.push({
        type: 'email',
        value: match[1],
        index: match.index,
        length: match[1].length,
      });
    }

    while ((match = urlRegex.exec(text)) !== null) {
      if (!match[1].includes('@')) {
        matches.push({
          type: 'url',
          value: match[1],
          index: match.index,
          length: match[1].length,
        });
      }
    }

    matches.sort((a, b) => a.index - b.index);

    matches.forEach((matchItem, idx) => {
      if (matchItem.index > lastIndex) {
        const beforeText = text.slice(lastIndex, matchItem.index);
        if (beforeText) {
          parts.push(beforeText);
        }
      }

      if (matchItem.type === 'email') {
        parts.push(
          <a
            key={`email-${idx}`}
            href={`mailto:${matchItem.value}`}
            className="text-blue-400 underline hover:text-blue-300"
          >
            {matchItem.value}
          </a>,
        );
      } else if (matchItem.type === 'url') {
        const fullUrl = matchItem.value.startsWith('http')
          ? matchItem.value
          : `http://${matchItem.value}`;
        parts.push(
          <a
            key={`url-${idx}`}
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-300"
          >
            {matchItem.value}
          </a>,
        );
      }

      lastIndex = matchItem.index + matchItem.length;
    });

    if (lastIndex < text.length) {
      const afterText = text.slice(lastIndex);
      if (afterText) {
        parts.push(afterText);
      }
    }

    return parts.length > 0 ? parts : text;
  };

  const flushOl = (parentIdx: number) => {
    if (olBuffer.length > 0) {
      result.push(
        <ol className="list-decimal pl-6 mb-2" key={'ol-' + parentIdx + '-' + result.length}>
          {olBuffer.map((item, idx2) => (
            <li
              key={'olitem-' + parentIdx + '-' + idx2}
              className="break-words whitespace-pre-line"
            >
              {processLinks(item.replace(/^\d+\.\s/, ''))}
            </li>
          ))}
        </ol>,
      );
      olBuffer = [];
    }
  };

  const flushUl = (parentIdx: number) => {
    if (ulBuffer.length > 0) {
      result.push(
        <ul className="list-disc pl-8 mb-2" key={'ul-' + parentIdx + '-' + result.length}>
          {ulBuffer.map((item, idx2) => (
            <li
              key={'ulitem-' + parentIdx + '-' + idx2}
              className="break-words whitespace-pre-line"
            >
              {processLinks(item.replace(/^[가-힣]\.\s/, '').replace(/^\-\s/, ''))}
            </li>
          ))}
        </ul>,
      );
      ulBuffer = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('# ')) {
      flushOl(i);
      flushUl(i);
      result.push(
        <h1 key={i} className="text-xl font-bold text-white mt-6 mb-2">
          {processLinks(line.replace('# ', ''))}
        </h1>,
      );
      continue;
    }
    if (line.startsWith('## ')) {
      flushOl(i);
      flushUl(i);
      result.push(
        <h2 key={i} className="text-lg font-bold text-white mt-6 mb-2">
          {processLinks(line.replace('## ', ''))}
        </h2>,
      );
      continue;
    }
    if (line.startsWith('### ')) {
      flushOl(i);
      flushUl(i);
      result.push(
        <h3 key={i} className="text-base font-bold text-white mt-4 mb-1">
          {processLinks(line.replace('### ', ''))}
        </h3>,
      );
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      flushUl(i);
      isOl = true;
      isUl = false;
      olBuffer.push(line);
      continue;
    }
    if (/^\-\s/.test(line)) {
      flushOl(i);
      isUl = true;
      isOl = false;
      ulBuffer.push(line);
      continue;
    }
    if (/^\s{2,}.+/.test(line) && (isOl || isUl)) {
      if (isOl && olBuffer.length > 0) {
        olBuffer[olBuffer.length - 1] += '\n' + line;
      } else if (isUl && ulBuffer.length > 0) {
        ulBuffer[ulBuffer.length - 1] += '\n' + line;
      }
      continue;
    }
    flushOl(i);
    flushUl(i);
    result.push(
      <div key={i} className="whitespace-pre-wrap break-words">
        {line === '' ? <br /> : processLinks(line)}
      </div>,
    );
    isOl = false;
    isUl = false;
  }
  flushOl(lines.length);
  flushUl(lines.length);
  return result;
}
