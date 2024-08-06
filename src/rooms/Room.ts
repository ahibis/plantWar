import { Application, Container } from 'pixijs';
import Object from '../objects/Object';
export default class Room{
  app: Application;
  objects: Object[] = [];
  container = new Container();
  async addObject(object: Object){
    await object.register(this);
    this.objects.push(object);
    if(!object.sprite) return;
    this.container.addChild(object.sprite);
    
  }
  
  constructor(app: Application){
    this.app = app;
    this.container.sortableChildren = true;
    this.app.stage.addChild(this.container);
  }
}