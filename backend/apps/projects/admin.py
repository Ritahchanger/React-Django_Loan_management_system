from django.contrib import admin
from .models import Project, Investment

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "budget", "pitched_by", "status", "total_invested_display","video_url")
    list_filter = ("status", "category")
    search_fields = ("title", "pitched_by__username", "category")

    
    fields = (
        "title",
        "category",
        "problem",
        "solution",
        "goals",
        "budget",
        "video_url",  
        "pitched_by",
        "status",
    )

    def total_invested_display(self, obj):
        return obj.total_invested()
    total_invested_display.short_description = "Total Invested"


@admin.register(Investment)
class InvestmentAdmin(admin.ModelAdmin):
    list_display = ("investor", "project", "amount", "invested_at")
    list_filter = ("investor", "project")
    search_fields = ("investor__email", "project__title", "amount")
