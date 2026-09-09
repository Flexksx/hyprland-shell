# Hyprland Shell

# Run the shell in dev mode
run:
    ags run .

# Bundle for production
build:
    ags bundle app.ts ./result/bin/hyprland-shell

# Format all source files
format:
    biome format --write .

# Lint all source files
lint:
    biome lint .

# Format and lint (check only, no fixes)
check:
    biome check .

# Format and lint with fixes
fix:
    biome check --write .

# Open GTK inspector
inspect:
    ags inspect

# Check import graph for circular dependencies
deps:
    npx dependency-cruiser --config .dependency-cruiser.cjs app.ts

# Generate dependency graph as SVG
deps-graph:
    npx dependency-cruiser --config .dependency-cruiser.cjs --output-type dot app.ts | dot -T svg > deps.svg
