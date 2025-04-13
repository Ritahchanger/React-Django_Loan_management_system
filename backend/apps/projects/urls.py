from django.urls import path

from .views import ProjectListView, ProjectPitchingView, ProjectUserView, MakeInvestmentView

urlpatterns = [
    path("list/", ProjectListView.as_view(), name="project_list"),
    path("pitch/", ProjectPitchingView.as_view(), name="project_pitch"),
    path(
        "user-projects/<int:user_id>/", ProjectUserView.as_view(), name="user_projects"
    ),

    path('investments/',MakeInvestmentView.as_view())
]
