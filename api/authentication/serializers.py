from users.models import User
from rest_framework import serializers


class AuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['password'], validated_data['email'])
        return user
