from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from .models import Project
from .serializers import ProjectSerializer, ProjectInvestmentSerializer
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

# View for viewing and investing in projects
class ProjectInvestmentView(generics.GenericAPIView):
    serializer_class = ProjectInvestmentSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=["post"])
    def invest(self, request, pk=None):
        project = generics.get_object_or_404(Project, pk=pk)
        user = request.user

        # Check if the user is an investor
        if user.role != "investor":
            raise ValidationError("Only investors can invest in projects.")

        # Validate the investment amount
        investment_serializer = self.get_serializer(data=request.data)
        investment_serializer.is_valid(raise_exception=True)
        investment_amount = investment_serializer.validated_data["amount"]

        if investment_amount > user.investment_amount:
            raise ValidationError("Insufficient funds to invest in this project.")

        # Deduct the investment from user's available amount
        user.investment_amount -= investment_amount
        user.save()

        # Here you can add logic to track investments for projects

        # Mark project as funded if investment exceeds or meets the goal
        if project.budget <= investment_amount:
            project.status = "funded"
            project.save()

        return Response(
            {"message": "Investment successful!"}, status=status.HTTP_200_OK
        )
