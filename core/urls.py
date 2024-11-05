from django.urls import path
from .views import AdminAddAppView, AppsListView

urlpatterns = [
    path('add-app/', AdminAddAppView.as_view(), name='admin-add-app'),
    path('apps/', AppsListView.as_view(), name='apps_list'),
    path('apps/<int:id>/', AppsListView.as_view(), name='app_detail')
]