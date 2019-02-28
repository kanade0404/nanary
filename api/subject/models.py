from django.db import models
from django.utils.translation import ugettext_lazy as _
from category.models import Category


class Subject(models.Model):
    """

    """
    id = models.IntegerField(_('id'), unique=True, primary_key=True)
    name = models.CharField(_('subject_name'), unique=True, max_length=50)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


class SubjectTag(models.Model):
    name = models.CharField(_('subject_tag_name'), max_length=50)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
