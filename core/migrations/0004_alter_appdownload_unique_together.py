# Generated by Django 4.2.16 on 2024-11-03 09:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_appdownload_screenshot'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='appdownload',
            unique_together=set(),
        ),
    ]