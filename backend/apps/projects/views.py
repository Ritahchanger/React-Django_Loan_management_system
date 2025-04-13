from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from .models import Project
from .serializers import ProjectSerializer,InvestmentSerializer
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError


CustomUser = get_user_model()


# View for pitching projects
class ProjectPitchingView(generics.CreateAPIView):

    serializer_class = ProjectSerializer

    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Ensure only users with appropriate roles can pitch a project
        if self.request.user.role != "borrower":  # Replace 'user' with the actual role
            raise ValidationError("Only users can pitch projects.")
        serializer.save(pitched_by=self.request.user)


class ProjectListView(generics.ListAPIView):

    queryset = Project.objects.all()

    serializer_class = ProjectSerializer

    permission_classes = [IsAuthenticated]


class ProjectUserView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Project.objects.filter(pitched_by_id=user_id)




class MakeInvestmentView(generics.CreateAPIView):
    serializer_class = InvestmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        project = serializer.validated_data['project']
        amount = serializer.validated_data['amount']

        if amount is None or amount <= 0:
            raise ValidationError("Investment amount must be greater than zero.")

        if project.status != 'active':
            raise ValidationError("You can only invest in active projects.")

      
        serializer.save(investor=self.request.user)
