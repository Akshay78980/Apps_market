from django.db import models

from users.models import CustomUser

# Create your models here.

class App(models.Model):
    name = models.CharField(max_length=255)
    app_file = models.FileField(upload_to='app_files/')
    points = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='app_images/')
    

    def __str__(self):
        return self.name
    


class AppDownload(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    app = models.ForeignKey(App, on_delete=models.CASCADE)
    points_earned = models.IntegerField(default=0) 
    screenshot = models.ImageField(upload_to='screenshots/', null=True, blank=True)
    downloaded_time = models.DateTimeField(auto_now_add=True)

    # class Meta:
    #     unique_together = ('user', 'app')

    def __str__(self):
        return f"{self.user.username} - {self.app.name}"