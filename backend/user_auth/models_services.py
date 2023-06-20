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


def username_in_ascii(instance):
    allowed_symbols = string.ascii_letters + string.digits + '_'
    for i in instance:
        if i not in allowed_symbols:
            raise ValidationError(
                _("You should use only ASCII letters, digits or '_' for username symbols"))
