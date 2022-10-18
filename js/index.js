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
let volSize;


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



    //text
    textSize(15);

}

function draw(){
    background(0,0,0,50)
    let vol = mic.getLevel();
    volSize = map(vol, 0, 1, 10, 1000)
    // console.log(volSize)
    time += 0.1;
    // let level = amp.getLevel() * 1000;
    var spectrum = fft.analyze();
    // console.log(spectrum)
    // console.log(localStorage.getItem("peopleSound")) 
   
    push();
    strokeWeight(1);
    translate(WIDTH/2, HEIGHT/2);
 
    for(let i = 0; i < spectrum.length; i++){
        let x = spectrum.length - i;
        let y = spectrum[i];
        colorMode(HSB, 100);
        fill(y , y, x)
        circle(sin(i) * (volSize * (x * 0.01)), cos(i) * (y * (x * 0.01)), volSize);
        
    }
    pop();

    fill(255)
        //error Handling
    if(localStorage.getItem("peopleSound")){
        const getPartySound = JSON.parse(localStorage.getItem("peopleSound"))
    for(let i = 0; i < getPartySound.length; i++){
        text(Math.floor(getPartySound[i].soundLeve), 100, i * 20);
        text((new Date(getPartySound[i].time)).toString().slice(16,24), 20, i * 20);
        // rect(WIDTH - 200, i * 10, 500,10);
    }
    }
    

  
}


function windowResized(){
    WIDTH = canvasContainer.clientWidth
    HEIGHT = canvasContainer.clientHeight
    resizeCanvas(WIDTH, HEIGHT);
}