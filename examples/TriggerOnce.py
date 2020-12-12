# This triggers the trigger defined in the TriggerName variable once.

import requests

TriggerName = "python"
ServerHost = "localhost:3000"

requests.get(f"http://{ServerHost}/api/trigger/?trigger={TriggerName}")
