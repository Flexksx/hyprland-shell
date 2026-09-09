import app from "ags/gtk4/app"
import NetworkService from "gi://AstalNetwork"
import BluetoothService from "gi://AstalBluetooth"
import Wp from "gi://AstalWp"
import { createBinding } from "ags"

export default function StatusIndicators() {
  const network = NetworkService.get_default()
  const wifi = network.get_wifi()
  const bluetooth = BluetoothService.get_default()
  const wp = Wp.get_default()!
  const audio = wp.get_audio()!
  const speaker = audio.get_default_speaker()!

  const btPowered = createBinding(bluetooth, "isPowered")
  const volumeIcon = createBinding(speaker, "volumeIcon")
  const volume = createBinding(speaker, "volume")

  return (
    <button
      name="status-indicators"
      onClicked={() => app.toggle_window("control-center")}
      tooltipText={volume.as((v) => `Volume: ${Math.round(v * 100)}%`)}
    >
      <box spacing={6}>
        {wifi && <image iconName={createBinding(wifi, "iconName")} />}
        <image
          iconName={btPowered.as((on) =>
            on ? "bluetooth-active-symbolic" : "bluetooth-disabled-symbolic",
          )}
        />
        <image iconName={volumeIcon} />
      </box>
    </button>
  )
}
