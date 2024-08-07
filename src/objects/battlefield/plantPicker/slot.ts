import PlantPicker  from '@/objects/battlefield/plantPicker/PlantPicker';
import Object from "@/objects/Object";

export default class Slot extends Object {
  id = "slot"
  texturesSrcs = ["/ui/slot/slot.png", "/ui/slot/slotActivated.png"];
  slotId = 0;
  plantPicker: PlantPicker;
  
  onUpdate(){
    if(this.slotId == this.plantPicker.slotActivatedId){
      return this.textureId = 1;
    }
    this.textureId = 0;
  }
  onInit(): void {
    const {sprite, plantPicker} = this;

    sprite.zIndex = 0;
    sprite.interactive = true;
    sprite.onclick = () => plantPicker.chooseSlot(this.slotId);
  }
  constructor(plantPicker: PlantPicker, x =0, y=0){
    super(x, y);
    plantPicker.slots.push(this);
    this.plantPicker = plantPicker;
  }
}
