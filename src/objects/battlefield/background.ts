import Object from "../Object";

export default class Background extends Object {
  textures = {
    base: {
      src: "background.png",
    },
  };
  texturePath = "/ui/background/";
  onInit(): void {
    this.chosenTexture = "base";
    if (this.sprite) {
      this.sprite.zIndex = -10;
    }
  }
  texturesSrcs = ["/ui/background/background.png"];
}
