from django.db import models
from django.utils import timezone
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.validators import ASCIIUsernameValidator
from django.utils.translation import ugettext_lazy as _
import logging

logger = logging.getLogger(__name__)


class UserManager(BaseUserManager):
    """
    ユーザーマネージャー
    """
    user_in_migrations = True

    def _create_user(self, email, password, username, **kwargs):
        if not email or email == '':
            raise ValueError('メールアドレスは必須です')
        if not password or password == '':
            raise ValueError('パスワードは必須です')
        if not username or username == '':
            raise ValueError('ユーザー名は必須です')
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            is_active=False,
            date_joined=timezone.now()
        )
        user.set_password(password)
        try:
            user.save(using=self._db)
        except Exception:
            logger.error('users save error')
        return user

    def create_user(self, email, password, username, **kwargs):
        return self._create_user(email, password, username)

    def create_superuser(self, username, email, password, **kwargs):
        user = self.create_user(email, password, username)
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    """
    ユーザーモデル
    """
    # Emailアドレス
    email = models.EmailField(_('email'), unique=True)
    username_validator = ASCIIUsernameValidator()
    # ユーザー名
    username = models.CharField(
        _('username'),
        max_length=50,
        validators=[username_validator],
        unique=True
    )
    # プロフィール
    profile = models.CharField(_('profile'), blank=True, max_length=400)
    # アイコン画像
    icon_image = models.URLField(blank=True)
    is_staff = models.BooleanField(
        _('is_staff'),
        default=False
    )
    is_active = models.BooleanField(
        _('is_active'),
        default=True
    )
    is_admin = models.BooleanField(
        _('is_admin'),
        default=False
    )
    is_superuser = models.BooleanField(
        _('is_superuser'),
        default=False
    )
    date_joined = models.DateTimeField(_('date_joined'), default=timezone.now)

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email']

    objects = UserManager()

    class Meta:
        db_table = 'users'
        swappable = 'AUTH_USER_MODEL'
