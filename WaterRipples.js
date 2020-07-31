let song;
let font;
let fontItalic;
let ripples = [];
let count = 8; 
let startAng = 0;

let start = false;



function preload() 
{
  soundFormats('mp3');
  song = loadSound('sounds/Chad_Crouch_Drifting');
  
  font = loadFont('fonts/Rubik_Light.ttf');
  fontItalic = loadFont('fonts/Rubik_LightItalic.ttf');
}

function setup() 
{
  let cnv = createCanvas(600, 600);
  cnv.mousePressed(canvasPressed);
  
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  strokeCap(SQUARE);
    
  for (let i = 0; i < 17; i++) 
  {
    ripples[i] = new Ripple(width/2, height/2 - 30, count * 9, (i * 2) + 180, startAng, song); //180=cyan // *2 to get more gradient //30=yellow
    count++;
    startAng += 5;
  }
}

function canvasPressed() 
{
  if (song.isPlaying())
  {
    song.pause();
  }
  else
  {
    song.loop();
    start = true; //so initial instructions won't show again
  }
}

function draw()
{ 
  background(240, 59, 20);
  noStroke();
  
  if (!song.isPlaying() && start == false) //show instructions once 
  {
    textAlign(LEFT, TOP);
    fill(0, 0, 100);
    textSize(14);
    text('Click canvas to begin song, and click to pause', 10, 10);
  }
  
  textAlign(CENTER, CENTER);
  noStroke();
  textFont(font);
  
  fill(330, 100, 100);
  textSize(28);
  text('D R I F T E R', width/2, 520);
  
  fill(330, 0, 100);
  textSize(17);
  text('C H A D  C R O U C H', width/2, 560);
  
  for (let r of ripples)
  {
    r.useFFT();
  }
}
