var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')
var present = 0;
var timer;
var sensor_id = 0;
const fs = require('fs');
var args = process.argv.slice(2);

function present_handler(){
    
    let rawdata = fs.readFileSync(args[0]);  
    let CONFIG = JSON.parse(rawdata); 
    present = CONFIG.presence; //read humidity values
    sensor_id = CONFIG.id; //read sensor id
    send_value(present);
    console.log("Some one in the room  ="+present+" for sensor id "+sensor_id);
};

function send_value(present){
    //send the present
	client.publish('presence'+sensor_id.toString(), present.toString(), function (err) {
	    if (err) {
	       console.log("connection error");
	    }
	  })
}

//present_handler();
timer = setInterval(present_handler,200);


 
