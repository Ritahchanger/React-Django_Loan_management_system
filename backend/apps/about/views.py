from rest_framework import viewsets
from .models import AboutUs
from .serializers import AboutUsSerializer

# About Us Viewset to handle CRUD operations
class AboutUsViewSet(viewsets.ModelViewSet):
    queryset = AboutUs.objects.all()
    serializer_class = AboutUsSerializer
