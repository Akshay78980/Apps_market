from django.contrib import admin

# Register your models here.

from .models import App, AppDownload


admin.site.register([App, AppDownload])
