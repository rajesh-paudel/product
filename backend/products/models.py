from django.db import models 

class Category(models.Model):
    name = models.CharField(max_length=100)  
    parent = models.ForeignKey(
        'self',               
        null=True,          
        blank=True,          
        on_delete=models.CASCADE,  
        related_name='subcategories'  
    )

    def __str__(self):
        return self.name  
    
class Product(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,   
        related_name='products'    
    )
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2) 
    availability = models.BooleanField(default=True)             
    meta_title = models.CharField(max_length=150, blank=True)
    meta_description = models.TextField(blank=True)
    description = models.TextField()  
    image = models.ImageField(upload_to='products/', blank=True)  

    def __str__(self):
        return self.name    


class Inquiry(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return f"Inquiry by {self.name} for {self.product.name}"