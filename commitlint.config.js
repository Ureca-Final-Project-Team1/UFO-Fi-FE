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
    (message) => message.startsWith('Merge pull request'),
    (message) => message.startsWith('Merge branch'),
    (message) => message.includes('Merge remote-tracking branch'),
    (message) => message.startsWith('UF-'),
    (message) => message.startsWith('[UF-'),
    (message) => /^UF-\d+/.test(message),
    (message) => /^\[UF-\d+\]/.test(message),
    (message) => message.startsWith('Revert'),
    (message) => message.startsWith('Initial commit'),
  ],
};
