import GameObject from "@/objects/GameObject";
import { Bounds } from "pixi.js";

export default class ObjectBounds{
 objects: GameObject[] = [];
 bounds = new Bounds(0,0,1366,768);
 
 addObject(object:GameObject){
  this.objects.push(object)
  this.bounds.addBounds(object.sprite.bounds);
 }


}