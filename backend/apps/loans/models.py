from django.db import models
from apps.users.models import CustomUser

class LoanCategory(models.Model):
    MAIN_CATEGORY_CHOICES = [
        ('business', 'Business'),
        ('personal', 'Personal'),
        ('asset', 'Asset Financing')
    ]
    name = models.CharField(max_length=100)
    main_category = models.CharField(max_length=20, choices=MAIN_CATEGORY_CHOICES, default='business')

    def __str__(self):
        return f"{self.main_category} - {self.name}"


class LoanApplication(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('denied', 'Denied')
    ]
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    category = models.ForeignKey(LoanCategory, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    duration_months = models.IntegerField()
    reason = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    approved_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class StartupPitch(models.Model):
    CATEGORY_CHOICES = [
        ('health', 'Health'),
        ('tech', 'Tech'),
        ('agriculture', 'Agriculture'),
        ('education', 'Education'),
        ('fintech', 'Fintech')
    ]
    founder = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    title = models.CharField(max_length=255)
    pitch_description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Investment(models.Model):
    investor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='investments')
    project = models.ForeignKey(StartupPitch, on_delete=models.CASCADE, related_name='investments')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    invested_at = models.DateTimeField(auto_now_add=True)
