#!/bin/bash
mkdir -p output

# .git, .github 디렉토리 제외하고 전체 복사
rsync -av --progress ./ output --exclude .git --exclude .github

cat <<EOF >> output/README.md

## Auto Deploy Info
- **Deployed from**: ${GITHUB_REPOSITORY}
- **Commit**: ${GITHUB_SHA}
- **Branch**: ${GITHUB_REF_NAME}
- **Deploy Date**: $(date)
- **Vercel URL**: https://www.ufo-fi.store
EOF
