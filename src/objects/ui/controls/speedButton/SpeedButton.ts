import GameObject from "@/objects/GameObject";
import StopButtonData from "./SpeedButtonData.json";

export default class SpeedButton extends GameObject {

  beforeInit() {
    Object.assign(this, StopButtonData);
  }
  onPointerDown(){
    const {room} = this;
    if(!room) return;
    if(this.textureMode === "speed2"){
      room.fps = 120;
      this.textureMode = "play";
    }else{
      room.fps = 60;
      this.textureMode = "stop";
    }
  }
}