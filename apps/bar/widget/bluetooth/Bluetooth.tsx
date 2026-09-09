import BluetoothService from "gi://AstalBluetooth"
import { createBinding } from "ags"

export default function Bluetooth() {
  const bluetooth = BluetoothService.get_default()
  const isPowered = createBinding(bluetooth, "isPowered")

  return (
    <box
      name="bluetooth"
      tooltipText={isPowered.as((on) => (on ? "Bluetooth On" : "Bluetooth Off"))}
    >
      <image
        iconName={isPowered.as((on) =>
          on ? "bluetooth-active-symbolic" : "bluetooth-disabled-symbolic",
        )}
      />
    </box>
  )
}
