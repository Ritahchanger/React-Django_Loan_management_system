from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.users.views import UserViewSet, CustomUserViewSet
from apps.loans.views import LoanApplicationViewSet, LoanCategoryViewSet, LoanCalculatorViewSet
from apps.investors.views import InvestorViewSet, InvestmentViewSet
from apps.about.views import AboutUsViewSet
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'custom-users', CustomUserViewSet, basename='custom-user')
router.register(r'loan-applications', LoanApplicationViewSet, basename='loan-application')
router.register(r'loan-categories', LoanCategoryViewSet, basename='loan-category')
router.register(r'loan-calculator', LoanCalculatorViewSet, basename='loan-calculator')
router.register(r'investors', InvestorViewSet, basename='investor')
router.register(r'investments', InvestmentViewSet, basename='investment')
router.register(r'about-us', AboutUsViewSet, basename='about-us')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]