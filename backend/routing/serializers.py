from rest_framework import serializers

class RouteRequestSerializer(serializers.Serializer):
    current = serializers.CharField()
    pickup = serializers.CharField()
    dropoff = serializers.CharField()
    usedHrs = serializers.IntegerField(min_value=0)

    def validate_current(self, value):
        return validate_location(value)

    def validate_pickup(self, value):
        return validate_location(value)

    def validate_dropoff(self, value):
        return validate_location(value)

def validate_location(location_str):
    try:
        long, lat = map(float, location_str.split(','))
    except ValueError:
        raise serializers.ValidationError("Invalid location format. Expected 'lat,long'")

    # Rough bounding box for continental USA
    if not (24.396308 <= lat <= 49.384358 and -125.0 <= long <= -66.93457):
        raise serializers.ValidationError("Location must be inside USA")

    return {"long": long, "lat": lat}