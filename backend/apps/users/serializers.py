from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['role'] = self.user.role
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'email', 'role')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'email', 'password', 'role')

    def validate_email(self, value):
        # Email is already checked implicitly by EmailField, 
        # but here we can add extra explicit business logic if needed.
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        
        # Simple domain checks (optional)
        if "@" not in value or "." not in value.split("@")[-1]:
            raise serializers.ValidationError("Please provide a valid email format.")
            
        return value.lower()

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
            role=validated_data.get('role', 'advertiser')
        )
        return user
