from rest_framework import serializers
from .models import LoanApplication

from apps.users.models import CustomUser

from django.utils import timezone

# Serializer for the LoanApplication model
class LoanApplicationSerializer(serializers.ModelSerializer):
    # You can represent the loan officer and user more clearly if needed, for example, using their names or other fields
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    
    loan_officer = serializers.SlugRelatedField(slug_field='username', queryset=CustomUser.objects.all(), required=False)
    class Meta:
        model = LoanApplication
        fields = '__all__'  # This will include all fields in the model

    # You can add custom validation or field-level validation here if needed
    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than zero.")
        return value

    def validate_duration_months(self, value):
        if value <= 0:
            raise serializers.ValidationError("Duration must be a positive number of months.")
        return value
    

   

    # Optional: Add logic to calculate or adjust the `approved_at` field based on status
    def validate(self, data):
        if data.get('status') == 'approved' and not data.get('approved_at'):
            data['approved_at'] = timezone.now()
        return data
