from rest_framework import serializers
from .models import App, AppDownload

class AppSerializer(serializers.ModelSerializer):
    class Meta:
        model = App
        fields = ['id', 'name', 'points', 'app_file','image']

class AppDownloadSerializer(serializers.ModelSerializer):
    app_name = serializers.SerializerMethodField()

    class Meta:
        model = AppDownload
        fields = ['id', 'app', 'app_name', 'user', 'points_earned', 'screenshot', 'downloaded_time']

    def get_app_name(self, obj):
        return obj.app.name