# Generated by Django 2.1.6 on 2019-03-03 06:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False, unique=True, verbose_name='id')),
                ('name', models.CharField(max_length=50, unique=True, verbose_name='category_name')),
            ],
        ),
        migrations.CreateModel(
            name='CategoryTag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='category_tag_name')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='category.Category')),
            ],
        ),
    ]
