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
function setup() {
    let cnv = createCanvas(WIDTH,HEIGHT)
    cnv.parent(canvasContainer)
  gridTopX = width / 2;
  gridTopY = height / 2;

  strokeWeight(5);

  cubes.push(new Cube(0, 0, 0));

//   while (cubes.length < 10) {
//     addRandomCube();
//   }
    const cCount = 10;
    const cW = 10
    for(let i = 0; i < cCount; i++){
        // cubes.push(new Cube((i * 2), i  , i ))
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
// time += 0.1;
  for(let i = 0; i< cubes.length; i++){

      cubes[i].draw();
    //   cubes[i].update(sin(time) * i * 0.5, sin(time) * i)
  }

//   for(let i = 0; i < spectrum.length; i++){
//     let x = spectrum.length - i;
//     let y = spectrum[i];
//     // colorMode(HSB, 100);
//     // fill(y , y, x)

//     cubes[Math.floor(random(i))].update(-(volSize * (x * 0.01)),-(volSize * (x * 0.01)))
    
// }
let y =0;
  for(let i = 0; i < cubes.length; i++){
    // let x = spectrum.length - i;
    // let y = spectrum[i];
    // colorMode(HSB, 100);
    // fill(y , y, x)
    const cubeC = Math.floor(random(cubes.length))
    const x = cubes.length - i
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
}

