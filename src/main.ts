// import 'module-alias/register';
import { Application } from "pixi.js";
import Battlefield from "./rooms/Battlefield";

async function main() {
  const app = new Application();
  await app.init({
    resizeTo: window,
  });

  app.screen.width = 1366;
  app.screen.height = 768;
  //@ts-ignore
  document.body.appendChild(app.canvas);

  new Battlefield(app);
}
main();
