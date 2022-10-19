const colors = [
    {s : {
        r: 253,
        g: 211,
        b: 2
    }},
    {
     s: {
        r: 234,
        g: 70,
        b: 83
     }
    },
    {
     s: {
        r: 46,
        g: 49,
        b: 145
     }
    },
    {
     s: {
        r: 231,
        g: 230,
        b: 223
     }
    },

]
console.log(colors[0].s.r)

class Cube {

    constructor(c, r, z) {
      this.c = c;
      this.r = r;
      this.z = z;
      this.random = Math.floor(random(4));
      this.red = colors[this.random].s.r;
      this.green = colors[this.random].s.g;
      this.blue = colors[this.random].s.b;

      this.nX = 0;
      this.nY = 0;
      
    }
    update(newX, newY ){
        this.nX = newX;
        this.nY = newY
    }
    draw() {
        // console.log(this.random)
      const x = gridTopX + (this.c - this.r) * sideLength *
        sqrt(3) / 2;
      const y = gridTopY + (this.c + this.r) * sideLength / 2 -
        (sideLength * this.z);
  
      const points = [];
      for (let angle = PI / 6; angle < PI * 2; angle += PI / 3) {
        points.push(
          createVector(x + cos(angle) * sideLength + this.nX,
            y + sin(angle) * sideLength + this.nY));
      }
  
      fill(this.red * .75, this.green * .75, this.blue * .75);
      quad(x, y,
        points[5].x, points[5].y,
        points[0].x, points[0].y,
        points[1].x, points[1].y);
  
      fill(this.red * .9, this.green * .9, this.blue * .9);
      quad(x, y,
        points[1].x, points[1].y,
        points[2].x, points[2].y,
        points[3].x, points[3].y);
  
      fill(this.red, this.green, this.blue);
      quad(x, y,
        points[3].x, points[3].y,
        points[4].x, points[4].y,
        points[5].x, points[5].y);
    }
  
    getSortString() {
      return this.z + '.' + this.r + '.' + this.c;
    }
  }