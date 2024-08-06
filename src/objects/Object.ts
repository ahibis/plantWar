import { Assets, Sprite, Texture } from "pixijs";
import Room from "../rooms/Room";

export default class Object {
  texturesSrcs: string[] = [];
  textures: Texture[] = [];
  sprite: Sprite | undefined = undefined;
  room: Room;

  async register() {
    this.textures = await Promise.all(
      this.texturesSrcs.map((src) => Assets.load(src))
    );
    this.sprite = new Sprite(this.textures[0]);
    this.sprite.anchor.set(0.5, 0.5);
  }

  constructor(room: Room) {
    this.room = room;
  }
}
