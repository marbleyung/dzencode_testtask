from django.db import models
from django.contrib.auth.models import AbstractUser
from .models_services import (avatar_path,
                              normal_avatar_size,
                              username_in_ascii,
                              username_contains_letters,
                              username_length,
                              username_underscore_in_the_middle,
                              )


class CustomUser(AbstractUser):
    username = models.CharField(max_length=20, unique=True,
                                validators=[
                                    username_in_ascii,
                                    username_contains_letters,
                                    username_underscore_in_the_middle,
                                    username_length,
                                    ])
    email = models.EmailField(unique=True,)
    avatar = models.ImageField(upload_to=avatar_path, null=True,
                               validators=[normal_avatar_size])

