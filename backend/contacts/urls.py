from django.urls import path, include
from .views import (
    ContactViewSet
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'contacts', ContactViewSet)

urlpatterns = [
    # API URLs
    path('api/', include(router.urls)),
]