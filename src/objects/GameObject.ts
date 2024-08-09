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
  id = "none";
  textures: Textures = {};
  texturePath = "";
  _textureMode = "";
  _spriteInitialized = false;
  _freezed = false;
  unfrozen = false;

  get freezed() {
    return this._freezed;
  }

  set freezed(freezed: boolean) {
    if(this.unfrozen) return;
    this._freezed = freezed;
  }
  get textureMode() {
    return this._textureMode;
  }
  set textureMode(texture: string) {
    this.setTextureMode(texture);
  }
  async getTexture(texture: string) {
    const textureObj = this.textures[texture];
    if (!textureObj) return;
    const localPath = textureObj.path || "";
    return (await Assets.load(
      this.texturePath + localPath + textureObj.src
    )) as Texture;
  }

  async setTextureMode(texture: string) {
    if (texture == this._textureMode) return;
    this._textureMode = texture;
    if(!this._spriteInitialized) return;
    const textureOne = await this.getTexture(texture);
    if (textureOne) {
      this.sprite.texture = textureOne;
    }
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
    this.sprite = new Sprite(await this.getTexture(this.textureMode));
    this._spriteInitialized = true;
  }
  async register(room: Room) {
    this.room = room;
    await this.beforeInit();
    await this.loadSprite();

    const sprite = this.sprite;
    sprite.x = this._x;
    sprite.y = this._y;

    if("onPointerDown" in this){
      sprite.interactive = true;
      sprite.onpointerdown = (ctx) => {
        if(this._freezed) return;
        (this.onPointerDown as Function)(ctx);
      }
    }

    this.onInit();
  }

  onInit() {}
  beforeInit() {}

  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }
}
