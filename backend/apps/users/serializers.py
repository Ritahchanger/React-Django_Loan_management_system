from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError

CustomUser = get_user_model()  # This will point to your CustomUser model


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "email",
            "role",
            "phone_number",
            "is_verified",
            "investment_amount",
            "first_name",
            "last_name",
            "investment_amount",
        ]

    def validate_investment_amount(self, value):
        # Ensure that investors must have an investment amount of at least 100,000
        if (
            self.instance
            and self.instance.role == "investor"
            and value
            and value < 100000
        ):
            raise ValidationError(
                "Investment amount must be at least 100,000 Ksh for investors."
            )
        return value


class RegisterUserSerializer(serializers.ModelSerializer):
    investment_amount = serializers.DecimalField(
        max_digits=12, decimal_places=2, required=False
    )

    class Meta:
        model = CustomUser
        fields = [
            "username",
            "email",
            "password",
            "role",
            "phone_number",
            "investment_amount",
        ]

    def validate(self, data):
        role = data.get("role")
        investment_amount = data.get("investment_amount")

        if role == "investor":
            if investment_amount is None:
                raise ValidationError("Investment amount is required for investors.")
            elif investment_amount < 100000:
                raise ValidationError(
                    "Investment amount must be at least 100,000 Ksh for investors."
                )
        return data

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "email",
            "role",
            "phone_number",
            "is_verified",
            "investment_amount",
            "first_name",
            "last_name",
        ]
        read_only_fields = ["email", "username"]  # Make these fields immutable

    def update(self, instance, validated_data):
        # Custom update logic if needed (e.g., updating investment_amount for investors)

        # Apply investment amount logic only for investors
        if "investment_amount" in validated_data and instance.role == "investor":
            if validated_data["investment_amount"] < 100000:
                raise ValidationError(
                    "Investment amount must be at least 100,000 Ksh for investors."
                )
            instance.investment_amount = validated_data["investment_amount"]

        return super().update(instance, validated_data)
