import { Application } from 'pixi.js';
import Room from "./Room";
import Background from '@/objects/battlefield/Background';
import PlantPicker from '@/objects/battlefield/plantPicker/PlantPicker';
import Zombie from '@/objects/enemies/Zombie';

export default class Battlefield extends Room{
  
 constructor(app: Application) {
   super(app);
   
  this.addObject(new Background());

  const plantPicker = new PlantPicker(this, 20, 20);
  this.addObjectGroup(plantPicker);
   
   this.addObject(new Zombie(1000, 200));
 }
}