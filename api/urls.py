from django.urls import path
from expense.views import get_transactions

urlpatterns = [
    path('get-Transactions/', get_transactions),
]
