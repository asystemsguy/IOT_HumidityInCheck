var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')
var current_temp = 0;
var timer;

function read_temp_value(){
    current_temp = Math.ceil(Math.random()*50);
    send_value(current_temp);
    console.log("Currently temperature ="+current_temp+" c");
};

function send_value(temp){
    //send the temp
   	client.publish('temp', temp.toString(), function (err) {
	    if (err) {
	       console.log("connection error");
	    }
	  })
}

timer = setInterval(read_temp_value,200);


 
