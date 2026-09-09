import Hyprland from "gi://AstalHyprland"
import { For, createBinding } from "ags"

function WorkspaceButton({ workspace }: { workspace: Hyprland.Workspace }) {
  const hyprland = Hyprland.get_default()

  return (
    <button
      cssName="workspace-button"
      cssClasses={createBinding(hyprland, "focusedWorkspace").as(
        (focusedWorkspace) =>
          focusedWorkspace?.get_id() === workspace.get_id() ? ["focused"] : [],
      )}
      onClicked={() => workspace.focus()}
    >
      <label label={String(workspace.get_id())} />
    </button>
  )
}

export default function Workspaces() {
  const hyprland = Hyprland.get_default()
  const workspaces = createBinding(hyprland, "workspaces").as((workspaces) =>
    workspaces
      .filter((workspace) => workspace.get_id() > 0)
      .sort((a, b) => a.get_id() - b.get_id()),
  )

  return (
    <box cssName="workspaces">
      <For each={workspaces} id={(workspace) => workspace.get_id()}>
        {(workspace) => <WorkspaceButton workspace={workspace} />}
      </For>
    </box>
  )
}
