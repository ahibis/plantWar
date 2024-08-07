import { AnimatedSprite, Assets, Sprite, Texture } from "pixi.js";
import Room from "../rooms/Room";

type TextureObj = {
  path?: string;
  src?: string;
  srcs?: string[];
};
type Textures = {
  [key: string]: TextureObj;
};
export default class Object {
  static globalSprite = new Sprite();
  sprite: Sprite | AnimatedSprite = Object.globalSprite;
  animated = false;
  room: Room | undefined = undefined;
  _updatable = false;
  id = "none";
  textures: Textures = {};
  texturePath = "";
  _chosenTexture = "";
  get chosenTexture() {
    return this._chosenTexture;
  }
  get animatedSprite() {
    return this.sprite as AnimatedSprite;
  }
  async getTexture(texture: string) {
    const textureObj = this.textures[texture];
    if (!textureObj) return;
    const localPath = textureObj.path || "";
    return (await Assets.load(
      this.texturePath + localPath + textureObj.src
    )) as Texture;
  }
  async getTextures(texture: string) {
    const textureObj = this.textures[texture];
    if (!textureObj) return [];
    const localPath = textureObj.path || "";
    if (!textureObj.srcs) return [];
    return (await Promise.all(
      textureObj.srcs.map((src) =>
        Assets.load(this.texturePath + localPath + src)
      )
    )) as Texture[];
  }
  async setChosenTexture(texture: string) {
    if (this.chosenTexture == texture) return;
    this._chosenTexture = texture;

    if (this.animated) {
      const sprite = this.sprite as AnimatedSprite;
      sprite.textures = await this.getTextures(texture);
      console.log(sprite);
      // sprite.play();
      return;
    }
    const textureOne = await this.getTexture(texture);
    if (textureOne) {
      this.sprite.texture = textureOne;
    }
  }
  set chosenTexture(texture: string) {
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
  onUpdate() {}

  async addObject(object: Object) {
    if (!this.room) return;
    await object.register(this.room);
    if (!object.sprite) return;
    this.sprite.addChild(object.sprite);
  }

  onInit() {}
  beforeInit() {}
  _x = 0;
  _y = 0;

  async register(room: Room) {
    this.room = room;
    await this.beforeInit();
    if (this.animated) {
      this.sprite = new AnimatedSprite(
        await this.getTextures(this.chosenTexture)
      );
    } else {
      this.sprite = new Sprite();
    }
    this.sprite.x = this._x;
    this.sprite.y = this._y;
    this.onInit();
  }

  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }
}
