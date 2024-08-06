// import 'module-alias/register';
import { Application, Assets, Sprite } from 'pixijs';
import Battlefield from './rooms/Battlefield';

const app = new Application();
app.view.width = window.innerWidth
app.view.height = window.innerHeight

app.screen.width = 1366
app.screen.height = 768
//@ts-ignore
document.body.appendChild(app.view);

const room = new Battlefield(app);
