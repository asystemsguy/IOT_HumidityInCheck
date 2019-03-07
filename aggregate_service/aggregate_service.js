var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')
var temp = 0;
var humd = 0;
var presence = 0;
var vent = 0;
var predictive_service_asked = 0;

function store_value(){
     //find a good file format and store values
	if(predictive_service_asked) {
        send_10_previous_values();
     }	
};

client.subscribe('agg_presence', function (err) {
    if (err) {
      console.log("can't subscribe to presence");
    }
  })
    client.subscribe('agg_temp', function (err) {
    if (err) {
      console.log("can't subscribe to temp");
    }
  })
  client.subscribe('agg_humd', function (err) {
    if (err) {
      console.log("can't subscribe to humd");
    }
  })
  client.subscribe('agg_vent', function (err) {
    if (err) {
      console.log("can't subscribe to humd");
    }
  })

client.on('message', function (topic, message) {
          var vent_temp = 0;
	  console.log(topic);
          if (topic == "agg_temp") {
             temp = Number(message);
          } else if (topic == "agg_humd") {
                  humd = Number(message);
          } else if (topic == "agg_presence") {
                  presence = Number(message);
          } else if (topic == "agg_vent") {
	  
	         vent_temp = Number(message);
	  }

	 if(vent_temp != vent) {
	   // record the value in the file 
	 }
          console.log(message.toString())

        })

function send_10_previous_values() {
    
}
