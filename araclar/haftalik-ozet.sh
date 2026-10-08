#!/bin/zsh
# Haftalık özeti başsız Claude Code ile üretir. Bilgisayar açıkken cron/launchd ile çalıştırılabilir;
# bilgisayar kapalıyken çalışması gerekiyorsa bulut routine'i kullanın (sunum bölüm 15).
cd "${0:a:h}/.."
claude -p "$(cat docs/otomasyon/haftalik-ozet.md)" \
  --mcp-config .mcp.json \
  --allowedTools "mcp__radar__radar_ozet,Read,Glob,Edit(docs/haftalik/*)" \
  --permission-mode acceptEdits --model haiku < /dev/null
