from rest_framework import serializers
from .models import Book, Publisher, Author


class BookManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('title', 'isbn', 'cover', 'volume', 'publisher', 'author', 'publish_date')

