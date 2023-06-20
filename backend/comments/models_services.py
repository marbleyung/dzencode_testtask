from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
import os


def comment_file_path(instance, *args, **kwargs):
    return '/'.join(['comment', str(instance.owner), str(args[0])])


def normal_item_image_size(file):
    MAX_SIZE = 1 * 1024 * 1024

    if file.size > MAX_SIZE:
        raise ValidationError(
            _("File size can't be larger than 1mb"),
            params={"Error": 'Error'},)


def normal_image_format(file):
    ALLOWED_IMAGE_EXTENSIONS = ('jpg', 'gif', 'png',)
    extension = str(file).split('.')[-1]
    if extension not in ALLOWED_IMAGE_EXTENSIONS:
        raise ValidationError(
            _("Image should have one of .jpg, .gif, .png extension"),
            params={"Error": 'Error'},)


def normal_textfile_format(file):
    ALLOWED_TEXT_EXTENSIONS = ('txt',)
    extension = str(file).split('.')[-1]
    if extension not in ALLOWED_TEXT_EXTENSIONS:
        raise ValidationError(
            _("Textfile should have .txt extension"),
            params={"Error": 'Error'},)


def normal_textfile_size(file):
    MAX_SIZE = 1 * 1024 * (1024 / 10)

    if file.size > MAX_SIZE:
        raise ValidationError(
            _("File size can't be larger than 100kb"),
            params={"Error": 'Error'},)


def normal_width_and_height(file):
    MAX_WIDTH = 320
    MAX_HEIGHT = 240

    props = file.__dict__
    width, height = props['image'].size

    if any([int(width) > MAX_WIDTH,
           int(height) > MAX_HEIGHT]):
        raise ValidationError(
            _("JavaScript didn't work"),
            params={"Error": 'Error'},)


def delete_file_from_static(path):
    path = path.split('/')[2:]
    path = '/'.join(path)
    try:
        os.remove(f'/backend/mediafiles/{path}')
    except Exception as e:
        print(e)
    return True
