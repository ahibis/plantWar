import Room from '@/rooms/Room';
import ObjectGroup from "@/objects/ObjectGroup";
import Slot from "./Slot";

export default class PlantPicker extends ObjectGroup{
  slots: Slot[] = []
  slotActivatedId = -1;

  selectSlot(slotId:number){
    this.slotActivatedId = slotId;
    this.slots.forEach(slot => slot.onSelected());
  }
  onKeyDown(e:KeyboardEvent) {
    if(Number.parseInt(e.key)) {
      this.selectSlot(Number.parseInt(e.key)-1);
    }
  }
  constructor(room: Room, x=0, y=0) {
    super(room,x, y);
    for(let i = 0; i < 8; i++) {
      const slot = new Slot(this, 0, 80*i);
      this.slots.push(slot);
      slot.slotId = i;
      this.addObject(slot);
     }
  }
}