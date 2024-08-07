import { Application } from 'pixijs';
import Room from "./Room";
import Background from '@/objects/battlefield/Background';
import Slot from '@/objects/battlefield/plantPicker/Slot';
import PlantPicker from '@/objects/battlefield/plantPicker/PlantPicker';

export default class Battlefield extends Room{
  
 constructor(app: Application) {
   super(app);
   
  this.addObject(new Background());

  const plantPicker = new PlantPicker();

   for(let i = 0; i < 8; i++) {
    const slot = new Slot(plantPicker, 20, 80*i + 20);
    slot.slotId = i;
    this.addObject(slot);
   }
   
 }
}