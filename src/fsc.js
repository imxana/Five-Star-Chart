/**
 * Created by xana on 10/13/17.
 * Reference from https://github.com/MoePlayer/APlayer/blob/master/src/APlayer.js
 */


class FSC {
    /**
     * FSC constructor function
     *
     * @param {Object} option - See README
     * @constructor
     */
    constructor(option) {
        const defaultOption = {
            element: document.getElementsByClassName('FSC')[0],
            size: { x: 300, y: 300 },
            scale: { font: 0.7, polygon: 0.5},
            font: "16px Arial",
            border : false,
            color: { line1: 'rgba(0,0,0,0.5)', line2:'rgba(0,0,0,1)', bg:'rgba(0,0,0,0.05)', cover: 'rgba(255,100,0,0.1)' },
            maxScore: 5,
            levelScore: 2,
            data: {},
            separator: ': '
        };
        for (let defaultKey in defaultOption) {
            if (defaultOption.hasOwnProperty(defaultKey) && !option.hasOwnProperty(defaultKey)) {
                option[defaultKey] = defaultOption[defaultKey];
            }
        }
        this.option = option;
        this.ctx = this._getContext();
        this._draw();
        this._load(option.data);
    }

    /**
     * FSC generator context 2d function
     *
     * @return context
     */
    _getContext() {
        let canvas = document.createElement("canvas");
        canvas.width = this.option.size.x;
        canvas.height = this.option.size.y;
        //canvas.style.zIndex = 8;
        //canvas.style.position = "absolute";
        this.option.border && (canvas.style.border = "1px solid");
        this.option.element.appendChild(canvas);
        return canvas.getContext('2d');
    }

    /**
     * FSC static polygon function
     *
     * @param c context
     * @param r radius
     * @param x center.x
     * @param y center.y
     * @param n n-sided-shape
     * @param angle angle-started
     * @param counterclockwise direction
     */
    polygon(c, r, x, y, n, angle, counterclockwise){
        angle = angle || 0;
        counterclockwise = counterclockwise ||false;
        c.moveTo(x+r*Math.sin(angle),
            y-r*Math.cos(angle));
        let delta = 2*Math.PI/n;
        for(var i=1 ; i < n ; i++){
            angle += counterclockwise ? -delta:delta;
            c.lineTo(x+r*Math.sin(angle),
                y-r*Math.cos(angle));
        }
        c.closePath();
    }

    /**
     * render the background polygon(s)
     * @private
     */
    _draw(){
        let c = this.ctx;
        let x = this.option.size.x / 2;
        let y = this.option.size.y / 2;
        let r = Math.min(x, y) * this.option.scale.polygon;
        let n = Object.keys(this.option.data).length;
        let m = this.option.maxScore;
        let l = this.option.levelScore;

        c.fillStyle = this.option.color.bg ;
        c.strokeStyle = this.option.color.line1;
        c.lineWidth = 1;
        c.beginPath();
        for(let i = r; i > 0 ; i -= r * l / m ){
            console.log(r,i);
            this.polygon(c, i, x, y, n);
        }
        c.fill();
        c.stroke();

    }

    /**
     * render the score and the text
     * @param data
     * @param r
     * @param angle
     * @param counterclockwise
     * @private
     */
    _load(data, r, angle, counterclockwise){
        let c = this.ctx;
        let n = Object.keys(data).length;
        let x = this.option.size.x / 2;
        let y = this.option.size.y / 2;
        r = r || Math.min(x, y) * this.option.scale.font;
        angle = angle || 0;
        counterclockwise = counterclockwise ||false;
        c.beginPath();
        c.textAlign="center";
        c.textBaseline="middle";
        c.font=this.option.font;
        let delta = 2*Math.PI/n;
        let first = true;
        for(let i in data){
            let s = Math.min(x, y)  * this.option.scale.polygon * data[i] / this.option.maxScore;
            if (first){
                first = false;
                c.moveTo(x+s*Math.sin(angle),
                    y-s*Math.cos(angle));
            } else{
                angle += counterclockwise ? -delta:delta;
                c.lineTo(x+s*Math.sin(angle),
                    y-s*Math.cos(angle));
            }
            c.fillStyle = "#000" ;
            c.fillText(i + this.option.separator + data[i], x+r*Math.sin(angle),
                y-r*Math.cos(angle));
            c.fillStyle = this.option.color.cover ;
        }
        c.closePath();
        c.fillStyle = 'rgba(255,100,0,0.1)';//this.option.color.cover ;
        c.strokeStyle = this.option.color.line2;
        c.lineWidth = 1;
        c.fill();
        c.stroke();
    }
}

//module.exports = FSC;
