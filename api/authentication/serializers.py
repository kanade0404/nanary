from users.models import User
from rest_framework import serializers


# 認証シリアライザー
class AuthSerializer(serializers.ModelSerializer):
    # 認証プロバイダー名
    provider = serializers.CharField()

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'provider')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['email'], validated_data['password'],
            validated_data['username'], validated_data['provider'])
        return user
