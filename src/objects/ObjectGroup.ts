import GameObject from '@/objects/GameObject';
import Room from '@/rooms/Room';
import { Container } from 'pixi.js';
export default class ObjectGroup{
  container = new Container();
  objects: GameObject[] = [];
  room: Room;
  freezed = false;
  async addObject(object: GameObject){
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