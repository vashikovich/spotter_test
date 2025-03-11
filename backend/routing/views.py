from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import RouteRequestSerializer

@api_view(['POST'])
def get_route(request):
    serializer = RouteRequestSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    data = serializer.validated_data
    current = data['current']
    pickup = data['pickup']
    dropoff = data['dropoff']
    used_hours = data['usedHrs']

    # Process the route logic here
    # ...existing code...

    return Response({"message": "Route processed successfully"})
