# Generated by Django 3.0.5 on 2020-11-09 05:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('song_player', '0002_auto_20201109_0321'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Playlist_Entry',
            new_name='Entry',
        ),
    ]
