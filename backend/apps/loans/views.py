from rest_framework import generics
from .models import LoanApplication
from .serializers import LoanApplicationSerializer
from rest_framework.permissions import IsAuthenticated

# View to list and create loan applications
class LoanApplicationListCreateView(generics.ListCreateAPIView):
    queryset = LoanApplication.objects.all()
    serializer_class = LoanApplicationSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access

    def get_queryset(self):
        if self.request.user.is_authenticated:
            print("Authenticated User: ", self.request.user)
            return LoanApplication.objects.filter(user=self.request.user)
        else:
            print("User is not authenticated")
            return LoanApplication.objects.none()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



# View to retrieve, update, or delete a loan application
class LoanApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LoanApplication.objects.all()
    serializer_class = LoanApplicationSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access

    def perform_update(self, serializer):
        # You can add extra logic for updating the loan application
        serializer.save()
