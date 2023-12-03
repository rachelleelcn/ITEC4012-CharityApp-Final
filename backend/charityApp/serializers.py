from rest_framework import serializers
from .models import Charity, Community, User_History, User_Community, Community_History, Community_Charity, Community_Comment


class CharitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Charity
        fields = '__all__'


class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = '__all__'


class UserHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = User_History
        fields = '__all__'


class UserCommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Community
        fields = '__all__'


class CommunityHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community_History
        fields = '__all__'


class CommunityCharitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community_Charity
        fields = '__all__'


class CommunityCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Community_Comment
        fields = '__all__'