from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import CustomUser
from .serializers import UserSerializer, CustomUserSerializer

# User viewsets to handle CRUD operations
class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    # You can add custom actions like user verification or changing passwords here
    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        user = self.get_object()
        user.is_verified = True
        user.save()
        return Response({"message": "User successfully verified"}, status=status.HTTP_200_OK)

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    http_method_names = ['get', 'post', 'put', 'patch']

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
