from django.db import models
from django.conf import settings

class Investor(models.Model):
    SECTOR_CHOICES = [
        ('Health', 'Health'),
        ('Tech', 'Tech'),
        ('Agriculture', 'Agriculture'),
        ('Education', 'Education'),
        ('Fintech', 'Fintech')
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    sector = models.CharField(max_length=50, choices=SECTOR_CHOICES)
    amount_deposited = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    def __str__(self):
        return f"Investor: {self.user.username} - {self.sector}"

    def is_eligible(self):
        """Check if the investor meets the minimum deposit requirement."""
        return self.amount_deposited >= 100000
