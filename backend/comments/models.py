from django.contrib.auth import get_user_model
from django.db import models
from .models_services import (comment_file_path,
                              normal_item_image_size,
                              normal_textfile_size,
                              normal_textfile_format,
                              normal_image_format,
                              normal_width_and_height,)

from mptt.models import MPTTModel, TreeForeignKey


class Comment(MPTTModel):
    owner = models.ForeignKey(get_user_model(),
                              on_delete=models.CASCADE,
                              related_name='comments')
    parent = TreeForeignKey('self', related_name='children',
                            on_delete=models.SET_NULL, null=True, blank=True)
    body = models.TextField(max_length=10_000)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    image = models.ImageField(blank=True, null=True,
                              upload_to=comment_file_path,
                              validators=[
                                  normal_item_image_size,
                                  normal_image_format,
                                  # normal_width_and_height
                              ])
    textfile = models.FileField(blank=True, null=True,
                                upload_to=comment_file_path,
                                validators=[
                                    normal_textfile_size,
                                    normal_textfile_format])

    class Meta:
        unique_together = ('owner', 'body',)

    def __str__(self):
        return f"{self.owner}: {self.body[:50]}"

