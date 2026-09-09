{
  perSystem = {pkgs, ...}: {
    shellPackages = with pkgs; [just moon biome nodejs];
  };
}
