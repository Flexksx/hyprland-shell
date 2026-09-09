{inputs, ...}: {
  perSystem = {
    pkgs,
    system,
    ...
  }: let
    ags = inputs.ags.packages.${system};

    astalPackages = with ags; [
      io
      astal4
      battery
      bluetooth
      hyprland
      mpris
      network
      notifd
      tray
      wireplumber
      apps
      powerprofiles
    ];

    extraPackages =
      astalPackages
      ++ [
        pkgs.libadwaita
        pkgs.libsoup_3
      ];
  in {
    shellPackages =
      astalPackages
      ++ [
        (ags.default.override {inherit extraPackages;})
      ];
  };
}
