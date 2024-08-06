import { Application, Assets, Sprite } from 'pixijs';

const app = new Application();
app.view.width = window.innerWidth
app.view.height = window.innerHeight

app.screen.width = 1366
app.screen.height = 768

document.body.appendChild(app.view);

const texture = await Assets.load('background/background1.png');

const background = new Sprite(texture);


// Add the bunny to the scene we are building
app.stage.addChild(background);
