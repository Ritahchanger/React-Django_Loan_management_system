from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from apps.users.models import CustomUser
from apps.users.serializers import (
    CustomUserSerializer,
    RegisterUserSerializer,
    UserProfileSerializer,
)
from apps.projects.models import Project
from apps.projects.serializers import ProjectSerializer


class LoginUserView(APIView):
    permission_classes = [permissions.AllowAny]  # Allow any user to login

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {
                    "detail": "Username and password are required.",
                    "status": 400,
                    "success": False,
                },
                status=status.HTTP_200_OK,
            )

        user = authenticate(username=username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {
                    "token": token.key,
                    "user": CustomUserSerializer(user).data,
                    "success": True,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"detail": "Invalid credentials.", status: 400, "success": False},
                status=status.HTTP_200_OK,
            )


class RegisterUserView(APIView):
    permission_classes = []  # Allow anyone to register

    def post(self, request):
        data = request.data.copy()

        email = data.get("email")
        username = data.get("username")

        # Check if email already exists
        if CustomUser.objects.filter(email=email).exists():
            return Response(
                {"success": False, "message": "Email already exists.", "status": 400},
                status=status.HTTP_200_OK,
            )

        # Check if username already exists
        if CustomUser.objects.filter(username=username).exists():
            return Response(
                {
                    "success": False,
                    "message": "Username already exists.",
                    "status": 400,
                },
                status=status.HTTP_200_OK,
            )

        # Don't send confirmPassword to serializer
        data.pop("confirmPassword", None)

        serializer = RegisterUserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "success": True,
                    "message": "User created successfully.",
                    "status": 201,
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {"success": False, "errors": serializer.errors, "status": 400},
            status=status.HTTP_200_OK,
        )


class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id=None):
        # Ensure the user is viewing their own profile or is an admin
        if request.user.id != user_id and request.user.role != "admin":
            return Response(
                {"detail": "You do not have permission to view this user's profile."},
                status=403,
            )

        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response(
                {"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = UserProfileSerializer(user)
        return Response(serializer.data)


class UserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, action=None):
        if action == "login":
            return LoginUserView.as_view()(request)

        elif action == "signup":
            return RegisterUserView.as_view()(request)

        return Response(
            {"detail": "Invalid action."}, status=status.HTTP_400_BAD_REQUEST
        )

    def get(self, request, user_id=None, action=None):
        if action == "projects":
            if request.user.id != user_id and request.user.role != "admin":
                return Response(
                    {
                        "detail": "You do not have permission to view this user's projects."
                    },
                    status=403,
                )

            projects = Project.objects.filter(pitched_by=user_id)
            serializer = ProjectSerializer(projects, many=True)
            return Response(serializer.data)

        elif action == "investors":
            if request.user.id != user_id and request.user.role != "admin":
                return Response(
                    {
                        "detail": "You do not have permission to view this user's investors."
                    },
                    status=403,
                )

            investors = CustomUser.objects.filter(
                role="investor", investment_amount__gte=100000
            )
            invested_projects = Project.objects.filter(pitched_by=user_id)

            if not invested_projects or not investors:
                return Response(
                    {
                        "detail": "No investors found or no projects pitched by this user."
                    },
                    status=404,
                )

            invested_in_user = []
            for investor in investors:
                for project in invested_projects:
                    if project.pitched_by == investor:
                        invested_in_user.append(investor)

            if not invested_in_user:
                return Response(
                    {"detail": "No investors found for this user."}, status=404
                )

            serializer = CustomUserSerializer(invested_in_user, many=True)
            return Response(serializer.data)

        return Response(
            {"detail": "Invalid action."}, status=status.HTTP_400_BAD_REQUEST
        )
