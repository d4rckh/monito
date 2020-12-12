# This triggers the trigger defined in the TriggerName variable every 60 seconds with whatever is in Data variable

import requests
from time import sleep
from urllib.parse import urlparse

ONE_MINUTE = 60

TriggerName = "python"
ServerHost = "localhost:3000"

Data = "This is a test trigger coming from LogInterval.py :D"

try:
    while True:
        requests.get(f"http://{ServerHost}/api/trigger/?trigger={TriggerName}&data={urlparse(Data)}")
        sleep(ONE_MINUTE)
except:
    exit(0)