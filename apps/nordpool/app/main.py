import asyncio
from fastapi import FastAPI, WebSocket
from nordpool import elspot, elbas
import json
from datetime import datetime

app = FastAPI()

# Initialize class for fetching Elspot prices
prices_spot = elspot.Prices()

# Initialize class for fetching Elsbas prices
prices_bas = elbas.Prices()


class DateTimeEncoder(json.JSONEncoder):
    """
    Custom encoder for parsing ISO dates
    """

    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()
        return super().default(o)


async def send_prices(websocket: WebSocket):
    """
    Utility function for sending the prices using WebSockets
    """
    while True:
        prices = prices_spot.hourly(areas=["LV"])  # Fetch NordPool prices
        json_prices = json.dumps(
            prices, cls=DateTimeEncoder
        )  # Convert prices to JSON format using custom encoder
        await websocket.send_text(json_prices)  # Send JSON data to WebSocket client
        await asyncio.sleep(60)  # Wait for 60 seconds before sending the next update


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    The WebSocket endpoint
    """
    await websocket.accept()

    # Start the task to send updates at an interval
    await send_prices(websocket)
