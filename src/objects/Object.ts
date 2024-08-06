import { Assets, Sprite, Texture } from "pixijs";
import Room from "../rooms/Room";

export default class Object {
  texturesSrcs: string[] = [];
  textures: Texture[] = [];
  sprite: Sprite | undefined = undefined;
  room: Room| undefined = undefined;
  _x = 0;
  _y = 0;

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set x(x) {
    this._x = x;
    if (this.sprite) {
      this.sprite.x = x;
    }
  }

  set y(y) {
    this._y = y;
    if (this.sprite) {
      this.sprite.y = y;
    }
  }

  onInit(){

  }
  async register(room: Room) {
    this.textures = await Promise.all(
      this.texturesSrcs.map((src) => Assets.load(src))
    );
    const texture = this.textures[0];
    this.sprite = new Sprite(texture);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.x = this._x;
    this.sprite.y = this._y;
    this.sprite.width = texture.width;
    this.sprite.height = texture.height;
    console.log(texture.width, texture.height)

    this.room = room
    this.onInit()
  }

  constructor(x=0, y=0) {
    this._x = x;
    this._y = y;
  }
}
