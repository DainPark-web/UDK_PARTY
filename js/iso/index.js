// Canvas Size
let canvasContainer = document.getElementById("canvas");
let WIDTH = canvasContainer.clientWidth
let HEIGHT = canvasContainer.clientHeight

let gridTopX;
let gridTopY;
const sideLength = 60;

const cubes = [];


let mic, fft;

let time = 0;
function setup() {
    let cnv = createCanvas(WIDTH,HEIGHT)
    cnv.parent(canvasContainer)
  gridTopX = width / 2;
  gridTopY = height / 2;

  strokeWeight(2);

  cubes.push(new Cube(0, 0, 0));

//   while (cubes.length < 10) {
//     addRandomCube();
//   }

    for(let i = 0; i < 30; i++){
        for (let j = 0; j < 10; j++){
        cubes.push(new Cube((i * 2) - 15, i + j , i ))
        cubes.push(new Cube((i * 2) - 15, i - j , i - 1 ))
        cubes.push(new Cube((i * 2) - 15, i - j * 2 , i - 1 ))
        cubes.push(new Cube((i * 2) - 15, i + j * 2 , i  ))

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
  background(120);
  let vol = mic.getLevel();
  volSize = map(vol, 0, 1, 0, 100)
  var spectrum = fft.analyze();
time += 0.1;
  for(let i = 0; i< cubes.length; i++){

      cubes[i].draw();
    //   cubes[i].update(sin(time) * i * 0.5, sin(time) * i)
  }

  for(let i = 0; i < spectrum.length; i++){
    let x = spectrum.length - i;
    let y = spectrum[i];
    // colorMode(HSB, 100);
    // fill(y , y, x)

    cubes[i].update(sin(i) * (volSize * (x * 0.01)), sin(i) * (volSize * (x * 0.01)))
    
}
}

