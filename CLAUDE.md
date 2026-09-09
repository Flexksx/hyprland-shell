# Hyprland Shell

Desktop shell for Hyprland, built with AGS (Aylur's GTK Shell) and Astal.

## Stack

- **Runtime**: GJS (GNOME JavaScript) with TypeScript and TSX
- **UI toolkit**: GTK4 via Astal bindings
- **Styling**: SCSS compiled to GTK CSS (not web CSS)
- **Packaging**: Nix flake, `ags bundle` for production builds
- **Shell**: direnv + `nix develop`
- **Task runner**: moon (caching, affected detection), just (entry point)
- **Formatting/Linting**: Biome
- **Import analysis**: dependency-cruiser

## Commands

`just` is the only entry point. Never write `moon run` directly.

```bash
just run            # run the shell in dev mode
just build          # bundle for production
just format         # format affected files
just lint           # lint affected files
just check          # format + lint (check only)
just fix            # format + lint with auto-fix
just inspect        # open GTK inspector
just deps           # check for circular dependencies
just deps-graph     # generate dependency graph SVG
```

To bypass cache, pass `-f`: `just format -- -f`

## Project structure

```
app.ts                   # entry point, calls app.start()
env.d.ts                 # type declarations for SCSS/CSS/Blueprint imports
style.scss               # global GTK stylesheet
widget/                  # TSX widget components
  Bar.tsx                # top bar
moon.yml                 # moon project config (tasks, file groups)
.moon/workspace.yml      # moon workspace config
biome.json               # biome formatter/linter config
justfile                 # command recipes (thin wrappers around moon)
bin/format-lint-hook     # Claude Code PostToolUse hook
.dependency-cruiser.cjs  # import graph rules
flake.nix                # nix flake with ags/astal inputs
```

## How AGS/Astal works

- Widgets are TSX functions that return GTK widget trees.
- The root widget is always a `<window>`.
- Lowercase JSX tags map to GTK4 intrinsics (`<box>`, `<button>`, `<label>`).
- Uppercase tags are custom components.
- State uses `createState`, `createBinding`, or `createPoll`.
- Styling uses GTK CSS, not web CSS. Check GTK docs for supported properties.
- `app.start({ css, main })` boots the application.

## Astal libraries (enabled in flake.nix)

- `battery` - UPower battery status
- `bluetooth` - BlueZ control
- `hyprland` - Hyprland IPC
- `mpris` - media player control
- `network` - NetworkManager
- `notifd` - notification daemon
- `tray` - system tray
- `wireplumber` - audio control
- `apps` - application launcher queries
- `powerprofiles` - power profile control

## Rules

- All packages come from `nix develop`. Do not use npm/pnpm install.
- The `node_modules/` directory contains Nix symlinks. Do not modify it.
- GTK CSS is not web CSS. Do not assume web properties work.
- One widget per file in `widget/`.
- Keep widget files under 150 lines. Extract sub-components when they grow.
- Run `just check` before committing.
