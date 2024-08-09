import { Application, Container, Ticker } from "pixi.js";
import ObjectGroup from "@/objects/ObjectGroup";
import GameObject from "@/objects/GameObject";
import AnimatedObject from "@/objects/AnimatedObject";
export default class Room {
  app: Application;
  objects: GameObject[] = [];
  container = new Container();
  updatableObjects: (GameObject | ObjectGroup)[] = [];
  keyDownObjects: (GameObject | ObjectGroup)[] = [];
  AnimatedObjects: AnimatedObject[] = [];
  _intervalId:NodeJS.Timeout|undefined;
  _fps = 60;
  _freezed = false;

  get fps() {
    return this._fps;
  }
  set fps(fps: number) {
    this._fps = fps;
    clearInterval(this._intervalId);
    this.registerUpdatableObject();
    this.AnimatedObjects.map(object => object.animationMultiplier = fps/60);
  }
  registerUpdatableObject() {
    this._intervalId = setInterval(() => {
      this.updatableObjects.forEach((object) => {
        if ("onUpdate" in object) {
          (object.onUpdate as Function)();
        }
      });
    }, 1000/this._fps)
  }

  async addObject(object: GameObject) {
    await object.register(this);
    this.objects.push(object);
    if ("onKeyDown" in object) {
      this.keyDownObjects.push(object);
    }
    if ("onUpdate" in object) {
      this.updatableObjects.push(object);
    }
    this.container.addChild(object.sprite);
    if(object instanceof AnimatedObject){
      this.AnimatedObjects.push(object)
    }
  }
  
  addObjectGroup(objectGroup: ObjectGroup) {
    this.container.addChild(objectGroup.container);
    if ("onKeyDown" in objectGroup) {
      this.keyDownObjects.push(objectGroup);
    }
    if ("onUpdate" in objectGroup) {
      this.updatableObjects.push(objectGroup);
    }
  }

  constructor(app: Application) {
    this.app = app;
    this.container.sortableChildren = true;
    this.app.stage.addChild(this.container);
    this.registerUpdatableObject();

    document.addEventListener("keydown", (e) => {
      this.keyDownObjects.forEach((object) => {
        if ("onKeyDown" in object) {
          (object.onKeyDown as Function)(e);
        }
      });
    });
  }
}
