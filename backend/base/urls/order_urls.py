from base.views import order_views as views
from django.urls import path

# Notes:
# URLs are matched to in the order they appear.
# Placing add or myorders under the dynamic value urls could lead to issues of matching "myorders" or "add" as pk
urlpatterns = [
    path('add/', views.addOrderItems, name='order-add'),
    path('myorders/', views.getMyOrders, name='myorders'),

    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay')
]
