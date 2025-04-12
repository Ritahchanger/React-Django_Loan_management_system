from rest_framework import serializers
from .models import Project,Investment
from django.contrib.auth import get_user_model


from rest_framework.exceptions import ValidationError

CustomUser = get_user_model()

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'category', 'problem', 'solution', 'goals', 'budget', 'pitched_by', 'status']
        read_only_fields = ['pitched_by', 'status']



class InvestmentSerializer(serializers.ModelSerializer):

    class Meta:

        model = Investment

        fields = ['id', 'project', 'amount', 'investor', 'invested_at']
        read_only_fields = ['investor', 'invested_at']

        def validate_amount(self,value):

            if value is not None and value <= 0:

                raise ValidationError("Investment amount must be greater than 0.")
            
            return value
