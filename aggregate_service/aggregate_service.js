var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')
var temp = 0;
var humd = 0;
var presence = 0;
var vent = 0;
var predictive_service_asked = 0;
var count_values_to_send = 0;

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
	level: 'info',
	format: format.simple(),
	format: format.combine(
		format.colorize(),
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		format.json()
	),
	transports: [
		new transports.File({
			filename: 'dump.json',
			timestamp: true
		})
	]

});

client.subscribe('aggr', function (err) {
	if (err) {
		console.log("can't subscribe to presence");
	}
})

client.on('message', function (topic, message) {
	var temp = {};
	console.log(topic);
	if (topic == "aggr") {
		temp = JSON.parse(message);
	} 


	console.log(temp);

	if(temp.vent != vent) {
		// record the value in the file
		logger.info(temp);
		vent = temp.vent;

		count_values_to_send += 1;

		if(count_values_to_send == 10) {
			count_values_to_send = 0;
			send_10_previous_values();
		}
	}
	console.log(message.toString())
})

function send_10_previous_values() {

	var options = {
		from:   new Date - 24 * 60 * 60 * 1000,
		until:  new Date,
		limit:  10,
		start:  0,
		order:  'desc',
		fields: ['message']
	};
	logger.query(options, function (err, result) {
		if (err) {
			throw err;
		}
		client.publish('agg_values', JSON.stringify(result), function (err) {
			if (err) {
				console.log("connection error");
			}
		})
		console.log(result);
	});

}
