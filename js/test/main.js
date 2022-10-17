// Canvas Size
let canvasContainer = document.getElementById("canvas");
let WIDTH = canvasContainer.clientWidth
let HEIGHT = canvasContainer.clientHeight

let mic, amp, fft;
let time = 0;
let volSize;

let cornArray = [];
let cornArrayCount = 0


let valueArray = []

const r = 10;

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

    background(255)

    cornArray.push(new Corn())
    colorMode(HSB, 100);

}

function draw(){
    let vol = mic.getLevel();
    volSize = map(vol, 0, 1, 10, 1000)
    valueArray.push(volSize);
    // var spectrum = fft.analyze();

    if(valueArray.length > 2){
        if(valueArray[1] + r <= valueArray[0] || valueArray[1] - r >= valueArray[0]){
            // console.log("d")
            cornArrayCount += 1;
            cornArray[cornArray.length - 1].update(Math.floor(volSize))
        }else{
            // console.log(false)
        }
    }

    if(valueArray.length >= 3){
        valueArray.splice(0, 1)
    }

    if(cornArrayCount > 50){
        cornArrayCount = 0;
        cornArray.push(new Corn())
    }

    // console.log(valueArray)
   
   
    
   
    

  
}


function windowResized(){
    WIDTH = canvasContainer.clientWidth
    HEIGHT = canvasContainer.clientHeight
    resizeCanvas(WIDTH, HEIGHT);
}