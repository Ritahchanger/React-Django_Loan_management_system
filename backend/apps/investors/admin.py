from django.contrib import admin
from .models import Investor, Investment

@admin.register(Investor)
class InvestorAdmin(admin.ModelAdmin):
    list_display = ('user', 'sector', 'amount_deposited', 'is_eligible')
    list_filter = ('sector',)
    search_fields = ('user__username', 'sector')
    readonly_fields = ('is_eligible',)

    def is_eligible(self, obj):
        return obj.is_eligible()
    is_eligible.boolean = True  # Display as a boolean checkmark in admin panel


@admin.register(Investment)
class InvestmentAdmin(admin.ModelAdmin):
    list_display = ('investor', 'amount_invested', 'sector', 'status', 'created_at')
    list_filter = ('sector', 'status')
    search_fields = ('investor__user__username', 'sector')
    readonly_fields = ('created_at',)
