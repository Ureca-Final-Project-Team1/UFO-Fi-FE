module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'docs',
        'test',
        'chore',
        'style',
        'delete',
        'move',
        'update',
        'ci', // CI 관련
        'build', // 빌드 관련
      ],
    ],
    'subject-case': [0], // 한글 허용
    'header-max-length': [0], // 길이 제한 해제
  },

  // 무시할 패턴
  ignores: [
    (message) => message.startsWith('Merge pull request'), // PR 머지
    (message) => message.startsWith('Merge branch'), // 브랜치 머지
    (message) => message.includes('Merge remote-tracking branch'), // 원격 브랜치 머지
    (message) => message.startsWith('UF-'), // UF-123: 제목
    (message) => message.startsWith('[UF-'), // [UF-123] 제목
    (message) => /^UF-\d+/.test(message), // UF-숫자
    (message) => /^\[UF-\d+\]/.test(message), // [UF-숫자]
    (message) => message.startsWith('Revert'), // 리버트 커밋
    (message) => message.startsWith('Initial commit'), // 초기 커밋
  ],
};
