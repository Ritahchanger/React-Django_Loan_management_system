from django.contrib import admin
from django.db.models import F
from django.utils import timezone
from .models import LoanApplication

class LoanApplicationAdmin(admin.ModelAdmin):
    list_display = ('user', 'category', 'amount', 'duration_months', 'status', 'created_at', 'approved_at')
    list_filter = ('status', 'category')
    search_fields = ('user__username', 'category', 'amount')
    readonly_fields = ('created_at', 'approved_at')

    fieldsets = (
        (None, {
            'fields': ('user', 'category', 'amount', 'duration_months', 'reason', 'status')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'approved_at'),
            'classes': ('collapse',),
        }),
    )

    actions = ['approve_loans']

    @admin.action(description="Approve selected loans")
    def approve_loans(self, request, queryset):
        updated_count = queryset.filter(status='pending').update(
            status='approved',
            approved_at=timezone.now()
        )
        self.message_user(request, f"{updated_count} loan(s) approved successfully.")

admin.site.register(LoanApplication, LoanApplicationAdmin)
