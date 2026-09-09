import Hyprland from "gi://AstalHyprland"
import Pango from "gi://Pango"
import { createBinding } from "ags"

export default function ActiveWindow() {
  const hyprland = Hyprland.get_default()
  const title = createBinding(hyprland, "focusedClient", "title")

  return (
    <box cssName="active-window">
      <label
        label={title.as((title) => title ?? "")}
        ellipsize={Pango.EllipsizeMode.END}
        maxWidthChars={40}
      />
    </box>
  )
}
