# Generated by Django 2.1.6 on 2019-02-19 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Provider',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False, unique=True, verbose_name='id')),
                ('provider_name', models.CharField(max_length=20, unique=True, verbose_name='provider_name')),
            ],
        ),
    ]
