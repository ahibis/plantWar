import Object from "../Object";

export default class Background extends Object {
  onInit(): void {
    if(this.sprite){
      this.sprite.zIndex = -10;
      console.log(this.sprite)
    }
  }
  texturesSrcs = ["/ui/background/background.png"];
}