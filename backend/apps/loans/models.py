from django.db import models

# Enum for loan categories
class LoanCategoryEnum(models.TextChoices):
    BUSINESS = "business", "Business"
    PERSONAL = "personal", "Personal"
    ASSET = "asset", "Asset Financing"

class LoanApplication(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("denied", "Denied"),
    ]
    
    # Reference to the user receiving the loan

    user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE,related_name="loan_applications")
    
    category = models.CharField(
        max_length=20, 
        choices=LoanCategoryEnum.choices, 
        default=LoanCategoryEnum.BUSINESS
    )
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    duration_months = models.IntegerField()
    reason = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    approved_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    repayment_schedule = models.JSONField(blank=True, null=True)  # Stores repayment details

    def __str__(self):
        return f"Loan Application by {self.user} - {self.status}"
