from rest_framework import serializers

class LocationSerializer(serializers.Serializer):
    lat = serializers.FloatField()
    long = serializers.FloatField()

    def validate(self, data):
        lat = data.get('lat')
        long = data.get('long')
        
        # Rough bounding box for continental USA
        if not (24.396308 <= lat <= 49.384358 and -125.0 <= long <= -66.93457):
            raise serializers.ValidationError("Location must be inside USA")
        
        return data

class RouteRequestSerializer(serializers.Serializer):
    current = LocationSerializer()
    pickup = LocationSerializer()
    dropoff = LocationSerializer()
    usedHrs = serializers.IntegerField(min_value=0)