import { Assets, Sprite, Texture } from "pixi.js";
import Room from "../rooms/Room";

type TextureObj = {
  path?: string;
  src?: string;
  srcs?: string[];
};
type Textures = {
  [key: string]: TextureObj;
};
export default class GameObject {
  static globalSprite = new Sprite();
  sprite: Sprite = GameObject.globalSprite;
  room: Room | undefined = undefined;
  _updatable = false;
  id = "none";
  textures: Textures = {};
  texturePath = "";
  _chosenTexture = "";
  get chosenTexture() {
    return this._chosenTexture;
  }

  async getTexture(texture: string) {
    const textureObj = this.textures[texture];
    if (!textureObj) return;
    const localPath = textureObj.path || "";
    return (await Assets.load(
      this.texturePath + localPath + textureObj.src
    )) as Texture;
  }

  async setChosenTexture(texture: string) {
    this._chosenTexture = texture;
    const textureOne = await this.getTexture(texture);
    if (textureOne) {
      this.sprite.texture = textureOne;
    }
  }

  set chosenTexture(texture: string) {
    if(texture == this.chosenTexture) return;
    this.setChosenTexture(texture);
  }

  get updatable() {
    return this._updatable;
  }
  set updatable(value: boolean) {
    if (value == this._updatable) return;
    if (!this.room) return;
    this._updatable = value;
    if (value === true) {
      this.room.registerUpdatableObject(this);
      return;
    }
    this.room.removeUpdatableObject(this);
  }

  async addObject(object: GameObject) {
    if (!this.room) return;
    await object.register(this.room);
    if (!object.sprite) return;
    this.sprite.addChild(object.sprite);
  }

  _x = 0;
  _y = 0;

  async loadSprite() {
    this.sprite = new Sprite();
  }
  async register(room: Room) {
    this.room = room;
    await this.beforeInit();
    await this.loadSprite();

    this.sprite.x = this._x;
    this.sprite.y = this._y;
    this.onInit();
  }

  onInit() {}
  beforeInit() {}
  onUpdate() {}

  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }
}
