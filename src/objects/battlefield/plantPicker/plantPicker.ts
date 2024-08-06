import Slot from "./slot";

export default class PlantPicker{
  slots: Slot[] = []
  slotActivatedId = -1;

  chooseSlot(slotId:number){
    this.slotActivatedId = slotId;
    this.slots.forEach(slot => slot.onUpdate());
  }
  constructor(){

  }
}