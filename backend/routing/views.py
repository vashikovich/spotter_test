from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import RouteRequestSerializer
from .services.mapbox import get_route_from_mapbox
from .services.route_processor import process_route

@api_view(['GET'])
def get_route(request):
    serializer = RouteRequestSerializer(data=request.query_params)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data
    current = data['current']
    pickup = data['pickup']
    dropoff = data['dropoff']
    used_hours = data['usedHrs']

    coordinates = [current, pickup, dropoff]

    try:
        route = get_route_from_mapbox(coordinates)
        processed_route = process_route(route, used_hours)
        return Response(processed_route)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)