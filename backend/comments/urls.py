from django.urls import path
from .views import (CommentListCreateView,
                    CommentRUDView,)


urlpatterns = [
    path('comments/', CommentListCreateView.as_view(), name='comments'),
    path('comments/<int:pk>/', CommentRUDView.as_view(), name='comment'),
]
