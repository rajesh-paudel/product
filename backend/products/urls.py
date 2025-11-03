from django.urls import path
from .views import CategoryListView, ProductListView, ProductDetailView, InquiryCreateView,ProductCreateView,ProductDeleteView,ProductUpdateView,CategoryCreateView,CategoryDeleteView,CategoryUpdateView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='categories-list'),
    path('categories/add/', CategoryCreateView.as_view(), name='category-create'),
    path('categories/<int:id>/update/', CategoryUpdateView.as_view(), name='category-update'),
    path('categories/<int:id>/delete/', CategoryDeleteView.as_view(), name='category-delete'),
    path('products/', ProductListView.as_view(), name='products-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('products/add/', ProductCreateView.as_view(), name='product-create'), 
    path('inquiries/', InquiryCreateView.as_view(), name='inquiry-create'),
    path('products/<int:pk>/delete/', ProductDeleteView.as_view(), name='product-delete'),
    path('products/<int:id>/update/', ProductUpdateView.as_view(), name='product-update'),
]
