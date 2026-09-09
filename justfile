import '.just/format/Justfile'
import '.just/lint/Justfile'

[private]
default:
    just --list

# Format and lint with fixes
fix *FLAGS:
    moon run :format --affected {{FLAGS}}

# Build bar
build *FLAGS:
    moon run bar:build {{FLAGS}}

# Run bar in dev mode
start *FLAGS:
    moon run bar:start {{FLAGS}}

# Open GTK inspector
inspect:
    ags inspect
