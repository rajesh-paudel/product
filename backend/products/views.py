from rest_framework import generics
from .models import Category, Product, Inquiry
from .serializers import CategorySerializer, ProductSerializer, InquirySerializer

# List all categories (with subcategories & products)
class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(parent=None)  # only main categories
    serializer_class = CategorySerializer

# List all products
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# Product detail
class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# Create inquiry
class InquiryCreateView(generics.CreateAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer

#Create product
class ProductCreateView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDeleteView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer 

class ProductUpdateView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'    