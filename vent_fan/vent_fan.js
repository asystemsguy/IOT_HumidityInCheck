var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')
var vent_switch = 0;
var vent_switched_on = 0;
var timer;
var vent_id = 0;
const fs = require('fs');
var args = process.argv.slice(2);

function read_vent_value(){
   
    let rawdata = fs.readFileSync(args[0]);  
    let CONFIG = JSON.parse(rawdata); 
    vent_id =  CONFIG.id;
    if(vent_switch == 1 && vent_switched_on != 1) 
     {
        vent_switched_on = 1;
       console.log("Switching on the vent fan of id "+vent_id+"\n");
     } else if(vent_switch == 0 && vent_switched_on != 0) {
        vent_switched_on = 0;     
       console.log("Switching off the vent fan "+vent_id+"\n");
     }
};

  client.subscribe('vent'+vent_id.toString(), function (err) {
    if (err) {
      console.log("can't subscribe to presence");
    }
  })


client.on('message', function (topic, message) {
          console.log(topic);
          if (topic == "vent") {
		  vent_switch = Number(message);
          } 
          console.log(message.toString())

        })

timer = setInterval(read_vent_value,200);
