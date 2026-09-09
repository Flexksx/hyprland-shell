import BatteryService from "gi://AstalBattery"
import { createBinding } from "ags"

export default function Battery() {
  const battery = BatteryService.get_default()
  const percentage = createBinding(battery, "percentage")
  const iconName = createBinding(battery, "batteryIconName")
  const charging = createBinding(battery, "charging")

  return (
    <box
      name="battery"
      visible={createBinding(battery, "isBattery")}
      tooltipText={charging.as((c) => (c ? "Charging" : "On Battery"))}
    >
      <image iconName={iconName} />
      <label label={percentage.as((p) => `${Math.round(p * 100)}%`)} />
    </box>
  )
}
