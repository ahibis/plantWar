import { Assets, Sprite, Texture } from "pixijs";
import Room from "../rooms/Room";

export default class Object {
  static globalSprite = new Sprite();
  id = "none"
  texturesSrcs: string[] = [];
  textures: Texture[] = [];
  sprite: Sprite = Object.globalSprite;
  room: Room| undefined = undefined;
  _textureId = 0;
  _updatable = false;
  get updatable () {
    return this._updatable
  }
  set updatable (value: boolean) {
    if (value == this._updatable) return;
    if(!this.room) return;
    this._updatable = value
    if (value === true) {
      this.room.registerUpdatableObject(this)
    }
    this.room.removeUpdatableObject(this)
  }
  onUpdate(){

  }


  get textureId() {
    return this._textureId;
  }
  set textureId(id) {
    this._textureId = id;
    this.sprite.texture = this.textures[id];
  }
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
    this.sprite.x = x;
  }

  set y(y) {
    this._y = y;
    this.sprite.y = y;
  }

  onInit(){

  }
  async register(room: Room) {
    this.textures = await Promise.all(
      this.texturesSrcs.map((src) => Assets.load(src))
    );
    const texture = this.textures[0];
    this.sprite = new Sprite(texture);
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
