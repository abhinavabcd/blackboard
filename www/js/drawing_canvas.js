/* © 2009 ROBO Design
 * http://www.robodesign.ro
 */

  // This painting tool works like a drawing pencil which tracks the mouse 
  // movements.

function tool_pencil (canvas,context) {
    var tool = this;
    tool.canvas=canvas;
    tool.context=context;
    this.started = false;
    var _data=[];
    var _tool_properties=["#000000",2,'round'];

    this.set_tool_properties=function(color,size,line_cap){
    	if(!line_cap) line_cap='round';
    	_tool_properties=[color,size,line_cap];
    	context.strokeStyle = color;
        context.lineWidth = size;
        if(line_cap) context.lineCap=line_cap;
     }
    this.mousedown = function (ev) {
        context.beginPath();
        context.moveTo(ev._x, ev._y);
    
        _data.push(_tool_properties);
        _data.push([ev._x, ev._y]);
        
        tool.started = true;
    };
    this.mousemove = function (ev) {
      if (tool.started) {
        context.lineTo(ev._x, ev._y);
    	
        _data.push([ev._x, ev._y]);
 
        context.stroke();
      }
    };
    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        data_buffer.push(_data);
        _data=[];
        //send_data();
        tool.started = false;
      }
    };
    
  };

function init_drawing_tools(){
	 canvas = document.getElementById('panel');
    context = canvas.getContext('2d');
    _drawing_tool = new tool_pencil(canvas,context);
    _drawing_tool.set_tool_properties("#000000",2);
    
    _drawing_tool_2 = new tool_pencil(canvas,context);
    _drawing_tool_2.set_tool_properties("#000000",2);
    
};
function clear_canvas(ctx,canvas){
	
	ctx.save();

	// Use the identity matrix while clearing the canvas
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Restore the transform
	ctx.restore();
	temp["force_pic_state"]=true;
    //send_data();

}
function apply_changes_canvas(data){
    var canvas_changes_list=eval(data['data']);	    
    
    for(var l=0;l<canvas_changes_list.length;l++){
	    canvas_data=eval(canvas_changes_list[l]);
	    for(var i=0;i<canvas_data.length;i++){
	    	
	    	_drawing_tool_2.set_tool_properties(canvas_data[i][0][0],canvas_data[i][0][1],canvas_data[i][0][2]); //tool properties in the first data item
	    	_drawing_tool_2.mousedown({_x:canvas_data[i][1][0],_y:canvas_data[i][1][1]});
	    	for(var j=2;j<canvas_data[i].length-1;j++){
	    		_drawing_tool_2.mousemove({_x:canvas_data[i][j][0],_y:canvas_data[i][j][1]});
	    	}	    	
	    	_drawing_tool_2.mousedown({_x:canvas_data[i][j][0],_y:canvas_data[i][j][1]});	    	
	    
	    } 
    }

};