var data_buffer=[];
var ack_id=0;
var temp={
force_pic_state:false	
};

var get_data=function(from,callback){
	var request = $.ajax({
	  url: "./state/"+session_id+'?task=get_data',
	  type: "POST",
	  data: {'ack_id':from},
	  
	  success:function(data,status) {
	    if(ack_id>data['ack_id']){
	    	setTimeout(function(){get_data(0);},0);
	    	return;
	    }
	    ack_id=data['ack_id'];
	    
	    if('pic_state' in data){
	    	clear_canvas(_drawing_tool.context,_drawing_tool.canvas);
	    	var img = new Image();
	    	img.onload = function(){  
	    		_drawing_tool_2.context.drawImage(img,0,0,_drawing_tool_2.canvas.width,_drawing_tool_2.canvas.height);
	    		apply_changes_canvas(data);
	    	}
		    img.src = data['pic_state'];
		    
	    }
	    else apply_changes_canvas(data);
	    // drawings_done
	    if(callback){
	    	callback();
	    	return;
	    }
	    	setTimeout(function(){get_data(ack_id);},0);
	  },	  
  	  error:function(jqXHR, textStatus) {
			  alert( "Request failed: " + textStatus);
			    if(callback){
			    	callback();
			    	return;
			    }
			  setTimeout(function(){get_data(ack_id);},0);
	  }
	});
};

var send_data=function(){
	if(!data_buffer.length && !temp["force_pic_state"]) {
        setTimeout(send_data,100);
		return;
	}
    
	var new_data_buffer=(ack_id%50==0||temp["force_pic_state"])?{"pic_state":_drawing_tool.canvas.toDataURL()}:
									{"data":dojo.toJson(data_buffer)};
	
	if(temp["force_pic_state"]) temp["force_pic_state"]=false;								
	data_buffer=[];	
	var request = $.ajax({
	  url: "./state/"+session_id+'?task=add_new_data',
	  type: "POST",
	  data: {'new_data' : dojo.toJson(new_data_buffer),'ack_id':ack_id},	  
	  success:function(data,status) {
	    ack_id=data['ack_id'];
		setTimeout(send_data,100);
	  },
	  
  	  error:function(jqXHR, textStatus) {
			  alert( "Request failed: " + textStatus );
			  // do the resend ??  
			  setTimeout(send_data,1000);
  	  }
	});	
};



