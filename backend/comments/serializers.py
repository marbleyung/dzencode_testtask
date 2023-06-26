from .models import Comment
from rest_framework import serializers


class CommentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    email = serializers.ReadOnlyField(source='owner.email')
    created = serializers.ReadOnlyField()
    parent_body = serializers.ReadOnlyField(source='parent.body')


    class Meta:
        model = Comment
        fields = ('id',
                  'owner',
                  'email',
                  'parent',
                  'parent_body',
                  'body',
                  'image',
                  'textfile',
                  'created')

    def validate(self, data, *args, **kwargs):
        if data.get('textfile') and data.get('image'):
            raise serializers.ValidationError("Each comment may have only 1 included file at the same time")
        return data

