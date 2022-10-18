class Corn {
    constructor(){
        this.wValue = 0.8;
        this.posValue = 300;
        // sin and cos
        this.v0 = p5.Vector.random2D()
        this.v1 = this.v0
        this.pos = createVector(sin(this.v1.x) * random(this.posValue) , sin(this.v1.y) * random(this.posValue) )
        // just random pos
            // this.pos = createVector(random(-this.posValue,this.posValue), random(-this.posValue, this.posValue))
        this.count = 0;
        // Large Circle maybe 2 or 3 how to calculate?
        this.oSize = random(20, 100);
        this.cSize = this.oSize - (this.count * this.wValue);
        // console.log(this.pos.y, this.pos.x)
    }


    draw(){
        
    }

    update(volSizeG){
        push()
        translate(this.pos.x, this.pos.y)
        if( this.count < 50 && this.cSize > 0){
            if(this.count % 3 === 0){
    
                fill(this.count + 50, 100, 100)
            }else{
                fill(0)
            }
            // sin and cos
            ellipse( WIDTH / 2 + random(-3, 3), HEIGHT/2 - (this.count * 5), this.cSize, this.cSize )
            // just random pos
                // ellipse( WIDTH / 2 + random(-cWidthValue, cWidthValue), HEIGHT/2 - (this.count * cHeightValue), this.cSize, this.cSize /1 )
            
            push()
                // blendMode(BLEND)
                noStroke()
                fill(0,10,10, 2)
                ellipse( WIDTH / 2 + random(-3, 3) + (this.count * 5), HEIGHT/2 + (this.count * 5), this.cSize, this.cSize /1 )
            pop()
            this.cSize = this.oSize - (this.count * this.wValue);
            this.count += 1;

        }
        pop()
    }
}