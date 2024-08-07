import Object from "../Object";

export default class Zombie extends Object {
  id = "zombie";
  texturePath = "/enemies/zombie/";
  texturesSrcs = [
    "zombie0.png",
    "zombie1.png",
    "zombie2.png",
    "zombie3.png",
    "zombie4.png",
    "zombie5.png",
  ];
  onInit(): void {
    this.updatable = true;
  }
  onUpdate(): void {
    this.sprite.x -= 0.5;
  }
  
}
