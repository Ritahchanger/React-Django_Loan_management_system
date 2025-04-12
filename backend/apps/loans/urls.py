from django.urls import path
from .views import LoanApplicationListCreateView, LoanApplicationDetailView

urlpatterns = [
    path(
        "loan-applications/",
        LoanApplicationListCreateView.as_view(),
        name="loan-application-list-create",
    ),
    path(
        "loan-applications/<int:pk>/",
        LoanApplicationDetailView.as_view(),
        name="loan-application-detail",
    ),
]
