# apps/users/urls.py
from django.urls import path
from apps.users.views import LoginUserView,RegisterUserView,UserProfileView,UserView,IncrementInvestmentView

urlpatterns = [
  
    path('register/', RegisterUserView.as_view(), name='register_user'), 
    path('login/', LoginUserView.as_view(), name='login_user'),  
    path('profile/<int:user_id>/', UserProfileView.as_view(), name='user_profile'),  
    path('projects/<int:user_id>/', UserView.as_view(), name='user_projects'),  
    path('investors/<int:user_id>/', UserView.as_view(), name='user_investors'),  
    path("users/<int:user_id>/<str:action>/", UserView.as_view()),
    path("increment-investment/",IncrementInvestmentView.as_view())
]