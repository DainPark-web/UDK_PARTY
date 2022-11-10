// Canvas Size
let canvasContainer = document.getElementById("canvas");
let WIDTH = canvasContainer.clientWidth;
let HEIGHT = canvasContainer.clientHeight;

let gridTopX;
let gridTopY;
const sideLength = 70;

const cubes = [];

let mic, fft;
let pg;
let time = 0;
let volSize;
let volSizeInterval;

// making DB (LocalStorage)
let peopleSound = [];
let peopleSoundSecond = []
let peopleSoundAverage = []

let wholedata = []
// setInterval(() => {
//   if (localStorage.getItem("peopleSound")) {
//     peopleSound = JSON.parse(localStorage.getItem("peopleSound"));
//   }
//   const soundConfig = {
//     soundLeve: volSize,
//     time: Date.now(),
//   };
//   peopleSound.push(soundConfig);
//   localStorage.setItem("peopleSound", JSON.stringify(peopleSound));
// }, (1000 * 60) * 30);
setInterval(() => {
  if (localStorage.getItem("peopleSound")) {
    peopleSound = JSON.parse(localStorage.getItem("peopleSound"));
  }
  const soundConfig = {
    soundLeve: volSizeInterval,
    time: Date.now(),
  };
  peopleSoundSecond.push(volSizeInterval)
  // console.log(volSizeInterval)
  peopleSound.push(soundConfig);
  localStorage.setItem("peopleSound", JSON.stringify(peopleSound));
}, 1000);
// (1000 * 60) * 5
setInterval(() => {
  if (localStorage.getItem("peopleSoundAverage")) {
    peopleSoundAverage = JSON.parse(localStorage.getItem("peopleSoundAverage"));
  }
    const nowArray = [...peopleSoundSecond]
    const average = (peopleSoundSecond.reduce((prev, curr) => prev + curr))/nowArray.length
    const soundConfig = {
      soundLeve: average,
      time: Date.now(),
    };
    peopleSoundAverage.push(soundConfig);
    wholedata.push(soundConfig)
    // console.log(peopleSoundAverage)
    localStorage.setItem("peopleSoundAverage", JSON.stringify(peopleSoundAverage));
    localStorage.setItem("wholeData", JSON.stringify(wholedata));
    // console.log()
}, 2000);

function setup() {
  let cnv = createCanvas(WIDTH, HEIGHT);
  cnv.parent(canvasContainer);
  gridTopX = width / 2;
  gridTopY = height / 2;
  pixelDensity(1);
  strokeWeight(3);

  cubes.push(new Cube(0, 0, 0));

  const cCount = 10;
  const cW = 10;
  for (let i = 0; i < cCount; i++) {
    for (let j = 0; j < cCount; j++) {
      cubes.push(new Cube(i, j, 4));
    }
  }
  //sorting
  cubes.sort((a, b) => {
    return a.getSortString().localeCompare(b.getSortString());
  });

  userStartAudio();
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.92, 512);
  fft.setInput(mic);

  //create Graphics
    // pg = createGraphics(WIDTH,HEIGHT);

  setInterval(() => {
    for (let i = 0; i < cubes.length; i++) {
      cubes[i].colorUpdate();
    }
  }, 1000 * 100);
}

function draw() {
  background(0, 0, 0, 90);
  let vol = mic.getLevel();
  // console.log(vol)
  volSize = map(vol, 0, 1, 0, 10000);
  volSizeE = map(vol, 0, 1, 0, 100);
  volSizeInterval = map(vol, 0, 1, 0, 500);
  var spectrum = fft.analyze();

  push();
  fill(201, 200, 193);
  stroke(0)
  rect(0, 0, WIDTH, HEIGHT);
  // stroke(255)
  // const lCount = 20
  const lCount = 120;
  const lCountH = 0;
  translate(0, height / 2);
  push();
  shearX(PI / 3.0);
  // translate(-width - 20, lCountH);
  translate(-width / 2, -height / 2);
  strokeWeight(5);
  for (let i = 0; i < lCount; i++) {
    // line(i * (WIDTH * 2 / lCount),0,i * (WIDTH * 2 / lCount),HEIGHT);
    line(i * lCount, 0, i * lCount, HEIGHT);
  }
  pop();
  push();
  shearX(-PI / 3.0);
  // translate((-width / 10) - 19, lCountH);
  translate(-width / 2, -height / 2);
  strokeWeight(5);

  for (let i = 0; i < lCount; i++) {
    // line(i * (WIDTH * 2 / lCount),0,i * (WIDTH * 2 / lCount),HEIGHT);
    line(i * lCount, 0, i * lCount, HEIGHT);
  }
  pop();

  pop();

  //cube
  for (let i = 0; i < cubes.length; i++) {
    cubes[i].draw();
  }

  let y = 0;
  for (let i = 0; i < cubes.length; i++) {
    const cubeC = Math.floor(random(cubes.length));
    if (i < spectrum.length) {
      y = spectrum[i];
    }
    // const cubeC = Math.floor(volSizeE)
    if (cubes[cubeC]) {
      // cubes[i].update((-(sin(i * (y * 0.01)) + 1) * (y  * ( 0.1))) ,volSize)
      cubes[i].update(-(sin(i * (y * 0.001)) + 1) * (y * 0.6), volSize);
      // cubes[cubeC].update(-(( volSize) * 0.1),volSize)
    }
  }

  //error Handling
  push();
  
  const rectW = 180;
  // const rectW = 90;
  // const marginW = 10;
  fill(255,255,255,150);
  rect(20, HEIGHT - rectW, WIDTH - 40, rectW - 20, 5);
  // rect(marginW, HEIGHT - rectW - marginW, WIDTH - marginW * 2, rectW, 20);
  if (localStorage.getItem("peopleSoundAverage")) {
    const getPartySound = JSON.parse(localStorage.getItem("peopleSoundAverage"));
    for (let i = 0; i < getPartySound.length; i++) {
      
      // text(Math.floor(getPartySound[i].soundLeve), (WIDTH - rectW) + 80, (i * 20) + 40);
      let rectWW = map(
        Math.floor(getPartySound[i].soundLeve),
        0,
        100,
        2,
        1000
      );
      if(rectWW > 100){
        rectWW = 100;
      }
      strokeWeight(1)
      push()
        if(rectWW < 20){
          fill(234, 70, 83);
        }else if(rectWW < 40){
          fill(46,49,145)
        }else if(rectWW < 60){
          fill(0,0,0)
        }
        rect(i * 30 + 50,HEIGHT - rectW + 120, 5, -rectWW);
      pop()
      fill(0)
      // text(
      //   new Date(getPartySound[i].time).toString().slice(19, 24),
      //   i * 30 + 40,
      //   HEIGHT - rectW + 140,
       
      // );
      // rect(WIDTH - 200, i * 10, 500,10);
    }
  }
  pop();
  if(peopleSoundAverage.length > 60){
    peopleSound = [];
    peopleSoundSecond =[]
    peopleSoundAverage = []
    localStorage.removeItem("peopleSound");
    localStorage.removeItem("peopleSoundAverage");
  }

  //createGraphics
    // pg.background(0);
    // pg.noFill();
    // pg.stroke(255);
    // pg.ellipse(mouseX - 150, mouseY - 75, 60, 60);

  //   //Draw the offscreen buffer to the screen with image()
    // image(pg, 150, 75);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    peopleSound = [];
    peopleSoundSecond =[]
    peopleSoundAverage = []
    wholedata =[]
    localStorage.removeItem("peopleSound");
    localStorage.removeItem("peopleSoundAverage");
    localStorage.removeItem("wholeData");

  }
  if (keyCode === RIGHT_ARROW) {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      
     
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function windowResized(){
  WIDTH = canvasContainer.clientWidth;
  HEIGHT = canvasContainer.clientHeight;
  resizeCanvas(WIDTH, HEIGHT);
}
