# Generated by Django 4.2.16 on 2024-10-24 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_alter_appdownload_screenshot'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appdownload',
            name='screenshot',
            field=models.ImageField(blank=True, null=True, upload_to='screenshots/'),
        ),
    ]
