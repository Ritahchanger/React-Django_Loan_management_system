from django.contrib import admin
from django.urls import path,include
from rest_framework.decorators import api_view
from rest_framework.response import Response



@api_view(['GET'])

def testapi(request):
    return Response({"message": "Hello world"})

urlpatterns = [
    path('api/users/',include('apps.users.urls')),
    path('api/projects/',include('apps.projects.urls')),
    path('api/loans/',include('apps.loans.urls')),
    path('admin/', admin.site.urls),
    path('', testapi, name='home'), 
]