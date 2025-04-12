# apps/projects/admin.py
from django.contrib import admin
from .models import Project, Investment


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "budget", "pitched_by", "status")
    list_filter = ("status", "category")
    search_fields = ("title", "pitched_by__username", "category")


@admin.register(Investment)
class InvestmentAdmin(admin.ModelAdmin):
    list_display = ("investor", "project", "amount", "invested_at")
    list_filter = ("investor", "project")
    search_fields = ("investor__email", "project__title", "amount")
