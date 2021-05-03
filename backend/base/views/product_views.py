from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from base.models import Product
from base.serializers import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    '''
    Notes: Python stores the default user object ids as id. so that's what we must use.
    Since we actually defined our order,product, etc. and created an _id for our use, we use _id in that case.
    Notice that user id is removed from the user object once it is deleted. Everything else in the user seems to be intact...
    '''
    productForDeletion = Product.objects.get(id=pk)
    productForDeletion_id = productForDeletion.id
    productForDeletion.delete()
    return Response(f'User {productForDeletion.name} with id: {productForDeletion_id} was deleted')
