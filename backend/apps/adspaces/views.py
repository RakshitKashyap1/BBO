from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import AdSpace
from .serializers import AdSpaceSerializer
from core.permissions import IsAdSpaceOwnerOrReadOnly

class AdSpaceViewSet(viewsets.ModelViewSet):
    serializer_class = AdSpaceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAdSpaceOwnerOrReadOnly]
    filterset_fields = ['city', 'type', 'availability_status']
    search_fields = ['location', 'city', 'type']
    ordering_fields = ['base_price_per_day', 'footfall_estimate']


    def get_queryset(self):
        queryset = AdSpace.objects.all()
        # Support filtering by owner: ?mine=true
        mine = self.request.query_params.get('mine', None)
        if mine == 'true' and self.request.user.is_authenticated:
            return queryset.filter(owner=self.request.user)
        return queryset

    def perform_create(self, serializer):
        # Additional role check: Only owners/admins can host ad spaces
        if self.request.user.role not in ['owner', 'admin']:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("Only media owners or admins can create ad spaces.")
        serializer.save(owner=self.request.user)
