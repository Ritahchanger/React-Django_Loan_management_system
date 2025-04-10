from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'budget', 'pitched_by', 'status')
    list_filter = ('status', 'category')
    search_fields = ('title', 'pitched_by__username', 'category')
