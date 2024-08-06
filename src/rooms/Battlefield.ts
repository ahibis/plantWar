import { Application } from 'pixijs';
import Room from "./Room";
import Background from '@/objects/battlefield/background';
import Slot from '@/objects/battlefield/slot/slot';

export default class Battlefield extends Room{
  slots: Slot[] = []
  slotActivated = -1;
 constructor(app: Application) {
   super(app);
   
     this.addObject(new Background());

   for(let i = 0; i < 8; i++) {
    const slot = new Slot(20, 80*i + 20);
    slot.slotId = i;
    this.addObject(slot);
    this.slots.push(slot);
   }
   
 }
}