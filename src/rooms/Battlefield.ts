import { Application } from 'pixi.js';
import Room from "./Room";
import Background from '@/objects/battlefield/Background';
import PlantPicker from '@/objects/battlefield/plantPicker/PlantPicker';
import Zombie from '@/objects/enemies/Zombie';
import Controller from '@/objects/ui/controls/Controller';

export default class Battlefield extends Room{
  
 constructor(app: Application) {
   super(app);
   
  this.addObject(new Background());

  const plantPicker = new PlantPicker(this, 20, 20);
  this.addObjectGroup(plantPicker);
  this.addObjectGroup(new Controller(this, 900, 20));

   this.addObject(new Zombie(1000, 200));
 }
}