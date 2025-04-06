from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Investor, Investment
from .serializers import InvestorSerializer, InvestmentSerializer

class InvestorViewSet(viewsets.ModelViewSet):
    queryset = Investor.objects.all()
    serializer_class = InvestorSerializer

    # Custom action to handle checking if the investor is eligible
    @action(detail=True, methods=['get'])    
    def check_eligibility(self, request, pk=None):
        investor = self.get_object()
        if investor.is_eligible():
            return Response({"message": "Investor is eligible."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Investor does not meet the minimum deposit requirement."}, 
                            status=status.HTTP_400_BAD_REQUEST)

    # Custom action to get the investments of a specific investor
    @action(detail=True, methods=['get'])
    def investments(self, request, pk=None):
        investor = self.get_object()
        investments = Investment.objects.filter(investor=investor)
        serializer = InvestmentSerializer(investments, many=True)
        return Response(serializer.data)

    # Custom action to add an investment for a specific investor
    @action(detail=True, methods=['post'])
    def invest(self, request, pk=None):
        investor = self.get_object()

        # Check if investor meets the eligibility
        if not investor.is_eligible():
            return Response({"error": "Investor does not meet the minimum deposit requirement."}, 
                            status=status.HTTP_400_BAD_REQUEST)
        
        serializer = InvestmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(investor=investor)  # Assign investor from the URL (pk)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def list(self,request, *args, **kwargs):

        investors = self.get_queryset()

        serializer = InvestorSerializer(investors,many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class InvestmentViewSet(viewsets.ModelViewSet):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer

    # Custom action to approve an investment
    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        investment = self.get_object()
        investment.approve()
        return Response({"message": "Investment approved."}, status=status.HTTP_200_OK)

    # Custom action to deny an investment
    @action(detail=True, methods=['post'])
    def deny(self, request, pk=None):
        investment = self.get_object()
        investment.deny()
        return Response({"message": "Investment denied."}, status=status.HTTP_200_OK)
