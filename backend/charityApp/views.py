from django.contrib.auth import login, logout, authenticate
from django.db.models import Count
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from .models import Charity, Community, User_History, User_Community, Community_History, Community_Charity, Community_Comment
from django.contrib.auth.models import User
import decimal
import json
from .serializers import CharitySerializer, CommunitySerializer, UserHistorySerializer, UserCommunitySerializer, CommunityHistorySerializer, CommunityCharitySerializer, CommunityCommentSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

class Donate(APIView):
    # make a donation
    def post(self, request, communityID):
        amount = request.data.get("amount")
        # check if amount is empty
        if amount:
            amount = decimal.Decimal(float(amount))
            # check if amount is within valid donation range
            if (amount >= 0.5) and (amount <= 100000):
                user = request.user
                # add donation amount to Community's progress
                community = Community.objects.get(id=communityID)
                community.progress = community.progress + amount
                community.save()
                # add donation to user donation history (User_History)
                User_History(username=user, communityName=community.name, charityName=community.cotm_id,
                             amount=amount).save()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                print("invalid")
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            print("empty")
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CommunityJoin(APIView):
    # leave community
    def delete(self, request, communityID):
        user = request.user
        community = Community.objects.get(id=communityID)
        # check if user is in community
        if User_Community.objects.filter(username=user, communityID=community):
            # delete user record from community
            User_Community.objects.get(username=user, communityID=community).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # join community
    def post(self, request, communityID):
        user = request.user
        community = Community.objects.get(id=communityID)
        # check if user is NOT in community
        if not User_Community.objects.filter(username=user, communityID=community):
            # add user record to community
            User_Community(username=user, communityID=community).save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CommunityDetails(APIView):
    # permission_classes = [IsAuthenticated]

    # fetch community details for community page
    def get(self, request, communityID):
        community = Community.objects.get(id=communityID)
        userCount = community.user_community_set.all().count()
        lastHistory = community.community_history_set.all().last()

        # check if user is in community
        user = request.user
        userCommunities = User_Community.objects.filter(username=user)
        join = False
        for item in userCommunities:
            if item.communityID.name == community.name:
                join = True

        communityJson = {
            "id": community.id,
            "name": community.name,
            "lastMonth": lastHistory.date.strftime('%b'),
            "lastCharity": lastHistory.charityName,
            "lastAmount": lastHistory.amount,
            "cotmName": community.cotm_id.name,
            "cotmLocation": community.cotm_id.location,
            "cotmDes": community.cotm_id.description,
            "cotmWebsite": community.cotm_id.website,
            "progress": community.progress,
            "member": userCount,
            "joined": join,
            "cotmImage": settings.SITE_URL + community.cotm_id.image.url
        }
        return Response(communityJson)


class CommunityCharities(APIView):
    # permission_classes = [IsAuthenticated]

    # fetch related charities for community page
    def get(self, request, communityID):
        community = Community.objects.get(id=communityID)
        charities = community.community_charity_set.all()
        charitiesJson = []
        for item in charities:
            charitiesJson.append({
                "id": item.id,
                "name": item.charityID.name,
                "location": item.charityID.location,
                "description": item.charityID.description,
                "website": item.charityID.website,
                "image": settings.SITE_URL + item.charityID.image.url
            })
        return Response(charitiesJson)


class CommunityComments(APIView):
    # permission_classes = [IsAuthenticated]

    # fetch comments for community page
    def get(self, request, communityID):
        community = Community.objects.get(id=communityID)
        comments = community.community_comment_set.all()
        commentsJson = []
        for item in comments:
            commentsJson.append({
                "id": item.commentID,
                "community": item.communityID.name,
                "date": item.date,
                "comment": item.comment,
                "user": item.username.username
            })
        return Response(commentsJson)

    # post comments on community page
    def post(self, request, communityID):
        comment = request.data.get("comment")
        # check if comment is empty
        if comment:
            user = request.user
            community = Community.objects.get(id=communityID)
            # save comment to database
            Community_Comment(username=user, communityID=community, comment=comment).save()
            # return comment as Json to update frontend
            item = Community_Comment.objects.last()
            commentJson = {
                "id": item.commentID,
                "community": item.communityID.name,
                "date": item.date,
                "comment": item.comment,
                "user": item.username.username
            }
            return Response(commentJson, status=status.HTTP_201_CREATED)
        else:
            print("empty")
            return Response(status=status.HTTP_400_BAD_REQUEST)



class AccountCommunities(APIView):
    # permission_classes = [IsAuthenticated]

    # fetch user's joined communities for account page
    def get(self, request):
        user = request.user
        userCommunities = User_Community.objects.filter(username=user)
        userCommunitiesJson = []
        for item in userCommunities:
            userCommunitiesJson.append({
                "id": item.id,
                "user": item.username.username,
                "community": item.communityID.name
            })
        return Response(userCommunitiesJson)


class AccountHistory(APIView):
    # permission_classes = [IsAuthenticated]

    # fetch user's donation history for account page
    def get(self, request):
        user = request.user
        userHistory = User_History.objects.filter(username=user)
        serializer = UserHistorySerializer(userHistory, many=True)
        return Response(serializer.data)


class Explore(APIView):
    # permission_classes = [IsAuthenticated]

    # fetch community details for explore page
    def get(self, request):
        communities = Community.objects.all()
        # get member count for each community
        communityUserCount = User_Community.objects.values('communityID').annotate(count=Count('communityID'))
        exploreJson = []
        for i in range(len(communities)):
            exploreJson.append({
                "id": communities[i].id,
                "name": communities[i].name,
                "member": communityUserCount[i]["count"],
                "charityName": communities[i].cotm_id.name,
                "charityDes": communities[i].cotm_id.description,
                "featured": communities[i].featured,
                "image": settings.SITE_URL + communities[i].cotm_id.image.url
            })
        return Response(exploreJson)


@require_POST
@csrf_exempt
# login user
def login_view(request):
    request_json = json.loads(request.body)
    username = request_json.get('username')
    password = request_json.get('password')
    user = authenticate(request, username=username, password=password)
    # if credentials match with existing user, login
    if user is not None:
        login(request, user)
        return JsonResponse({"success": True})
    else:
        return JsonResponse({"success": False}, status=401)

# logout user
def logout_view(request):
    logout(request)
    return JsonResponse({"success": True})
