import { Application, Container, Ticker } from "pixi.js";
import ObjectGroup from "@/objects/ObjectGroup";
import GameObject from "@/objects/GameObject";
export default class Room {
  app: Application;
  objects: GameObject[] = [];
  container = new Container();
  updatableObjects: GameObject[] = [];
  keyDownObjects: GameObject[] = [];
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
  }

  constructor(app: Application) {
    this.app = app;
    this.container.sortableChildren = true;
    this.app.stage.addChild(this.container);
    this.app.ticker.deltaMS = 1000 / 60;
    this.app.ticker.add((ticker: Ticker) => {
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
    })
  }
}
