from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Transactions
from .serializers import TransactionsSerializer

# GET all transactions
@api_view(['GET'])
def get_transactions(request):
    queryset = Transactions.objects.all()
    serializer = TransactionsSerializer(queryset, many=True)
    return Response(serializer.data)

# CREATE a transaction
@api_view(['POST'])
def create_transaction(request):
    serializer = TransactionsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# UPDATE a transaction
@api_view(['PUT'])
def update_transaction(request, pk):
    try:
        transaction = Transactions.objects.get(id=pk)
    except Transactions.DoesNotExist:
        return Response({"error": "Transaction not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = TransactionsSerializer(transaction, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# DELETE a transaction
@api_view(['DELETE'])
def delete_transaction(request, pk):
    try:
        transaction = Transactions.objects.get(id=pk)
        transaction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Transactions.DoesNotExist:
        return Response({"error": "Transaction not found"}, status=status.HTTP_404_NOT_FOUND)
