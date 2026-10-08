# MCP çağrısı (8 Ekim)

## Claude (.mcp.json, --mcp-config)
```
1. Geç ya da hiç gelmeyen bildirim — 229,5 · 2. İptal ücreti ve politikası — 192,0 · 3. Ödeme hatası — 113,3
```

## Codex (.codex/config.toml [mcp_servers.radar])

İlk deneme: `MCP tool call requires approval, but approval policy is never`. Başsız modda onay sorulamaz. `default_tools_approval_mode = "approve"` eklendi (iki araç da yalnız okur).
```
mcp: radar/radar_ozet started
mcp: radar/radar_ozet (completed)
```
