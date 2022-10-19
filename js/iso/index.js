// Canvas Size
let canvasContainer = document.getElementById("canvas");
let WIDTH = canvasContainer.clientWidth
let HEIGHT = canvasContainer.clientHeight

let gridTopX;
let gridTopY;
const sideLength = 100;

const cubes = [];


let mic, fft;

let time = 0;


// making DB (LocalStorage)
let peopleSound = []
setInterval(() => {
    if(localStorage.getItem("peopleSound")){
        peopleSound = JSON.parse(localStorage.getItem("peopleSound"))
    }
    const soundConfig ={
        soundLeve : volSize,
        time: Date.now()
    }
    peopleSound.push(soundConfig)
    localStorage.setItem("peopleSound", JSON.stringify(peopleSound))
    

}, 5000)
function setup() {
    let cnv = createCanvas(WIDTH,HEIGHT)
    cnv.parent(canvasContainer)
  gridTopX = width / 2;
  gridTopY = height / 2;

  strokeWeight(5);

  cubes.push(new Cube(0, 0, 0));


    const cCount = 10;
    const cW = 10
    for(let i = 0; i < cCount; i++){
      
        for(let j = 0; j< cCount; j++){
            cubes.push(new Cube(i,j,4))

        }
      
        
       
     
    }

  // Sort so the cubes are drawn in the right order
  cubes.sort((a, b) => {
    return a.getSortString().localeCompare(b.getSortString());
  });


  userStartAudio()
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.92, 512);
  fft.setInput(mic);
}

function draw() {
  background(0,0,0,90);
  let vol = mic.getLevel();
  volSize = map(vol, 0, 1, 0, 10000)
  volSizeE = map(vol, 0, 1, 0, 100)
  var spectrum = fft.analyze();

  for(let i = 0; i< cubes.length; i++){

      cubes[i].draw();
  }


let y =0;
  for(let i = 0; i < cubes.length; i++){
   
    const cubeC = Math.floor(random(cubes.length))
    if(i < spectrum.length){

        y = spectrum[i];
    }
    // const cubeC = Math.floor(volSizeE)
    if(cubes[cubeC]){

        // cubes[i].update((-(sin(i * (y * 0.01)) + 1) * (y  * ( 0.1))) ,volSize)
        cubes[i].update((-(sin(i * (y * 0.001)) + 1) * (y  * ( 0.5))) ,volSize)
        // cubes[cubeC].update(-(( volSize) * 0.1),volSize)
    }
    
}

    //error Handling
    push()
    const rectW = 180;
    fill(46,49,145)
    rect(WIDTH - rectW - 20, 20, rectW, HEIGHT- 40, 20)
    if(localStorage.getItem("peopleSound")){
        const getPartySound = JSON.parse(localStorage.getItem("peopleSound"))
    for(let i = 0; i < getPartySound.length; i++){
        fill(255)
        // text(Math.floor(getPartySound[i].soundLeve), (WIDTH - rectW) + 80, (i * 20) + 40);
        const rectWW = map(Math.floor(getPartySound[i].soundLeve), 0, 5000, 2, 100)
        noStroke()
        rect( ((WIDTH - rectW) + 90) - rectWW, (i * 20) + 40 - 5, rectWW,5);
        text((new Date(getPartySound[i].time)).toString().slice(16,24), (WIDTH - rectW) + 100, (i * 20) + 40);
        // rect(WIDTH - 200, i * 10, 500,10);
    }
    }
    pop()
}

