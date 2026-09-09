import NetworkService from "gi://AstalNetwork"
import { createBinding } from "ags"

export default function Network() {
  const network = NetworkService.get_default()
  const wifi = network.get_wifi()

  if (!wifi) {
    return (
      <box name="network">
        <image iconName="network-wired-symbolic" />
      </box>
    )
  }

  const iconName = createBinding(wifi, "iconName")
  const ssid = createBinding(wifi, "ssid")

  return (
    <box name="network" tooltipText={ssid}>
      <image iconName={iconName} />
    </box>
  )
}
