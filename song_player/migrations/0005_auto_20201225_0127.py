# Generated by Django 3.0.5 on 2020-12-25 01:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('song_player', '0004_song_yt_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='yt_id',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]