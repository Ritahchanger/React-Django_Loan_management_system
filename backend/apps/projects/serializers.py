from rest_framework import serializers
from .models import Project
from django.contrib.auth import get_user_model


from rest_framework.exceptions import ValidationError

CustomUser = get_user_model()

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'category', 'problem', 'solution', 'goals', 'budget', 'pitched_by', 'status']
        read_only_fields = ['pitched_by', 'status']

class ProjectInvestmentSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=12, decimal_places=2)

    def validate_amount(self, value):
        if value <= 0:
            raise ValidationError("Investment amount must be greater than 0.")
        return value
