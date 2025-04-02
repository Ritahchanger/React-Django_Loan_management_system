from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Investor, Investment
from .serializers import InvestorSerializer, InvestmentSerializer

class InvestorViewSet(viewsets.ModelViewSet):
    queryset = Investor.objects.all()
    serializer_class = InvestorSerializer

    @action(detail=True, methods=['post'])
    def invest(self, request, pk=None):
        investor = self.get_object()
        serializer = InvestmentSerializer(data={
            'investor': investor.id,
            **request.data
        })
        
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class InvestmentViewSet(viewsets.ModelViewSet):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer