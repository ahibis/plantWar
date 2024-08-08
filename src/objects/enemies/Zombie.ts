import AnimatedObject from "../AnimatedObject";
import ZombieData from "./Zombie.json";

export default class Zombie extends AnimatedObject {
  beforeInit() {
    Object.assign(this, ZombieData);
  }
  async onInit() {
    await this.setTextureMode("attack");
    this.animatedSprite.play();
    this.animatedSprite.animationSpeed = 0.1;
  }
  onUpdate() {
    this.sprite.x -= 0.5;
  }
}
