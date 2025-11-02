from rest_framework import serializers
from .models import Category, Product, Inquiry

# Serializer for Product
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'availability','category', 'meta_title', 'meta_description', 'description', 'image']

# Serializer for Category
class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField()
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'subcategories', 'products']

    def get_subcategories(self, obj):
        qs = obj.subcategories.all()
        return CategorySerializer(qs, many=True, context=self.context).data

# Serializer for Inquiry
class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ['id', 'name', 'email', 'product', 'message', 'created_at']
