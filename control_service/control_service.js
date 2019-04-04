var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')
var temp = 0;
var humd = 0;
var presence = 0;
var vent = 0;
var predictive_switch = 0;
var control_id = 0;
const fs = require('fs');

function check_value(){

	console.log("11 "+temp+" h "+humd+" p "+presence);
	//validity check
	if (temp < 100 && humd <= 100 && presence == (0 || 1))
	{
		console.log("14 "+temp);
		//if actual thresholds are exceeded switch on the vent fan
		if(temp > 30 && humd < 50 && presence == 1) {
			vent  = 1;
			activate_vent_fan(1);
			console.log("switching on the fan for id "+control_id)
			send_to_dataagg();
		}
		else if(predictive_switch == 1) {
			activate_vent_fan(1);
			console.log("predictively switching on the fan for id "+control_id)
		}
		else {
			vent = 0;
			activate_vent_fan(0);
			console.log("switching off the fan for id "+control_id)
			send_to_dataagg();
		}
	}
};

var timer = setInterval(check_value,200);
var args = process.argv.slice(2);
let rawdata = fs.readFileSync(args[0]);  
let CONFIG = JSON.parse(rawdata); 
control_id =  CONFIG.id;

client.subscribe('presence'+control_id.toString(), function (err) {
	if (err) {
		console.log("can't subscribe to presence");
	}
})
console.log('temp'+control_id.toString())
client.subscribe('temp'+control_id.toString(), function (err) {
	if (err) {
		console.log("can't subscribe to temp");
	}
})
client.subscribe('humd'+control_id.toString(), function (err) {
	if (err) {
		console.log("can't subscribe to humd");
	}
})
client.subscribe('predictive_switch', function (err) {
	if (err) {
		console.log("can't subscribe to humd");
	}
})

function activate_vent_fan(vent){

	// send message to vent fan
	client.publish('vent'+control_id.toString(), vent.toString(), function (err) {
		if (err) {
			console.log("connection error");
		}
	})
	console.log("vent fan started")
};

client.on('message', function (topic, message) {
	//console.log(topic);
	if (topic == "temp"+control_id.toString()) {
		temp = Number(message);

		//	console.log(temp);
	} else if (topic == "humd"+control_id.toString()) {
		humd = Number(message);
	} else if (topic == "presence"+control_id.toString()) {
		presence = Number(message);
	} else if (topic == "predictive_switch") {
		predictive_switch = Number(message)
	}	  
})


function send_to_dataagg(){
	client.publish('aggr', JSON.stringify({"id": control_id, "presence": presence, "temp": temp, "humd": humd, "vent": vent}))
};

