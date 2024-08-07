import PlantPicker from "@/objects/battlefield/plantPicker/PlantPicker";
import Object from "@/objects/Object";

export default class Slot extends Object {
  id = "slot";
  textures = {
    base: {
      src: "slot.png",
    },
    activated: {
      src: "slotActivated.png",
    },
  };
  texturePath = "/ui/slot/";
  slotId = 0;
  plantPicker: PlantPicker;

  onUpdate() {
    if (this.slotId == this.plantPicker.slotActivatedId) {
      return (this.chosenTexture = "activated");
    }
    this.chosenTexture = "base";
  }
  onInit(): void {
    this.chosenTexture = "base";
    const { sprite, plantPicker } = this;

    sprite.zIndex = 0;
    sprite.interactive = true;
    sprite.onclick = () => plantPicker.chooseSlot(this.slotId);
  }
  constructor(plantPicker: PlantPicker, x = 0, y = 0) {
    super(x, y);
    plantPicker.slots.push(this);
    this.plantPicker = plantPicker;
  }
}
