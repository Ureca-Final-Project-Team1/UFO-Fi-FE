#!/bin/bash
mkdir -p output

# .git, .github, output 디렉터리를 제외하고 전체 복사
rsync -av --progress \
  --exclude '.git' \
  --exclude '.github' \
  --exclude 'output' \
  ./  output
  
cat <<EOF >> output/README.md

## Auto Deploy Info
- **Deployed from**: ${GITHUB_REPOSITORY}
- **Commit**: ${GITHUB_SHA}
- **Branch**: ${GITHUB_REF_NAME}
- **Deploy Date**: $(date)
- **Vercel URL**: https://www.ufo-fi.store
EOF
