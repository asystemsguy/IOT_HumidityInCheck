sudo ps aux | ack " node " | awk '{print $2}' | xargs kill -9
