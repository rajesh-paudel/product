from django.urls import path
from .views import CategoryListView, ProductListView, ProductDetailView, InquiryCreateView,ProductCreateView,ProductDeleteView,ProductUpdateView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='categories-list'),
    path('products/', ProductListView.as_view(), name='products-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('products/add/', ProductCreateView.as_view(), name='product-create'), 
    path('inquiries/', InquiryCreateView.as_view(), name='inquiry-create'),
    path('products/<int:pk>/delete/', ProductDeleteView.as_view(), name='product-delete'),
     path('products/<int:id>/update/', ProductUpdateView.as_view(), name='product-update'),
]
