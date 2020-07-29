class Ripple
{
  constructor(cx, cy, rad, col, startAngle, song)
  {
    this.cx = cx;
    this.cy = cy;
    this.rad = rad;
    this.col = col;
    this.startAngle = startAngle;
    this.song = song;
    
    this.amp = new p5.Amplitude(0.9);
    this.fft = new p5.FFT(0.9, 512);
    
    this.volumes = [];
    this.curveJump = 8;
  }
  
  getVol()
  {  
    if (this.song.isPlaying())
    {
      let vol = this.amp.getLevel();
      this.volumes.push(vol);
    }   
  }
  
  makeFluidCircle()
  {
    this.getVol();
    
    noFill();
    strokeWeight(1);
    stroke(this.col, 100, 100, 70);
    
    push();
    translate(this.cx, this.cy);
    
    beginShape();
    for (let i = this.startAngle; i < this.startAngle + 360; i += this.curveJump)
    {
      let r = map(this.volumes[i], 0, 1, this.rad - 30, this.rad + 30);
      let x = r * cos(i);
      let y = r * sin(i);
      
      curveVertex(x, y);
    }
    endShape(CLOSE);
    
    if (this.volumes.length > 720)
    {
      this.volumes.splice(0, 1);
    }
    
    pop();
  }
  
  useFFT()
  {
    strokeWeight(1);
    stroke(this.col, 100, 100, 100);
    noFill();
    
    push();
    translate(this.cx, this.cy);

    let spectrum = this.fft.analyze();
    
    rotate(-90);
    beginShape();
    for (let i = 0; i < 361; i += 1)
    {
      let r = map(spectrum[i], 0, 512, this.rad - 30, this.rad + 30);
      let x = r * cos(i);
      let y = r * sin(i);
      
      curveVertex(x, y);
    }
    endShape(CLOSE);
    
    pop();
  }
}
