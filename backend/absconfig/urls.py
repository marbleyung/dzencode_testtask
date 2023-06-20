from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from . import settings
from .openapi import urlpatterns as openapi_urls
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/users/', include('user_auth.urls')),
    path('api/v1/', include('comments.urls')),
]

urlpatterns += openapi_urls

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
