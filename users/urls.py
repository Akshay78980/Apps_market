from django.urls import path
from .views import registration_view, login_view, UserProfileView, UploadScreenshotView
from django.views.generic import TemplateView

urlpatterns = [
    path('registration/', registration_view, name='user_registration'),
    path('login/', login_view, name='user_login'),
    # path('logout/', logout_view, name='user_logout'),
    path('profile/', UserProfileView.as_view(), name='user_profile_view'),
    path('upload_screenshot/', TemplateView.as_view(template_name='upload_screenshot.html'), name='upload_screenshot'),
    
]

