from django.urls import path
from .views import *


urlpatterns = [
    path('register/', CreateUserView.as_view(), name='user-register')
]
