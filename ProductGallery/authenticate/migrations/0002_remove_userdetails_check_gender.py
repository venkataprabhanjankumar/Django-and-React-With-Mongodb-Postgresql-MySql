# Generated by Django 3.2.2 on 2021-07-13 15:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authenticate', '0001_initial'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='userdetails',
            name='Check_Gender',
        ),
    ]
