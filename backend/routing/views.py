from rest_framework.decorators import api_view
from rest_framework.response import Response
from decouple import config

@api_view(['GET'])
def get_route(request):
    return Response()
