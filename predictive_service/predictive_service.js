var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')
var present = 0;
var timer;
var data_items = {};
var time_periods_ones = {};
var total_time_periods = {};

client.subscribe('agg_values', function (err) {
	if (err) {
		console.log("can't subscribe to presence");
	}
})

client.on('message', function (topic, message) {

	if (topic == "agg_values") {

		temp = message;
		var data = JSON.parse(temp);
		console.log(JSON.stringify(data));
		for (var i = 0; i < data.file.length; i++) {
			var ele = {};
			ele["id"] = JSON.stringify(data.file[i].message.id);
			ele["temp"] = JSON.stringify(data.file[i].message.temp);
			ele["humd"] = JSON.stringify(data.file[i].message.humd);
			ele["presence"] = JSON.stringify(data.file[i].message.presence);
			ele["vent"] = JSON.stringify(data.file[i].message.vent);

			id = ele["id"]

			data_items[id] = ele;
			if (ele["vent"] == 1) { 
			   time_periods_ones[id] =+ 1
		        }
			total_time_periods[id] =+ 1

			if ( time_periods_ones[id]/total_time_periods[id] > 0.8) {
			     activate_vent_fan(1);
			}
		}
	}
})


function activate_vent_fan(vent){

	client.publish('predictive_switch', vent.toString(), function (err) {
		if (err) {
			console.log("connection error");
		}
	})
};
