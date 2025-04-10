from django.contrib import admin
from .models import LoanCategory, LoanApplication, StartupPitch, Investment

@admin.register(LoanCategory)
class LoanCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'main_category')
    list_filter = ('main_category',)
    search_fields = ('name',)

@admin.register(LoanApplication)
class LoanApplicationAdmin(admin.ModelAdmin):
    list_display = ('user', 'category', 'amount', 'status', 'created_at')
    list_filter = ('status', 'category', 'created_at')
    search_fields = ('user__username', 'reason')

@admin.register(StartupPitch)
class StartupPitchAdmin(admin.ModelAdmin):
    list_display = ('founder', 'title', 'category', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('founder__username', 'title', 'pitch_description')

@admin.register(Investment)
class InvestmentAdmin(admin.ModelAdmin):
    list_display = ('investor', 'project', 'amount', 'invested_at')
    list_filter = ('invested_at',)
    search_fields = ('investor__username', 'project__title')
