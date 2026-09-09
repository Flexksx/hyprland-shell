import { Gtk } from "ags/gtk4"
import TrayService from "gi://AstalTray"
import { For, createBinding } from "ags"

function TrayItem({ item }: { item: TrayService.TrayItem }) {
  const gicon = createBinding(item, "gicon")
  const tooltipMarkup = createBinding(item, "tooltipMarkup")
  const menuModel = createBinding(item, "menuModel")

  return (
    <menubutton
      cssName="tray-item"
      tooltipMarkup={tooltipMarkup}
      menuModel={menuModel}
      $={(self: Gtk.MenuButton) => {
        const ag = item.get_action_group()
        if (ag) self.insert_action_group("dbusmenu", ag)
      }}
    >
      <image gicon={gicon} />
    </menubutton>
  )
}

export default function Tray() {
  const tray = TrayService.get_default()
  const items = createBinding(tray, "items")

  return (
    <box cssName="tray">
      <For each={items} id={(item) => item.get_item_id()}>
        {(item) => <TrayItem item={item} />}
      </For>
    </box>
  )
}
