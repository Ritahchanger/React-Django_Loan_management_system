from rest_framework import serializers
from .models import Loan
from apps.users.models import CustomUser

class LoanApplicationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    
    class Meta:
        model = Loan
        fields = ['id', 'user', 'loan_type', 'loan_category', 'amount', 'status', 'approved_amount', 'created_at', 'updated_at']

    def create(self, validated_data):
        return Loan.objects.create(**validated_data)

class LoanCategorySerializer(serializers.Serializer):
    category_name = serializers.CharField(max_length=255)
    description = serializers.CharField()

class LoanCalculatorSerializer(serializers.Serializer):
    loan_amount = serializers.FloatField()
    interest_rate = serializers.FloatField()
    duration_months = serializers.IntegerField()
    
    def calculate_total_payment(self):
        loan_amount = self.validated_data.get('loan_amount')
        interest_rate = self.validated_data.get('interest_rate')
        duration_months = self.validated_data.get('duration_months')
        
        total_payment = loan_amount + (loan_amount * interest_rate / 100 * duration_months)
        return total_payment
