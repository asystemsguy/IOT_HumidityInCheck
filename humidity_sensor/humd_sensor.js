var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')
var current_humd = 0;
var timer;

function read_humd_value(){
    current_humd = Math.ceil(Math.random()*100);
    send_value(current_humd);
    console.log("Currently realtive humidity ="+current_humd+"%");
};

function send_value(humd){
    //send the humidity value  
  client.publish('humd', humd.toString(), function (err) {
    if (err) {
       console.log("connection error");
    }
  })
}

timer = setInterval(read_humd_value,200);


 
