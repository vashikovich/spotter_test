import requests
from django.conf import settings

MAPBOX_ACCESS_TOKEN = settings.MAPBOX_ACCESS_TOKEN
MAPBOX_DIRECTIONS_URL = "https://api.mapbox.com/directions/v5/mapbox/driving"

def get_route_from_mapbox(coordinates):
    coordinates_str = ";".join([f"{coord['long']},{coord['lat']}" for coord in coordinates])
    
    params = {
        "alternatives": "false",
        "annotations": "duration,distance",
        "continue_straight": "false",
        "geometries": "geojson",
        "language": "en",
        "overview": "full",
        "steps": "true",
        "access_token": MAPBOX_ACCESS_TOKEN,
    }
    
    url = f"{MAPBOX_DIRECTIONS_URL}/{requests.utils.quote(coordinates_str)}"

    response = requests.get(url, params=params)
    response.raise_for_status()
    route_data = response.json()

    if not route_data.get('routes'):
        raise Exception("No route found")

    route = route_data['routes'][0]
    return {
        "coordinates": [{"lat": coord[1], "long": coord[0]} for coord in route['geometry']['coordinates']],
        "total_duration": route['duration'],  # Total duration in seconds
        "total_distance": route['distance'],  # Total distance in meters
        "legs": [
            {
                "duration": leg['annotation']['duration'],
                "distance": leg['annotation']['distance']
            } for leg in route['legs']
        ]
    }
