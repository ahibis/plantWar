import { AnimatedSprite, Assets, Texture } from "pixi.js";
import GameObject from "./GameObject";

export default class AnimatedObject extends GameObject {
  _animationSpeed = 0.1;
  _animationMultiplier = 1;

  get animatedSprite() {
    return this.sprite as AnimatedSprite;
  }
  get animationSpeed() {
    return this._animationSpeed;
  }
  set animationSpeed(speed: number) {
    this._animationSpeed = speed;
    this.animatedSprite.animationSpeed = speed * this._animationMultiplier;
  }
  get animationMultiplier() {
    return this._animationMultiplier;
  }
  set animationMultiplier(multiplier: number) {
    this._animationMultiplier = multiplier;
    this.animatedSprite.animationSpeed = this._animationSpeed * multiplier;
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
  async setTextureMode(texture: string) {
    if (texture == this._textureMode) return;
    this._textureMode = texture;
    if (!this._spriteInitialized) return;
    this.animatedSprite.textures = await this.getTextures(texture);
  }
  async loadSprite() {
    const textures = await this.getTextures(this.textureMode);
    this.sprite = new AnimatedSprite(textures);
    this._spriteInitialized = true;
  }
}
