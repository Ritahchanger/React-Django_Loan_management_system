from django.db import models
from django.conf import settings

class LoanCategory(models.Model):
    CATEGORY_CHOICES = [
        ('Business', 'Business'),
        ('Personal', 'Personal'),
        ('Asset Financing', 'Asset Financing')
    ]
    name = models.CharField(max_length=50, choices=CATEGORY_CHOICES, unique=True)

    def __str__(self):
        return self.name

class Loan(models.Model):
    LOAN_SUBCATEGORIES = [
        ('Startup Pitch', 'Startup Pitch'),
        ('Business Growth', 'Business Growth'),
        ('Education', 'Education'),
        ('Emergency', 'Emergency'),
        ('Car Logbook Loan', 'Car Logbook Loan'),
        ('Nunua/Jenga', 'Nunua/Jenga'),
        ('Land Financing', 'Land Financing')
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.ForeignKey(LoanCategory, on_delete=models.CASCADE)
    subcategory = models.CharField(max_length=50, choices=LOAN_SUBCATEGORIES)
    amount_requested = models.DecimalField(max_digits=12, decimal_places=2)
    interest_rate = models.FloatField(default=12.5)
    repayment_period = models.IntegerField(help_text="Repayment period in months")
    status = models.CharField(
        max_length=20,
        choices=[('Approved', 'Approved'), ('Denied', 'Denied'), ('Pending', 'Pending')],
        default='Pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def calculate_total_repayment(self):
        """Loan calculator function: calculates total repayment"""
        total_interest = (self.amount_requested * (self.interest_rate / 100)) * self.repayment_period
        return self.amount_requested + total_interest

    def __str__(self):
        return f"{self.user.username} - {self.category} - {self.status}"
