import { Astal, type Gdk } from "ags/gtk4"
import app from "ags/gtk4/app"
import NetworkService from "gi://AstalNetwork"
import BluetoothService from "gi://AstalBluetooth"
import Wp from "gi://AstalWp"
import Notifd from "gi://AstalNotifd"
import PowerProfiles from "gi://AstalPowerProfiles"
import { createBinding } from "ags"
import { createPoll } from "ags/time"
import { execAsync } from "ags/process"
import ToggleTile from "./ToggleTile"
import SliderRow from "./SliderRow"
import NowPlaying from "./NowPlaying"

const PROFILES = ["balanced", "performance", "power-saver"] as const
const PROFILE_LABELS: Record<string, string> = {
  balanced: "Balanced",
  performance: "Performance",
  "power-saver": "Power Saver",
}

function Toggles() {
  const network = NetworkService.get_default()
  const wifi = network.get_wifi()
  const bluetooth = BluetoothService.get_default()
  const notifd = Notifd.get_default()

  const wifiEnabled = wifi ? createBinding(wifi, "enabled") : null
  const wifiSsid = wifi ? createBinding(wifi, "ssid") : null
  const btPowered = createBinding(bluetooth, "isPowered")
  const dnd = createBinding(notifd, "dontDisturb")

  return (
    <box cssName="toggles" homogeneous spacing={8}>
      <box vertical spacing={8}>
        {wifi && wifiEnabled && wifiSsid && (
          <ToggleTile
            icon={wifiEnabled.as((on) =>
              on ? "network-wireless-symbolic" : "network-wireless-disabled-symbolic",
            )}
            label="Wi-Fi"
            sublabel={wifiSsid.as((s) => s || "Off")}
            active={wifiEnabled}
            onToggle={() => wifi.set_enabled(!wifi.get_enabled())}
          />
        )}
        <ToggleTile
          icon="notifications-disabled-symbolic"
          label="Do Not Disturb"
          active={dnd}
          onToggle={() => notifd.set_dont_disturb(!notifd.get_dont_disturb())}
        />
      </box>
      <box vertical spacing={8}>
        <ToggleTile
          icon={btPowered.as((on) =>
            on ? "bluetooth-active-symbolic" : "bluetooth-disabled-symbolic",
          )}
          label="Bluetooth"
          sublabel={btPowered.as((on) => (on ? "On" : "Off"))}
          active={btPowered}
          onToggle={() => bluetooth.toggle()}
        />
      </box>
    </box>
  )
}

function VolumeSlider() {
  const wp = Wp.get_default()!
  const audio = wp.get_audio()!
  const speaker = audio.get_default_speaker()!

  const volumeIcon = createBinding(speaker, "volumeIcon")
  const volume = createBinding(speaker, "volume")

  return (
    <SliderRow
      icon={volumeIcon}
      value={volume}
      onChanged={(v) => speaker.set_volume(v)}
      max={1.5}
    />
  )
}

function BrightnessSlider() {
  const brightness = createPoll(
    0.5,
    2000,
    ["bash", "-c", "brightnessctl info -m | cut -d, -f4 | tr -d '%'"],
    (stdout) => Number.parseInt(stdout) / 100,
  )

  return (
    <SliderRow
      icon="display-brightness-symbolic"
      value={brightness}
      onChanged={(v) => {
        const pct = Math.round(v * 100)
        execAsync(["brightnessctl", "set", `${pct}%`])
      }}
    />
  )
}

function ProfileSelector() {
  const pp = PowerProfiles.get_default()
  const activeProfile = createBinding(pp, "activeProfile")
  const iconName = createBinding(pp, "iconName")

  return (
    <box cssName="profile-selector" spacing={8}>
      <image iconName={iconName} />
      {PROFILES.map((profile) => (
        <button
          cssName="profile-button"
          cssClasses={activeProfile.as((a) => (a === profile ? ["active"] : []))}
          onClicked={() => pp.set_active_profile(profile)}
          tooltipText={PROFILE_LABELS[profile]}
        >
          <label label={PROFILE_LABELS[profile]} />
        </button>
      ))}
    </box>
  )
}

export default function ControlCenter(gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor

  const win = (
    <window
      visible={false}
      name="control-center"
      cssName="control-center"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.NORMAL}
      anchor={TOP | RIGHT}
      layer={Astal.Layer.TOP}
      application={app}
      keymode={Astal.Keymode.ON_DEMAND}
    >
      <box vertical cssName="control-center-content" spacing={12}>
        <Toggles />
        <box cssName="sliders" vertical spacing={8}>
          <VolumeSlider />
          <BrightnessSlider />
        </box>
        <ProfileSelector />
        <NowPlaying />
      </box>
    </window>
  ) as Astal.Window

  app.add_window(win)
  return win
}
