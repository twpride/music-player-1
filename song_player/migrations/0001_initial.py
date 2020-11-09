# Generated by Django 3.0.5 on 2020-11-08 23:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Playlist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('artist', models.CharField(blank=True, max_length=100)),
                ('album', models.CharField(blank=True, max_length=100)),
                ('waveform', models.FileField(upload_to='./media/songs')),
            ],
        ),
        migrations.CreateModel(
            name='Playlist_Entry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('next_entry', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='song_player.Playlist_Entry')),
                ('playlist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='song_player.Playlist')),
                ('song', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='song_player.Song')),
            ],
        ),
        migrations.AddField(
            model_name='playlist',
            name='head_entry',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='song_player.Playlist_Entry'),
        ),
        migrations.AddField(
            model_name='playlist',
            name='songs',
            field=models.ManyToManyField(through='song_player.Playlist_Entry', to='song_player.Song'),
        ),
        migrations.AddField(
            model_name='playlist',
            name='tail_entry',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='song_player.Playlist_Entry'),
        ),
    ]
