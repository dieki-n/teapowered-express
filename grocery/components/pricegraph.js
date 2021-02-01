import React from 'react'
import priceGraphStyles from './pricegraph.module.css'

class PriceGraph extends React.Component{
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }
    componentDidMount(){
        this.renderCanvas();
    }
    componentDidUpdate(){
        this.renderCanvas();
    }
    renderCanvas(){
        const num_marks = 25;
        const margin = 10;
        
        var price_range = 10;
        var date_start = new Date("12/01/2020");
        var date_end = new Date();
        var date_diff = date_end - date_start;
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        ctx.font = "12px Arial"
        ctx.lineWidth = "1px";

        //Draw background lines
        ctx.beginPath()
        ctx.translate(0.5, 0.5);
        for (var i = 0; i < num_marks + 1; i++){
            var y = Math.floor(margin + i * ((canvas.height - (margin * 2)) / num_marks));
            var x = Math.floor(margin + i * ((canvas.width - (margin * 2)) / num_marks));
            ctx.moveTo(margin, y)
            ctx.lineTo(canvas.width - margin, y)
            ctx.moveTo(x, margin);
            ctx.lineTo(x, canvas.height - margin);

        }
        ctx.strokeStyle = "#eee";
        
        ctx.stroke();
        ctx.translate(-0.5, -0.5);

        //Draw edges
        ctx.beginPath()
        ctx.strokeRect(margin, margin, canvas.width - margin * 2, canvas.height - margin * 2);

        //Draw tick marks
        for (var i = 0; i < num_marks + 1; i++){
            var y = Math.floor(margin + i * ((canvas.height - (margin * 2)) / num_marks));
            ctx.moveTo(margin, y)
            ctx.lineTo(margin + 5, y)
            //ctx.fillText(`\$${(price_range - (i * price_range / num_marks)).toFixed(2)}`, margin + 7, y + 4)
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = "1px";
        ctx.stroke();
        
        //Plot points
        this.props.data.forEach(d => {
            var sale_start = new Date(d.start)
            var sale_end = new Date(d.end)
            var x = ((date_start - sale_start) / date_diff) * (canvas.width - (margin * 2));
            
            console.log(x)
        })
        
        
    }
    render(){
        return (<div><canvas id={priceGraphStyles.canvas} ref={this.canvasRef} width="600" height="600" /></div>)
    }
}
export default PriceGraph