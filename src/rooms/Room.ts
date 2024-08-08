import { Application, Container } from "pixi.js";
import ObjectGroup from "@/objects/ObjectGroup";
import GameObject from "@/objects/GameObject";
export default class Room {
  app: Application;
  objects: GameObject[] = [];
  container = new Container();
  updatableObjects: (GameObject | ObjectGroup)[] = [];
  keyDownObjects: (GameObject | ObjectGroup)[] = [];
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
    this.app.ticker.deltaMS = 1000 / 60;
    this.app.ticker.add((ticker) => {
      this.updatableObjects.forEach((object) => {
        if ("onUpdate" in object) {
          (object.onUpdate as Function)(ticker);
        }
      });
    });
    document.addEventListener("keydown", (e) => {
      this.keyDownObjects.forEach((object) => {
        if ("onKeyDown" in object) {
          (object.onKeyDown as Function)(e);
        }
      });
    });
  }
}
