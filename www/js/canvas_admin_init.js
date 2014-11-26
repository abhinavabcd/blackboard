function init_black_board() {
    init_drawing_tools();
    canvas.addEventListener('mousedown', ev_canvas, false);
    canvas.addEventListener('mousemove', ev_canvas, false);
    canvas.addEventListener('mouseup',   ev_canvas, false);
  }
//canvas _events
function ev_canvas (ev) {
  if (ev.layerX || ev.layerX == 0) { // Firefox
    ev._x = ev.layerX;
    ev._y = ev.layerY;
  } else if (ev.offsetX || ev.offsetX == 0) { // Opera
    ev._x = ev.offsetX;
    ev._y = ev.offsetY;
  }

  // Call the event handler of the tool.
  var func = _drawing_tool[ev.type];
  if (func) func(ev);
}; 



$('#eraser').click(function() {	
	// Change color and thickness of the line
	_drawing_tool.set_tool_properties("#FFFFFF",30,'square');
	
	$('#tools li.active').removeClass('active');
	$('#tools li#eraser').addClass('active');
	
	$('canvas#panel').removeClass();
	$('canvas#panel').addClass('erase');
});
$('#eraser').dblclick(function(){
	$('#eraser').click();
	clear_canvas(_drawing_tool.context,_drawing_tool.canvas);
	
});
$('#pen').click(function() {
			$('#tools li.active').removeClass('active');
			$('#tools li#pen').addClass('active');
			$('canvas#panel').removeClass();
			
			var color_val=$("#colors li.active");
			("#colors li")[0].addClass('active');
			
			color_val=color_val?$(color_val[0]).attr('val'):"#000000";			
			_drawing_tool.set_tool_properties(color_val,2,'round');
});

$('#colors li').click(function(ev){
	$('#colors li.active').removeClass('active');
	$(ev.target).addClass('active');
	var color_val=$(ev.target).attr('val');
	_drawing_tool.set_tool_properties(color_val,2,'round');
});