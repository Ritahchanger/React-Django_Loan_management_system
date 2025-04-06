from rest_framework import serializers
from .models import Investor, Investment
from django.contrib.auth import get_user_model

class InvestorSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=get_user_model().objects.all())  # Allow user to be referenced by ID
    sector = serializers.ChoiceField(choices=Investor.SECTOR_CHOICES)
    amount_deposited = serializers.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        model = Investor
        fields = ['id', 'user', 'sector', 'amount_deposited']

    def validate_amount_deposited(self, value):
        """Validate that the deposited amount meets the minimum requirement."""
        if value < 100000:
            raise serializers.ValidationError("Investor must deposit at least 100,000.")
        return value


class InvestmentSerializer(serializers.ModelSerializer):
    investor = serializers.PrimaryKeyRelatedField(queryset=Investor.objects.all())
    amount_invested = serializers.DecimalField(max_digits=12, decimal_places=2)
    sector = serializers.ChoiceField(choices=Investor.SECTOR_CHOICES)
    status = serializers.ChoiceField(choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Denied', 'Denied')])

    class Meta:
        model = Investment
        fields = ['id', 'investor', 'amount_invested', 'sector', 'status', 'created_at']

    def validate(self, data):
        """Custom validation for investment amount."""
        investor = data.get('investor')
        if investor.amount_deposited < 100000:
            raise serializers.ValidationError("Investor does not meet the minimum deposit requirement.")
        return data
