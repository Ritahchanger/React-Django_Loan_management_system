from rest_framework import serializers
from .models import Investor, Investment
from apps.users.models import CustomUser

class InvestorSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

    class Meta:
        model = Investor
        fields = ['id', 'user', 'investment_amount', 'sector']

class InvestmentSerializer(serializers.ModelSerializer):
    investor = serializers.PrimaryKeyRelatedField(queryset=Investor.objects.all())

    class Meta:
        model = Investment
        fields = ['id', 'investor', 'amount_invested', 'sector', 'created_at', 'status']

    def create(self, validated_data):
        return Investment.objects.create(**validated_data)
