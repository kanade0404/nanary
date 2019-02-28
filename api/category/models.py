from django.db import models
from django.utils.translation import ugettext_lazy as _


class Category(models.Model):
    """
    カテゴリーモデル
    大分類を扱うモデル
    (ex: 工学、物理学、経済学、etc...)
    """
    id = models.IntegerField(_('id'), unique=True, primary_key=True)
    name = models.CharField(_('category_name'), max_length=50, unique=True)


class CategoryTag(models.Model):
    """
    カテゴリータグモデル
    カテゴリーモデルに紐付けるタグ
    """
    name = models.CharField(_('category_tag_name'), max_length=50)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
