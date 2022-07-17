import kaboom from 'https://unpkg.com/kaboom/dist/kaboom.mjs';
import {rot,fire} from './shaders.js';


kaboom({
    width: 960, // width of canvas
    height: 540 // height of canvas
});

onKeyPress("f", () => {
		fullscreen(!fullscreen())
	})

const w = width(), h = height(), SPEED = 320;
const {sin,cos,tan,abs}=Math;
let t = time(), score = 0;


//Load sprites
loadSprite("hog", "sprites/hog.png")
loadSprite("ufo", "sprites/ufo.png")
loadSprite("ss1", "sprites/spaceship01.png")
loadSprite("ss2", "sprites/spaceship02.png")

loadShader("fire", null, fire);
loadShader("rot", null, rot);


const background = add([
    uvquad(width(), height()),
    shader("fire"),
]);

background.onUpdate(() => {
	background.uniform["time"] = time()
})

const hog = add([  
  sprite('hog'),
  pos(100,100),
  scale(-3,3),
  origin("center"),
  area()
])
const player = add([
  sprite("ss2"),
  scale(.5,.5),
  pos(100,200),
  origin("center"),
  area()
]);
player.onUpdate(()=>{
  player.pos.y+=sin(t*6)/2;
});



const ufo = add([
  sprite("ufo"),
  pos(100,200),
  origin("center"),
  scale(0.4),
  area(),
  rotate(0),
]);



const scoreLabel = add([
    text(score),
    pos(24, 24),
    scale(.3)
]);

onUpdate(() => {
    t = time();
    score = 0;
    scoreLabel.text = score;
});

hog.onUpdate(_=>{
  let wh= width()/2;
  hog.moveTo(wh+sin(t*2)*(wh-50),wh);
  hog.flipX(Math.cos(t*2)>0?false:true);
  //hog.use(scale(3.4*-(sin(t)/2),2.4));
});

ufo.onUpdate(()=>{
  let wh= w/2;
  ufo.moveTo(wh+sin(t)*(wh+80),200+(-        abs(cos(t*6)))*20+sin(t/3)*100);
  ufo.angle=sin(t*12)*30;
  ufo.use(scale(.5-sin(t/4)/6)),
  ufo.flipX(Math.cos(time())>0?false:true);
  //ufo.use(scale(.4*(sin(t)/2),.4));
});

onKeyPress("space", () => {
		spawnBullet(player.pos.sub(-56, -9))
		//spawnBullet(player.pos.add(16, 0))
})

function spawnBullet(p) {
		add([
			rect(19, 9),
			area(),
			pos(p),
			origin("center"),
			color(127, 127, 255),
			outline(4),
			move(RIGHT, 2000),
			cleanup(),
			// strings here means a tag
			"bullet",
		])
	}