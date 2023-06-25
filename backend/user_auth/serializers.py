from rest_framework import serializers
from django.contrib.auth import get_user_model
from models_services import password_length

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        password = validated_data['password']
        password_length(password)
        user = UserModel.objects.create_user(
            username=validated_data['username'].lower(),
            email=validated_data['email'].lower(),
            password=password,
        )

        return user

    class Meta:
        model = UserModel
        fields = ("id", "username", 'email', "password")
