var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')
var current_humd = 0;
var timer;
var sensor_id = 0;
const fs = require('fs');
var args = process.argv.slice(2);

function read_humd_value(){

    let rawdata = fs.readFileSync(args[0]);  
    let CONFIG = JSON.parse(rawdata); 
	current_humd = CONFIG.humd; //read humidity values
	sensor_id = CONFIG.id; //read sensor id
	send_value(current_humd);
	console.log("Currently realtive humidity ="+current_humd+"% for sensor id "+sensor_id);
};

function send_value(humd){
	//send the humidity value  
	client.publish('humd'+sensor_id.toString(), humd.toString(), function (err) {
		if (err) {
			console.log("connection error");
		}
	})
}

timer = setInterval(read_humd_value,200);



