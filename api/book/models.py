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
    publisher = models.ForeignKey('book.Publisher', on_delete=models.CASCADE)
    author = models.ForeignKey('book.Author', on_delete=models.CASCADE)
    publish_date = models.DateField(_('published_date'), default=timezone.datetime.today())


class Publisher(models.Model):
    name = models.CharField(_('publisher_name'), max_length=50)


class Author(models.Model):
    name = models.CharField(_('author_name'), max_length=50)

