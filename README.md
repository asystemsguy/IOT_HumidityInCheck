#  HumidityInCheck : Predictive humidity control
## What Application does

When the humidity reaches a specified level, activate one or more vent fans until the humidity is reduced to a specified level. Learn the changes in humidity based on time of day, temperature, and people present. Use this model to proactively activate the vent fans to maintain humidity levels.

## Architecture
<pre>
+----------------------+                                          +------------------+
|   Temperature and    |                                          | Vent fan service |
|   Humidity sensor    +------+       +-----------------+   +----->                  |
|   service            |      |       |                 |   |     |                  |
+----------------------+      +------>+  Control service+---+     +------------------+
                              |       |                 |   |
+----------------------+      |       +--------+--------+<  |
|   Temperature and    |      |                |         |  |     +------------------+
|   Humidity sensor    +------+       +--------v---------+  |     |  Vent fan service|
|   service            |      |       |                 ||  +----->                  |
+----------------------+      |    +->+  Data Aggregator||  |     |                  |
                              |    |  |                 ||  |     +------------------+
+----------------------+      |    |  +--------+---------+  |
|   Temperature and    |      |    |           |         |  |
|   Humidity sensor    +------+    |  +--------v---------+  |     +------------------+
|   service            |      |    |  |                 ||  |     |  Vent fan service|
+----------------------+      |    |  |  Prediction     ++  +----->                  |
                              |    |  |  Service        |         |                  |
+----------------------+      |    |  +-----------------+         +------------------+
|   Temperature and    |      |    |
|   Humidity sensor    +------+    |
|   service            |           +-------------+
+----------------------+                         |
                                      +----------+--------+
                                      |  Motion sensor    |
                                      |  service          |
                                      |                   |
                                      +-------------------+

</pre>
## Application constraints

1. Sensor services has to run on the device which has required hardware sensor, same applies to Vent fan service.
2. Control service, Data aggregator, and Prediction service can run on any device with sufficient resources.
3. Control service has two functions: First, maintains humidity below a threshold by starting vent fan, Second, starts vent fan when prediction service sends a command.
4. Data aggregator accumulates the historical data from control service.
6. Prediction service implements a machine learning model based on data accumulated by Data aggregator. Based on the model, predication service will send commands to control service to switch fan on or off.
