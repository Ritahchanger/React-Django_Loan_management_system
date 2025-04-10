# apps/projects/models.py
from django.db import models
from apps.users.models import CustomUser

class Project(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    problem = models.TextField()
    solution = models.TextField()
    goals = models.TextField()
    budget = models.DecimalField(max_digits=12, decimal_places=2)
    pitched_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="pitched_projects")
    status = models.CharField(max_length=50, choices=[('active', 'Active'), ('funded', 'Funded')], default='active')

    def __str__(self):
        return self.title
