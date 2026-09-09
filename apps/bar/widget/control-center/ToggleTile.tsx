import { Gtk } from "ags/gtk4"
import { type Accessor } from "ags"

type ToggleTileProps = {
  icon: string | Accessor<string>
  label: string | Accessor<string>
  sublabel?: string | Accessor<string>
  active: Accessor<boolean>
  onToggle: () => void
}

export default function ToggleTile({ icon, label, sublabel, active, onToggle }: ToggleTileProps) {
  return (
    <button
      name="toggle-tile"
      cssClasses={active.as((a) => (a ? ["active"] : []))}
      onClicked={onToggle}
    >
      <box spacing={8}>
        <image iconName={icon} />
        <box orientation={Gtk.Orientation.VERTICAL}>
          <label label={label} halign={Gtk.Align.START} />
          {sublabel && (
            <label label={sublabel} halign={Gtk.Align.START} name="toggle-sublabel" />
          )}
        </box>
      </box>
    </button>
  )
}
