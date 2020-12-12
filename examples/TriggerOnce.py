# This triggers the trigger defined in the TriggerName variable once with whatever is in the Datavariable

import requests
from urllib.parse import quote_plus

TriggerName = "python"
ServerHost = "localhost:3000"
Data = "This is a test trigger coming from TriggerOnce.py 😊"

requests.get(f"http://{ServerHost}/api/trigger/?trigger={TriggerName}&data={quote_plus(Data)}")
