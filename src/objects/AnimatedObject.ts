import { AnimatedSprite, Assets, Texture } from "pixi.js";
import GameObject from "./GameObject";

export default class AnimatedObject extends GameObject {
  get animatedSprite() {
    return this.sprite as AnimatedSprite;
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
    this._chosenTexture = texture;
    this.animatedSprite.textures = await this.getTextures(texture);
  }
  async loadSprite() {
    console.log(this.chosenTexture)
    const textures = await this.getTextures(this.chosenTexture)
    console.log(textures)
    this.sprite = new AnimatedSprite(textures);
  }
}