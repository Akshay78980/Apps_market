from django.urls import path
from core.views import AdminAddAppApiView, AppsListApiView, AppDownloadHistoryCreateApi, GetInstalledAppsApi
from users.views import UploadScreenshotView
urlpatterns = [
    path('add-app/', AdminAddAppApiView.as_view(),name='admin_add_app_api'),
    path('apps/', AppsListApiView.as_view(), name='apps_list_api'),
    path('apps/create-download-history/', AppDownloadHistoryCreateApi.as_view(), name='apps_download_history_create_api'),
    path('apps/installed/', GetInstalledAppsApi.as_view(), name='get_installed_apps'),
    path('user/downloaded_apps/<pk>/upload_screenshot/', UploadScreenshotView.as_view(), name='upload_screenshot_view'),
]