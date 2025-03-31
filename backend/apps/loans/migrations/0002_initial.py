# Generated by Django 5.1.7 on 2025-03-31 20:36

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('loans', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='loan',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='loan',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='loans.loancategory'),
        ),
    ]
