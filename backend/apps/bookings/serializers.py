from rest_framework import serializers
from .models import Booking

from adspaces.serializers import AdSpaceSerializer

class BookingSerializer(serializers.ModelSerializer):
    startDate = serializers.DateField(source='start_date')
    endDate = serializers.DateField(source='end_date')
    totalPrice = serializers.DecimalField(source='total_price', max_digits=12, decimal_places=2, read_only=True)
    adspace_details = AdSpaceSerializer(source='adspace', read_only=True)

    class Meta:
        model = Booking
        fields = ('id', 'advertiser', 'adspace', 'adspace_details', 'startDate', 'endDate', 'totalPrice', 'status')
        read_only_fields = ('advertiser', 'status', 'totalPrice')

    def validate(self, data):
        start = data.get('start_date')
        end = data.get('end_date')
        adspace = data.get('adspace')

        if start and end:
            if end <= start:
                raise serializers.ValidationError({"endDate": "End date must be after start date."})

            if adspace:
                overlapping = Booking.objects.filter(
                    adspace=adspace,
                    status__in=['pending', 'active'],
                    start_date__lt=end,
                    end_date__gt=start
                )
                if self.instance:
                    overlapping = overlapping.exclude(pk=self.instance.pk)
                
                if overlapping.exists():
                    raise serializers.ValidationError("This ad space is already booked for the specified dates.")

        return data

from .models import Campaign

class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = '__all__'

    def validate_budget(self, value):
        if value <= 0:
            raise serializers.ValidationError("Campaign budget must be greater than zero.")
        return value
