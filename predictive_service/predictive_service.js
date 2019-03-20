import MLR from 'ml-regression-multivariate-linear';

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')
var present = 0;
var timer;
var data_items = {};

client.subscribe('agg_values', function (err) {
    if (err) {
      console.log("can't subscribe to presence");
    }
  })

client.on('message', function (topic, message) {

    if (topic == "agg_values") {
    	   
           temp = message;
           var obj = JSON.parse(temp);
           console.log(JSON.stringify(obj));
           for (var i = 0; i < obj.file.length; i++) {
           	   var ele = {};
			   data = obj.file[i];
			   ele["temp"] = JSON.stringify(data.message.temp);
			   ele["humd"] = JSON.stringify(data.message.humd);
			   ele["presence"] = JSON.stringify(data.message.presence);
			   ele["vent"] = JSON.stringify(data.message.vent);
		       data_items[i] = ele;
		   }
    }
})

function predict_vent_fan_value(){ 
}

function activate_vent_fan(vent){

 client.publish('predictive_switch', vent, function (err) {
	    if (err) {
	       console.log("connection error");
	    }
	  })
 };