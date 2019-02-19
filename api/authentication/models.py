from django.db import models
from django.utils.translation import ugettext_lazy as _


class Provider(models.Model):
    id = models.IntegerField(_('id'), unique=True, primary_key=True)
    provider_name = models.CharField(_('provider_name'), unique=True, max_length=20)
