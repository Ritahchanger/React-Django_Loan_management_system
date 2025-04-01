from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Investor, Investment
from .serializers import InvestorSerializer, InvestmentSerializer


from rest_framework.decorators import action

# Investor viewset to handle CRUD operations

class InvestorViewSet(viewsets.ModelViewSet):
    queryset = Investor.objects.all()
    serializer_class = InvestorSerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @action(detail=True, methods=['post'])
    def invest(self, request, pk=None):
        investor = self.get_object()
        investment_amount = request.data.get('investment_amount', 0)
        if investment_amount < 100000:
            return Response({"error": "Minimum investment amount is 100,000 KSH"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Assuming we have an Investment model
        Investment.objects.create(investor=investor, amount_invested=investment_amount, sector=request.data.get('sector'))
        return Response({"message": "Investment successful"}, status=status.HTTP_200_OK)

# Investment viewset to handle CRUD operations
class InvestmentViewSet(viewsets.ModelViewSet):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
