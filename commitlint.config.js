module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "refactor",
        "docs",
        "test",
        "chore",
        "style",
        "delete",
        "move",
        "update",
      ],
    ],
    "subject-case": [0], // 한글 허용
  },
};
