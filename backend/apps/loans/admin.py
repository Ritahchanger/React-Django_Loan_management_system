from django.contrib import admin
from .models import LoanCategory, Loan

@admin.register(LoanCategory)
class LoanCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Loan)
class LoanAdmin(admin.ModelAdmin):
    list_display = ('user', 'category', 'subcategory', 'amount_requested', 'interest_rate', 'repayment_period', 'status', 'created_at')
    list_filter = ('status', 'category', 'subcategory')
    search_fields = ('user__username', 'category__name', 'subcategory')
    readonly_fields = ('created_at',)
