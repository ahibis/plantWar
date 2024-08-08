import { Application, Container } from "pixi.js";
import ObjectGroup from "@/objects/ObjectGroup";
import GameObject from "@/objects/GameObject";
export default class Room {
  app: Application;
  objects: GameObject[] = [];
  container = new Container();
  updatableObjects: GameObject[] = [];
  registerUpdatableObject(object: GameObject) {
    this.updatableObjects.push(object);
  }
  removeUpdatableObject(object: GameObject) {
    const index = this.updatableObjects.indexOf(object);
    if (index !== -1) this.updatableObjects.splice(index, 1);
  }
  async addObject(object: GameObject) {
    await object.register(this);
    this.objects.push(object);
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
    this.app.ticker.add(() => {
      this.updatableObjects.forEach((object) => {
        object.onUpdate();
      });
    });
  }
}
