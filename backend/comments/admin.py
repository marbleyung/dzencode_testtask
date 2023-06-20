from django.contrib import admin
from .models import Comment
from mptt.admin import MPTTModelAdmin


class CommentAdmin(MPTTModelAdmin):
    list_display = ('body',
                    'owner',
                    'id',
                    'modified',
                    )


admin.site.register(Comment, CommentAdmin)
