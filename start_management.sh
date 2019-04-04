# sensor services

# management services
node predictive_service/predictive_service.js &
node aggregate_service/aggregate_service.js &
node control_service/control_service.js ./config/room_1.json &
node control_service/control_service.js ./config/room_2.json &
