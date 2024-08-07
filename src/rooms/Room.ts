import { Application, Container } from "pixi.js";
import Object from "../objects/Object";
import ObjectGroup from "@/objects/ObjectGroup";
export default class Room {
  app: Application;
  objects: Object[] = [];
  container = new Container();
  updatableObjects: Object[] = [];
  registerUpdatableObject(object: Object) {
    this.updatableObjects.push(object);
  }
  removeUpdatableObject(object: Object) {
    const index = this.updatableObjects.indexOf(object);
    if (index !== -1) this.updatableObjects.splice(index, 1);
  }
  async addObject(object: Object) {
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
