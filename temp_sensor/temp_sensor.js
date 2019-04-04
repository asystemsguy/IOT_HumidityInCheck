var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')
var current_temp = 0;
var timer;
var sensor_id = 0;
const fs = require('fs');
var args = process.argv.slice(2);

function read_temp_value(){
    let rawdata = fs.readFileSync(args[0]);  
    let CONFIG = JSON.parse(rawdata); 
    current_temp = CONFIG.temp; //read humidity values
    sensor_id = CONFIG.id; //read sensor id
    send_value(current_temp);
    console.log("Currently temperature ="+current_temp+" c for sensor id "+sensor_id);
};

function send_value(temp){
    //send the temp
     console.log('temp'+sensor_id.toString())
   	client.publish('temp'+sensor_id.toString(), temp.toString(), function (err) {
	    if (err) {
	       console.log("connection error");
	    }
	  })
}

//read_temp_value()
timer = setInterval(read_temp_value,200);


 
