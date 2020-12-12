# This triggers the trigger defined in the TriggerName variable every 60 seconds.

import requests
from time import sleep

ONE_MINUTE = 60

TriggerName = "python"
ServerHost = "localhost:3000"

try:
    while True:
        requests.get(f"http://{ServerHost}/api/trigger/?trigger={TriggerName}")
        sleep(ONE_MINUTE)
except:
    exit(0)