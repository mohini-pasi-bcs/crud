from django.urls import path
from . import views

urlpatterns = [
    path('transactions/', views.get_transactions, name='get-transactions'),
    path('transactions/create/', views.create_transaction, name='create-transaction'),
    path('transactions/update/<int:pk>/', views.update_transaction, name='update-transaction'),
    path('transactions/delete/<int:pk>/', views.delete_transaction, name='delete-transaction'),
]
