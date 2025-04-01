from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Loan, LoanCategory
from .serializers import LoanApplicationSerializer, LoanCategorySerializer, LoanCalculatorSerializer

from rest_framework.decorators import action

# Loan Application viewsets to handle CRUD operations
class LoanApplicationViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanApplicationSerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        loan = self.get_object()
        loan.status = 'Approved'
        loan.save()
        return Response({"message": "Loan successfully approved"}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def deny(self, request, pk=None):
        loan = self.get_object()
        loan.status = 'Denied'
        loan.save()
        return Response({"message": "Loan denied"}, status=status.HTTP_200_OK)

# Loan Category Viewset
class LoanCategoryViewSet(viewsets.ModelViewSet):
    queryset = LoanCategory.objects.all()
    serializer_class = LoanCategorySerializer

# Loan Calculator View
class LoanCalculatorViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = LoanCalculatorSerializer(data=request.data)
        if serializer.is_valid():
            total_payment = serializer.calculate_total_payment()
            return Response({"total_payment": total_payment}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
