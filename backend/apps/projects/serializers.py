from rest_framework import serializers
from .models import Project, Investment
from django.contrib.auth import get_user_model

import pytz

from rest_framework.exceptions import ValidationError

CustomUser = get_user_model()


class ProjectSerializer(serializers.ModelSerializer):
    total_invested = serializers.DecimalField(
        read_only=True, max_digits=12, decimal_places=2
    )
    investors_list = serializers.ListField(read_only=True)
    pitched_by_username = serializers.CharField(
        source="pitched_by.username", read_only=True
    )

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "category",
            "problem",
            "solution",
            "goals",
            "budget",
            "video_url",
            "pitched_by",
            "pitched_by_username",
            "status",
            "total_invested",
            "investors_list",
        ]
        read_only_fields = ["pitched_by", "status"]


class InvestmentSerializer(serializers.ModelSerializer):
    project_name = serializers.CharField(source="project.title", read_only=True)
    video_url = serializers.CharField(source="project.video_url", read_only=True)
    pitched_by = serializers.CharField(
        source="project.pitched_by.username", read_only=True
    )

    class Meta:
        model = Investment
        fields = [
            "id",
            "project",
            "project_name",
            "video_url",  # <-- ✅ Include this!
            "pitched_by",
            "amount",
            "investor",
            "invested_at",
        ]
        read_only_fields = ["investor", "invested_at"]

    def get_invested_at(self, obj):
        if obj.invested_at:
            nairobi_tz = pytz.timezone("Africa/Nairobi")
            return obj.invested_at.astimezone(nairobi_tz).strftime(
                "%Y-%m-%d %I:%M:%S %p"
            )
        return None

    def validate_amount(self, value):
        if value is not None and value <= 0:
            raise ValidationError("Investment amount must be greater than 0.")
        return value
