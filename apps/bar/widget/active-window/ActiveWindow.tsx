import Hyprland from "gi://AstalHyprland"
import { createBinding } from "ags"

export default function ActiveWindow() {
  const hyprland = Hyprland.get_default()
  const focusedClient = createBinding(hyprland, "focusedClient")

  return (
    <box cssName="active-window">
      <label
        label={focusedClient.as((client) => client?.get_title() ?? "")}
        truncate
        maxWidthChars={40}
      />
    </box>
  )
}
