from django.urls import path, include
from .views import (
    ContactViewSet
)
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
router = DefaultRouter()
router.register(r'contacts', ContactViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="Contacts API",
        default_version='v1',
        description="API documentation for the Contacts app",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    # API URLs
    path('api/', include(router.urls)),

    # API Documentation
    path('api/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]