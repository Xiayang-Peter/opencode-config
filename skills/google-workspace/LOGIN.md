# How to log in to Google Workspace (gws-cli)

One-time setup so `gws-cli` can access your Google Workspace (Docs, Sheets, Slides, Drive, Gmail, Calendar, Contacts).

## Prerequisites

- [uv](https://docs.astral.sh/uv/) installed (`curl -LsSf https://astral.sh/uv/install.sh | sh`)
- A Google account (regular Gmail works; Workspace account optional)

## Step 1 — Create OAuth credentials (one time, ~5 min)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select an existing one)
3. Enable the APIs you plan to use:
   - Google Drive API, Google Docs API, Google Sheets API, Google Slides API
   - Gmail API, Google Calendar API, People API
   - (Skip any you don't need — `uvx gws-cli config disable <service>` turns them off)
4. **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Application type: **Desktop application**
6. Download the JSON file
7. Save it as `~/.config/gws-cli/client_secret.json`

```bash
mkdir -p ~/.config/gws-cli
# move/download your downloaded JSON here:
mv ~/Downloads/client_secret_*.json ~/.config/gws-cli/client_secret.json
```

> ⚠️ Note: Google may show "Google hasn't verified this app" — click **Advanced → Go to project (unsafe)**. This is normal for your own OAuth client.

## Step 2 — Authenticate (opens browser)

```bash
uvx gws-cli auth
```

A browser opens → pick your Google account → allow the requested permissions.

> Must be run by **you in your terminal**, not by the AI agent (OAuth needs your browser).

## Step 3 — Verify

```bash
uvx gws-cli auth status
```

You should see the active mode (`local`) and your account. If you get an error, re-run `uvx gws-cli auth --force`.

## Optional — multiple accounts

```bash
uvx gws-cli account add work          # add another Google account (opens browser)
uvx gws-cli account list              # list accounts
uvx gws-cli account default personal  # set the default account
```

## Logout / troubleshooting

```bash
uvx gws-cli auth logout               # revokes token (best-effort)
uvx gws-cli auth --force              # re-authenticate if something breaks
```

### Common errors

| Error | Fix |
|---|---|
| `client_secret.json not found` | Complete Step 1, verify the file path `~/.config/gws-cli/client_secret.json` |
| `access_denied` / "app not verified" | Click **Advanced → Go to project** in the browser; re-run `auth --force` |
| `API not enabled` | Enable the corresponding API in Google Cloud Console, or `config enable <service>` |
| Auth expires later | Tokens refresh automatically; if not, re-run `uvx gws-cli auth` |

## After login

Auth is automatic on subsequent uses — you (or the AI agent) can just run commands:

```bash
uvx gws-cli docs read <document_id>
uvx gws-cli calendar list --max 20
uvx gws-cli gmail send "friend@example.com" "Subject" "Body"
```

All credentials live in `~/.config/gws-cli/` (`client_secret.json`, `token.json`, `gws_config.json`).
