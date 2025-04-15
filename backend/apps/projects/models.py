# apps/projects/models.py
from django.db import models
from apps.users.models import CustomUser

from django.db.models import Sum
class Project(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    problem = models.TextField()
    solution = models.TextField()
    goals = models.TextField()
    budget = models.DecimalField(max_digits=12, decimal_places=2)
    pitched_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="pitched_projects")
    status = models.CharField(max_length=50, choices=[('active', 'Active'), ('funded', 'Funded')], default='active')

    video_url = models.URLField(max_length=500, blank=True, null=True)

    def total_invested(self):
        return self.investments.aggregate(total=Sum('amount'))['total'] or 0

    def investors_list(self):
        return self.investments.values_list('investor__email', flat=True).distinct()
    

    def __str__(self):
        return self.title


class Investment(models.Model):
    investor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='project_investments')
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='investments')
    amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    invested_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.investor.email} - {self.project.title} - ${self.amount or 0}"