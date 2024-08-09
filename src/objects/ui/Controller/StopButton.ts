import GameObject from "@/objects/GameObject";
import StopButtonData from "@/objects/ui/Controller/StopButtonData.json";

export default class StopButton extends GameObject {

  beforeInit() {
    Object.assign(this, StopButtonData);
  }
  onPointerDown(){
    const {room} = this;
    if(!room) return;
    room.freezed = !room.freezed;
  }
}