import ObjectGroup from "@/objects/ObjectGroup";
import Room from "@/rooms/Room";
import SpeedButton from "./speedButton/SpeedButton";
import StopButton from "./stopButton/StopButton";

export default class Controller extends ObjectGroup{
  constructor(room: Room, x=0, y=0) {
    super(room, x, y);
    this.addObject(new SpeedButton());
    this.addObject(new StopButton());
  }
}