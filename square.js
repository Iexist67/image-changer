export default class square{
    constructor(x, y, r, g, b, a){
        this.height = 2;
        this.width = 2;
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.color = `rgba(${r}, ${g}, ${b}, ${a/255})`;
        this.gray = (0.299 * this.r + 0.587 * this.g + 0.114 * this.b);
        this.newX = x;
        this.newY = y;
        this.changeX = 0;
        this.changeY = 0;
    }
    changeNews(x, y){
        this.newX = x;
        this.newY = y;
    }

    calculateDistance(){
        this.changeX = (this.newX - this.x) / 250;
        this.changeY = (this.newY - this.y) / 250;
    }
    changeXY(){
        this.x += this.changeX;
        this.y += this.changeY;
    }

}