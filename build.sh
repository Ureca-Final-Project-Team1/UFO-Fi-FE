#!/bin/bash
mkdir -p output

# 숨김 파일 포함 전체 복사
shopt -s dotglob
cp -r ./* output/
shopt -u dotglob

cat <<EOF >> output/README.md

## Auto Deploy Info
- **Deployed from**: ${GITHUB_REPOSITORY}
- **Commit**: ${GITHUB_SHA}
- **Branch**: ${GITHUB_REF##*/}
- **Deploy Date**: $(date)
- **Vercel URL**: https://www.ufo-fi.store
EOF
