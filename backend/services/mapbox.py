import requests
from django.conf import settings

MAPBOX_ACCESS_TOKEN = settings.MAPBOX_ACCESS_TOKEN
MAPBOX_DIRECTIONS_URL = "https://api.mapbox.com/directions/v5/mapbox/driving"

def get_route_from_mapbox(coordinates):
    coordinates_str = ";".join([f"{coord['long']},{coord['lat']}" for coord in coordinates])
    
    params = {
        "access_token": MAPBOX_ACCESS_TOKEN,
        "coordinates": coordinates_str,
        "annotations": "duration",
        "geometries": "geojson"
    }

    response = requests.get(MAPBOX_DIRECTIONS_URL, params=params)
    response.raise_for_status()
    route_data = response.json()

    if not route_data.get('routes'):
        raise Exception("No route found")

    route = route_data['routes'][0]
    return {
        "geometry": route['geometry'],
        "duration": route['duration'],  # Total duration in seconds
        "distance": route['distance'],  # Total distance in meters
        "legs": [
            {
                "duration": leg['duration'],
                "distance": leg['distance']
            } for leg in route['legs']
        ]
    }
