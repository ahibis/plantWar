import Object from "../Object";

export default class Background extends Object {
  onInit(): void {
    if(this.sprite){
      this.sprite.zIndex = 1;
      this.sprite.x = 100;
      console.log(this.sprite)
    }
  }
  texturesSrcs = ["/ui/background/background.png"];
}