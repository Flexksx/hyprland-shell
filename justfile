# Hyprland Shell

[private]
default:
    just --list

# Format affected files
format *FLAGS:
    moon run :format --affected {{FLAGS}}

# Lint affected files
lint *FLAGS:
    moon run :lint --affected {{FLAGS}}

# Check affected files (no fixes)
check *FLAGS:
    moon run :check --affected {{FLAGS}}

# Format and lint with fixes
fix *FLAGS:
    moon run :fix --affected {{FLAGS}}

# Run the shell in dev mode
run:
    moon run :run

# Bundle for production
build:
    moon run :build

# Open GTK inspector
inspect:
    ags inspect

# Check import graph for circular dependencies
deps:
    moon run :deps

# Generate dependency graph as SVG
deps-graph:
    npx dependency-cruiser --config .dependency-cruiser.cjs --output-type dot app.ts | dot -T svg > deps.svg
