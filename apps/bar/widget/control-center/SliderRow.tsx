import { Astal } from "ags/gtk4"
import { type Accessor } from "ags"

type SliderRowProps = {
  icon: string | Accessor<string>
  value: Accessor<number>
  onChanged: (value: number) => void
  max?: number
}

export default function SliderRow({ icon, value, onChanged, max = 1 }: SliderRowProps) {
  return (
    <box cssName="slider-row" spacing={8}>
      <image iconName={icon} />
      <slider
        hexpand
        value={value}
        max={max}
        min={0}
        onValueChanged={(self: Astal.Slider) => onChanged(self.get_value())}
      />
    </box>
  )
}
