from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from .models import Project
from .serializers import ProjectSerializer, InvestmentSerializer
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError

from .models import Investment


from django.db.models import Sum


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

    queryset = Project.objects.all().order_by("-id")

    serializer_class = ProjectSerializer

    permission_classes = [IsAuthenticated]


class ProjectUserView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]
        return Project.objects.filter(pitched_by_id=user_id).order_by("-id")


class MakeInvestmentView(generics.CreateAPIView):
    serializer_class = InvestmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        project = serializer.validated_data["project"]

        amount = serializer.validated_data["amount"]

        user = self.request.user

        if user.role != "investor":
            raise ValidationError("Only investors can make investments.")

        if not user.investment_amount or user.investment_amount < amount:
            raise ValidationError("Insufficient investment amount available.")

        if amount <= 0:
            raise ValidationError("Investment amount must be greater than zero.")

        if project.status != "active":
            raise ValidationError("You can only invest in active projects.")

        user.investment_amount -= amount
        user.save()

        serializer.save(investor=user)

        total_invested = (
            project.investments.aggregate(total=Sum("amount"))["total"] or 0
        )

        if total_invested >= project.budget:
            project.status = "funded"
            project.save()


class InvestorInvestmentView(generics.ListAPIView):

    serializer_class = InvestmentSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        return Investment.objects.filter(investor=user).order_by("-id")
