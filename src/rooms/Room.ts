import { Application } from 'pixijs';
import Object from '../objects/Object';
export default class Room{
  app: Application;
  objects: Object[] = [];
  async addObject(object: Object){
    await object.register(this);
    this.objects.push(object);
    if(!object.sprite) return;
    this.app.stage.addChild(object.sprite);
  }
  
  constructor(app: Application){
    this.app = app;
  }
}