var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')
var temp = 0;
var humd = 0;
var presence = 0;
var vent = 0;
var predictive_switch = 0;
function check_value(){

//    receive_values();
	//validity check
	if (temp < 100 && humd <= 100 && presence == (0 || 1))
	{
		//if actual thresholds are exceeded switch on the vent fan
		if(temp > 30 && humd < 50 && presence == 1) {
		    vent  = 1;
			  activate_vent_fan(1);
        send_to_dataagg();
		}
    else if(predictive_switch == 1) {
        activate_vent_fan(1);
    }
		else {
			vent = 0;
		   activate_vent_fan(0);
       send_to_dataagg();
		}
	}
};

var timer = setInterval(check_value,200);

  client.subscribe('presence', function (err) {
    if (err) {
      console.log("can't subscribe to presence");
    }
  })
    client.subscribe('temp', function (err) {
    if (err) {
      console.log("can't subscribe to temp");
    }
  })
  client.subscribe('humd', function (err) {
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
  client.publish('vent', vent.toString(), function (err) {
    if (err) {
       console.log("connection error");
    }
  })
    console.log("vent fan started")
};

client.on('message', function (topic, message) {
	  console.log(topic);
	  if (topic == "temp") {
	     temp = Number(message);
	  } else if (topic == "humd") {
	  	  humd = Number(message);
	  } else if (topic == "presence") {
	  	  presence = Number(message);
	  } else if (topic == "predictive_switch") {
         predictive_switch = Number(message)
    }

	  console.log(message.toString())
	  
	})

function send_to_dataagg(){
    client.publish('agg_presence', presence.toString(), function (err) {
    if (err) {
       console.log("connection error");
    }
  })

    client.publish('agg_temp', temp.toString(), function (err) {
    if (err) {
       console.log("connection error");
    }
  })
      client.publish('agg_humd', humd.toString(), function (err) {
    if (err) {
       console.log("connection error");
    }
  })
        client.publish('agg_vent', vent.toString(), function (err) {
    if (err) {
       console.log("connection error");
    }
  })
};

