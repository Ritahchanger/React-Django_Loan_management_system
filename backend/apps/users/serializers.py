from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError

CustomUser = get_user_model()  # This will point to your CustomUser model

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role', 'phone_number', 'is_verified', 'investment_amount', 'first_name', 'last_name']

    def validate_investment_amount(self, value):
        # Ensure that investors must have an investment amount of at least 100,000
        if self.instance and self.instance.role == 'investor' and value and value < 100000:
            raise ValidationError("Investment amount must be at least 100,000 Ksh for investors.")
        return value

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'role', 'phone_number']

    def create(self, validated_data):
        # Hash the password automatically by using create_user() method
        user = CustomUser.objects.create_user(**validated_data)
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role', 'phone_number', 'is_verified', 'investment_amount', 'first_name', 'last_name']
        read_only_fields = ['email', 'username']  # Make these fields immutable

    def update(self, instance, validated_data):
        # Custom update logic if needed (e.g., updating investment_amount for investors)
        
        # Apply investment amount logic only for investors
        if 'investment_amount' in validated_data and instance.role == 'investor':
            if validated_data['investment_amount'] < 100000:
                raise ValidationError("Investment amount must be at least 100,000 Ksh for investors.")
            instance.investment_amount = validated_data['investment_amount']
        
        return super().update(instance, validated_data)
