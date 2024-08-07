import Room from '@/rooms/Room';
import ObjectGroup from "@/objects/ObjectGroup";
import Slot from "./Slot";

export default class PlantPicker extends ObjectGroup{
  slots: Slot[] = []
  slotActivatedId = -1;

  chooseSlot(slotId:number){
    this.slotActivatedId = slotId;
    this.slots.forEach(slot => slot.onUpdate());
  }
  constructor(room: Room, x=0, y=0) {
    super(room,x, y);
    for(let i = 0; i < 8; i++) {
      const slot = new Slot(this, 0, 80*i);
      slot.slotId = i;
      this.addObject(slot);
     }
  }
}