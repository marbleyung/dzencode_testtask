import string

from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


def avatar_path(instance, *args, **kwargs):
    return '/'.join(['avatar', str(instance.username)])


def normal_avatar_size(file):
    MAX_SIZE = 1 * 1024 * 1024
    if file.size > MAX_SIZE:
        raise ValidationError(
            _("File size can't be larger than 1mb"),
            params={"Error": 'Error'},)


def password_length(instance):
    if 8 > len(instance) or 20 < len(instance):
        raise ValidationError(
            _("Password should contain 8-20 symbols"))



def username_in_ascii(instance):
    allowed_symbols = string.ascii_letters + string.digits + '_'
    for i in instance:
        if i not in allowed_symbols:
            raise ValidationError(
                _("You should use only ASCII letters, digits or '_' for username symbols"))


def username_underscore_in_the_middle(instance):
    if instance.startswith('_') or instance.endswith('_'):
        raise ValidationError(
            _("Your username can't start/end with '_'"))


def username_contains_letters(instance):
    if instance.isdigit():
        raise ValidationError(
            _("Your username should contain letters"))


def username_length(instance):
    if 5 > len(instance) or 20 < len(instance):
        raise ValidationError(
            _("Username should contain 5-20 symbols"))
