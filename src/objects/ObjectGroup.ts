import Object from '@/objects/Object';
import Room from '@/rooms/Room';
import { Container } from 'pixi.js';
export default class ObjectGroup{
  container = new Container();
  objects: Object[] = [];
  room: Room;
  async addObject(object: Object){
    await object.register(this.room);
    this.objects.push(object);
    this.container.addChild(object.sprite);
  }
  constructor(room: Room, x=0, y=0){
    this.room = room;
    this.container.sortableChildren = true;
    this.container.x = x;
    this.container.y = y;
  }
}