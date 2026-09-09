# Hyprland Shell

Desktop shell for Hyprland, built with AGS (Aylur's GTK Shell) and Astal.

## Stack

- **Runtime**: GJS (GNOME JavaScript) with TypeScript and TSX
- **UI toolkit**: GTK4 via Astal bindings
- **Styling**: SCSS compiled to GTK CSS (not web CSS)
- **Packaging**: Nix flake (`flake-parts` + `import-tree`)
- **Shell**: direnv + `nix develop`
- **Task runner**: moon (caching, `--affected`), just (entry point)
- **Formatting/Linting**: Biome
- **Import analysis**: dependency-cruiser

## Commands

`just` is the only entry point. Never write `moon run` in docs or scripts.

```bash
just format         # format affected files
just lint           # lint affected files
just fix            # format + lint with fixes
just build          # build bar
just start          # run bar in dev mode
just inspect        # open GTK inspector
```

To bypass cache, add `-f`: `just format -f`.

## Project structure

```
apps/
  bar/                    # top bar app
    app.ts                # entry point
    widget/Bar.tsx        # bar widget
    style.scss            # GTK stylesheet
    moon.yml              # unit metadata (inherits tasks from tag)
    nix/devshell.nix      # AGS + Astal packages
libs/                     # shared libraries (empty for now)
config/
  dependency-cruiser.base.cjs
nix/
  shell.nix               # shellPackages option + devShell
  devtools.nix             # just, moon, biome, nodejs
  systems.nix              # x86_64-linux
.moon/
  workspace.yml            # project sources
  tasks/ags.yml            # inherited tasks for ags-tagged units
.just/
  format/Justfile          # just format -> moon run :format --affected
  lint/Justfile            # just lint -> moon run :lint --affected
  format/Justfile          # just format -> moon run :format --affected
  lint/Justfile            # just lint -> moon run :lint --affected
biome.json                 # biome config (workspace root)
moon.yml                   # repo-wide tasks (format, lint)
flake.nix                  # flake-parts + import-tree
justfile                   # imports .just modules
```

## How AGS/Astal works

- Widgets are TSX functions that return GTK widget trees.
- The root widget is always a `<window>`.
- Lowercase JSX tags map to GTK4 intrinsics (`<box>`, `<button>`, `<label>`).
- Uppercase tags are custom components.
- State uses `createState`, `createBinding`, or `createPoll`.
- Styling uses GTK CSS, not web CSS. Check GTK docs for supported properties.
- `app.start({ css, main })` boots the application.

## Astal libraries (in apps/bar/nix/devshell.nix)

battery, bluetooth, hyprland, mpris, network, notifd, tray, wireplumber, apps, powerprofiles.

## Rules

- All packages come from `nix develop`. Do not use npm/pnpm install.
- The `node_modules/` directory contains Nix symlinks. Do not modify it.
- GTK CSS is not web CSS. Do not assume web properties work.
- One widget per file.
- Every task sets `toolchains: 'system'`. Moon must not install runtimes.
- A new `.nix` file is invisible to `nix develop` until `git add`.
