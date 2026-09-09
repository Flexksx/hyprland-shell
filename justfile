import '.just/format/Justfile'
import '.just/lint/Justfile'

mod build '.just/build'
mod start '.just/start'

[private]
default:
    just --list --list-submodules

# Format and lint with fixes
fix *FLAGS:
    moon run :format --affected {{FLAGS}}

# Open GTK inspector
inspect:
    ags inspect
