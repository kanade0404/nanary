from rest_framework import serializers
from .models import Book, Publisher, Author
from .openbd import OpenBD


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        models = Book
        fields = ('title', 'isbn', 'cover', 'volume', 'publisher', 'author', 'publish_date')

    def get(self, isbn: str):
        data = OpenBD().get_json(isbn)
