var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')
var present = 0;
var timer;

function present_handler(){
    present = Math.ceil(Math.random()-0.5);
    send_value(present);
    console.log("Some one in the room  ="+present);
};

function send_value(present){
    //send the present
	client.publish('present', present.toString(), function (err) {
	    if (err) {
	       console.log("connection error");
	    }
	  })
}

timer = setInterval(present_handler,200);


 
