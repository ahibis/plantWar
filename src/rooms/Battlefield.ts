import { Application } from 'pixijs';
import Room from "./Room";
import Background from '../objects/ui/background';
import Slot from '../objects/ui/slot';

export default class Battlefield extends Room{

 constructor(app: Application) {
   super(app);
   this.addObject(new Background());
   this.addObject(new Slot());
 }
}