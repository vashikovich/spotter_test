from datetime import datetime, timedelta
from typing import List, Dict

FUELING_DURATION = 15 * 60  # 15 minutes in seconds
REST_WHILE_FUELING_DURATION = 15 * 60  # 15 minutes in seconds
REST_DURATION = 30 * 60  # 30 minutes in seconds
LONG_REST_DURATION = 10 * 60 * 60  # 10 hours in seconds
STOP_DURATION = 60 * 60  # 1 hour in seconds

MAX_DRIVING_HOURS = 10.5 * 60 * 60  # 10.5 hours in seconds
DRIVING_WINDOW = 13.5 * 60 * 60  # 13.5 hours in seconds
DRIVING_BEFORE_REST = 7.5 * 60 * 60  # 7.5 hours in seconds
DISTANCE_BEFORE_FUELING = 900 * 1609.34  # 900 miles in meters

ON_DUTY_LIMIT = 70 * 60 * 60 # 70 hours is seconds

def process_route(route_data: Dict, used_hours: int):
    stops = []
    timeline = []
    
    # Initialize with current position
    stops.append({
        "lat": route_data["coordinates"][0]["lat"],
        "long": route_data["coordinates"][0]["long"],
        "type": "current",
        "desc": "Current position"
    })
    
    pickup_idx = len(route_data["legs"][0]["distance"])

    coordinates = route_data["coordinates"][1:]
    distances = [dist for leg in route_data["legs"] for dist in leg["distance"]]
    durations = [dur for leg in route_data["legs"] for dur in leg["duration"]]
    
    current_time = 0
    dist_for_fueling = 0
    driving_time = 0
    driving_time_for_rest = 0
    driving_window_start = 0
    on_duty_time = 0
    
    # Process each checkpoint of the journey
    for idx in range(len(coordinates)):
        
        next_coordinate = coordinates[idx]
        next_distance = distances[idx]
        next_duration = durations[idx]
        
        # Add driving segment to timeline or update existing one
        if timeline and timeline[-1]["type"] == "driving":
            timeline[-1]["end"] = current_time + next_duration
        else:
            timeline.append({
                "start": current_time,
                "end": current_time + next_duration,
                "type": "driving",
                "desc": "Driving"
            })
        
        dist_for_fueling += next_distance
        current_time += next_duration
        driving_time += next_duration
        driving_time_for_rest += next_duration
        on_duty_time += next_duration
        
        # Calculate fuel stops for this leg
        if dist_for_fueling > DISTANCE_BEFORE_FUELING:
            
            # Add stops for fueling
            stops.append({
                "lat": next_coordinate["lat"],
                "long": next_coordinate["long"],
                "type": "fueling",
                "desc": "Fuel stop"
            })
            
            # Add fueling to timeline
            timeline.append({
                "start": current_time,
                "end": current_time + FUELING_DURATION,
                "type": "on_duty",
                "desc": "Fueling"
            })
            current_time += FUELING_DURATION
            dist_for_fueling = 0
            on_duty_time += FUELING_DURATION
            
            # Check if rest is needed after fueling so to rest while fueling on gas station
            if DRIVING_BEFORE_REST * 0.8 <= driving_time_for_rest:
                timeline.append({
                    "start": current_time,
                    "end": current_time + REST_WHILE_FUELING_DURATION,
                    "type": "off_duty",
                    "desc": "30-min break while fueling"
                })
                stops[-1]["desc"] = "Fuel stop while 30-min break"
                current_time += REST_WHILE_FUELING_DURATION
                driving_time_for_rest = 0
            
        # Add pickup stop
        if idx == pickup_idx:
            stops.append({
                "lat": next_coordinate["lat"],
                "long": next_coordinate["long"],
                "type": "pickup",
                "desc": "Pickup location"
            })
            timeline.append({
                "start": current_time,
                "end": current_time + STOP_DURATION,
                "type": "on_duty",
                "desc": "Loading at pickup location"
            })
            current_time += STOP_DURATION
            on_duty_time += STOP_DURATION
            
        elif idx == len(coordinates) - 1:  # add dropoff stop
            stops.append({
                "lat": next_coordinate["lat"],
                "long": next_coordinate["long"],
                "type": "dropoff",
                "desc": "Dropoff location"
            })
            timeline.append({
                "start": current_time,
                "end": current_time + STOP_DURATION,
                "type": "on_duty",
                "desc": "Unloading at dropoff location"
            })
            current_time += STOP_DURATION
            on_duty_time += STOP_DURATION
        
        # Check for maximum driving time or on-duty time
        if driving_time >= MAX_DRIVING_HOURS or current_time - driving_window_start >= DRIVING_WINDOW:
            stops.append({
                "lat": next_coordinate["lat"],
                "long": next_coordinate["long"],
                "type": "rest",
                "desc": "Mandatory 10-hour rest"
            })
            
            timeline.append({
                "start": current_time,
                "end": current_time + LONG_REST_DURATION,
                "type": "sleeper_berth",
                "desc": "Mandatory 10-hour rest"
            })
            
            current_time += LONG_REST_DURATION
            driving_time = 0
            driving_time_for_rest = 0
            driving_window_start = current_time
            
        # Check for mandatory 30-min break
        elif driving_time_for_rest >= DRIVING_BEFORE_REST:         
            stops.append({
                "lat": next_coordinate["lat"],
                "long": next_coordinate["long"],
                "type": "rest",
                "desc": "30-min break stop"
            })
            
            timeline.append({
                "start": current_time,
                "end": current_time + REST_DURATION,
                "type": "off_duty",
                "desc": "30-min break"
            })
            
            driving_time_for_rest = 0
            current_time += REST_DURATION

    return {
        "totalDuration": route_data["total_duration"],
        "totalDistance": route_data["total_distance"],
        "route": route_data["coordinates"],
        "stops": stops,
        "timeline": timeline,
        "limitWarning": on_duty_time > ON_DUTY_LIMIT - used_hours * 60 * 60
    }