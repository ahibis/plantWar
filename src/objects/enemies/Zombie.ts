import GameObject from "../Object";
import ZombieData from "./Zombie.json";

export default class Zombie extends GameObject {
  animated = true;
  beforeInit(){
    Object.assign(this, ZombieData);
    this.updatable = true;
  }
  async onInit(){
    await this.setChosenTexture("attack");
    this.animatedSprite.play();
    this.animatedSprite.animationSpeed = 0.1;
  }
  onUpdate(){
    this.sprite.x -= 0.5;
  }
}
