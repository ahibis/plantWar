import GameObject from "@/objects/GameObject";
import StopButtonData from "./StopButtonData.json";

export default class StopButton extends GameObject {

  beforeInit() {
    Object.assign(this, StopButtonData);
  }
  onInit(): void {
      console.log(this)
  }
  onPointerDown(){
    const {room} = this;
    if(!room) return;
    room.freezed = !room.freezed;
    if(this.textureMode === "pause"){
      this.textureMode = "play";
    }else{
      this.textureMode = "pause";
    }
  }
}