from django.contrib import admin
from .models import LoanApplication

class LoanApplicationAdmin(admin.ModelAdmin):
    list_display = ('user', 'category', 'amount', 'duration_months', 'status', 'created_at', 'approved_at')  # Removed 'loan_officer'
    list_filter = ('status', 'category')  # Removed 'loan_officer' from list_filter
    search_fields = ('user__username', 'category', 'amount')
    readonly_fields = ('created_at', 'approved_at')
    
    # Customizing the form display (if you want)
    fieldsets = (
        (None, {
            'fields': ('user', 'category', 'amount', 'duration_months', 'reason', 'status')  # Removed 'loan_officer'
        }),
        ('Timestamps', {
            'fields': ('created_at', 'approved_at'),
            'classes': ('collapse',),
        }),
    )

# Register the LoanApplication model with the custom admin interface
admin.site.register(LoanApplication, LoanApplicationAdmin)
