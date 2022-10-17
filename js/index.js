// Canvas Size
let canvasContainer = document.getElementById("canvas");
let WIDTH = canvasContainer.clientWidth
let HEIGHT = canvasContainer.clientHeight

let mic, amp, fft;
let time = 0;
// let sound;

// function preload(){
//     // audio = loadSound("../../assets/Zufall Musik S1 Kopie 2.m4a");
// }

function setup(){
    let cnv = createCanvas(WIDTH,HEIGHT)
    cnv.parent(canvasContainer)
    userStartAudio()

    mic = new p5.AudioIn();
    mic.start();
    // amp = new p5.Amplitude();
    // amp.setInput(mic);
    fft = new p5.FFT(0.92, 512);
    fft.setInput(mic);

}

function draw(){
    background(0)
    let vol = mic.getLevel();
    let volSize = map(vol, 0, 1, 10, 1000)
    console.log(volSize)
    time += 0.1;
    // let level = amp.getLevel() * 1000;
    var spectrum = fft.analyze();
    // console.log(spectrum)

   
    push();
    strokeWeight(1);
    translate(WIDTH/2, HEIGHT/2);
 
    for(let i = 0; i < spectrum.length; i++){
        let x = spectrum.length - i;
        let y = spectrum[i];
       
        circle(sin(i) * (volSize * (x * 0.01)), cos(i) * (y * (x * 0.01)), volSize);
        
    }
    pop();
  
}


function windowResized(){
    WIDTH = canvasContainer.clientWidth
    HEIGHT = canvasContainer.clientHeight
    resizeCanvas(WIDTH, HEIGHT);
}