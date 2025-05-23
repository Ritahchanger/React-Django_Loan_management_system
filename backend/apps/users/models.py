# apps/users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

from django.core.exceptions import ValidationError

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ("borrower", "Borrower"),
        ("investor", "Investor"),
        ("admin", "Admin"),
    ]

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, null=False)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    investment_amount = models.DecimalField(
        max_digits=12, decimal_places=2, null=True, blank=True
    )

    REQUIRED_FIELDS = ["email", "role"]

    def is_investor_eligible(self):
        return (
            self.role == "investor"
            and self.investment_amount
            and self.investment_amount >= 100000
        )

    def clean(self):
        super().clean()
        if self.role == "investor" and not self.investment_amount:
            raise ValidationError("Investment amount is required for investors.")

    def __str__(self):
        return self.username