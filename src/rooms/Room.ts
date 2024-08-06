import { Application } from 'pixijs';
import Object from '../objects/Object';
export default class Room{
  app: Application;
  objects: Object[] = [];
  fps = 60;
  addObject(object: Object){
    object.register();
    this.objects.push(object);
    if(!object.sprite) return;
    this.app.stage.addChild(object.sprite);
  }
  
  init(){

  }
  constructor(app: Application){
    this.app = app;
    this.init();
    this.objects.map(object => object.sprite);
  }
}