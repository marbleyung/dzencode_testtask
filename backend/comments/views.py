from .models_services import delete_file_from_static
from .serializers import CommentSerializer
from .models import Comment
from rest_framework import generics
from rest_framework import permissions
from .permissions import IsOwnerOrReadOnly


class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all().order_by('-id')
    serializer_class = CommentSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CommentRUDView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    ]

    def delete(self, request, *args, **kwargs):
        comment = Comment.objects.get(id=self.kwargs.get('pk'))
        if comment.image:
            delete_file_from_static(comment.image.url)
        elif comment.textfile:
            delete_file_from_static(comment.textfile.url)
        return self.destroy(request, *args, **kwargs)
