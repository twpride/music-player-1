# Generated by Django 3.0.5 on 2020-12-23 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('song_player', '0002_auto_20201215_0953'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='order',
            field=models.PositiveSmallIntegerField(default=1),
            preserve_default=False,
        ),
    ]
