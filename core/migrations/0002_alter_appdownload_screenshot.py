# Generated by Django 4.2.16 on 2024-10-24 14:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appdownload',
            name='screenshot',
            field=models.ImageField(upload_to='screenshots/'),
        ),
    ]