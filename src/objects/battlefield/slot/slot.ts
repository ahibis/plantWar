import Battlefield from "@/rooms/Battlefield";
import Object from "@/objects/Object";

export default class Slot extends Object {
  id = "slot"
  texturesSrcs = ["/ui/slot/slot.png", "/ui/slot/slotActivated.png"];
  slotId = 0;
  
  onUpdate(){
    const room = this.room as Battlefield;
    if(this.slotId == room.slotActivated){
      return this.textureId = 1;
    }
    this.textureId = 0;
  }
  onInit(): void {
    const {sprite} = this;
    const room = this.room as Battlefield;
    
    sprite.zIndex = 0;
    sprite.interactive = true;
    sprite.onclick = () => {
      room.slotActivated = this.slotId;
      room.slots.forEach(slot => {
        slot.onUpdate();
      })
    }; 
  }
}
