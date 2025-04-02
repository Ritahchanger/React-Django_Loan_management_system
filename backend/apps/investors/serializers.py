from rest_framework import serializers
from .models import Investor, Investment
from apps.users.models import CustomUser

class InvestorSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    
    class Meta:
        model = Investor
        fields = ['id', 'user']  # Removed investment fields from Investor

class InvestmentSerializer(serializers.ModelSerializer):
    investor = serializers.PrimaryKeyRelatedField(queryset=Investor.objects.all())  # Fixed typo
    
    class Meta:
        model = Investment
        fields = ['id', 'investor', 'amount_invested', 'sector', 'created_at', 'status']
        read_only_fields = ['created_at', 'status']
    
    def validate_amount_invested(self, value):
        if value < 100000:
            raise serializers.ValidationError("Minimum investment is 100,000 KSH")
        return value