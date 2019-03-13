# Generated by Django 2.1.6 on 2019-03-03 06:37

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='author_name')),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='book_title')),
                ('isbn', models.CharField(max_length=13, unique=True, verbose_name='isbn')),
                ('cover', models.CharField(blank=True, max_length=50, verbose_name='cover')),
                ('volume', models.CharField(blank=True, max_length=50, verbose_name='volume')),
                ('publish_date', models.DateField(default=datetime.datetime(2019, 3, 3, 6, 37, 4, 801326), verbose_name='published_date')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='book.Author')),
            ],
        ),
        migrations.CreateModel(
            name='Publisher',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='publisher_name')),
            ],
        ),
        migrations.AddField(
            model_name='book',
            name='publisher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='book.Publisher'),
        ),
    ]
