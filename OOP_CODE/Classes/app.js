class Color{
    constructor(r,g,b, name){
       this.r = r;
       this.g = g;
       this.b = b;
       this.colorName = name;
    }
    innerRBG(){
        const {r, g, b} = this;
        return `(${r}, ${g}, ${b})`;
    }
    rgb(){
        return `rgb(${this.innerRBG()})`;
    }
    hex(){
        const {r, g, b} = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    rgba(a=1.0){
        return `rgba(${this.innerRBG()}, ${a})`;
    }

}

const c1 = new Color(255, 67, 89, 'tomato');