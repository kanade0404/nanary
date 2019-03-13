from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone


class Book(models.Model):
    title = models.CharField(_('book_title'), max_length=200)
    """
    ISBN
    10桁と13桁がある
    """
    isbn = models.CharField(_('isbn'), unique=True, max_length=13)
    cover = models.CharField(_('cover'), blank=True, max_length=50)
    volume = models.CharField(_('volume'), blank=True, max_length=50)
    """
    出版元
    """
    publisher = models.ForeignKey('book.Publisher', on_delete=models.CASCADE)
    """
    著者
    """
    author = models.ForeignKey('book.Author', on_delete=models.CASCADE)
    """
    出版日
    """
    publish_date = models.DateField(_('published_date'), default=timezone.now)

    class Meta:
        db_table = 'books'


class SeriesBook(models.Model):
    book = models.ForeignKey('book.Book', on_delete=models.CASCADE)
    series = models.ForeignKey('book.Series', on_delete=models.CASCADE)

    class Meta:
        db_table = 'series_book'


class Series(models.Model):
    name = models.CharField(_('series_name'), max_length=100)

    class Meta:
        db_table = 'series'


class Publisher(models.Model):
    name = models.CharField(_('publisher_name'), max_length=100)

    class Meta:
        db_table = 'publishers'


class Author(models.Model):
    name = models.CharField(_('author_name'), max_length=100)

    class Meta:
        db_table = 'authors'

