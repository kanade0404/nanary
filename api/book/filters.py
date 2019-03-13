from django_filters import rest_framework as filters
from .models import Book


class BookManageFilter(filters.FilterSet):
    isbn = filters.CharFilter(field_name='isbn')

    class Meta:
        model = Book
        fields = ['isbn']
