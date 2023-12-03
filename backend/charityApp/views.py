from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout
from django.db.models import Count
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.contrib import admin
from .models import Charity, Community, User_History, User_Community, Community_History, Community_Charity, Community_Comment
from django.contrib.auth.models import User
from .forms import CommentForm
import stripe
import decimal
from .serializers import CharitySerializer, CommunitySerializer, UserHistorySerializer, UserCommunitySerializer, CommunityHistorySerializer, CommunityCharitySerializer, CommunityCommentSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.shortcuts import render


# class CharityList(APIView):
#     def get(self, request):
#         community = Community.objects.get(id=1)
#         userCount = community.user_community_set.all().count()
#         lastHistory = community.community_history_set.all().last()
#         charities = community.community_charity_set.all()
#         comments = community.community_comment_set.all()
#
#
#         communities = Charity.objects.all()
#         serializer = CommunitySerializer(communities, many=True)
#         return Response(serializer.data)

# {id: 1, name: "Community name1", member: 10, charityName: "Charity name1", charityDes: "xxx", featured: true}
class Explore(APIView):
    def get(self, request):

        communities = Community.objects.all()
        # get community and respective user count in a dict
        communityUserCount = User_Community.objects.values('communityID').annotate(count=Count('communityID'))

        # for community in communities:
        #     exploreJson.append({
        #         "id": community.id,
        #         "name": community.name,
        #         "member": 10,
        #         "charityName": community.cotm_id.name,
        #         "charityDes": community.cotm_id.description,
        #         "featured": community.featured
        #     })
        #     print(communityUserCount[0]["count"])

        exploreJson = []
        for i in range(len(communities)):
            exploreJson.append({
                "id": communities[i].id,
                "name": communities[i].name,
                "member": communityUserCount[i]["count"],
                "charityName": communities[i].cotm_id.name,
                "charityDes": communities[i].cotm_id.description,
                "featured": communities[i].featured
            })
            print(communityUserCount[i]["count"])

        return Response(exploreJson)


def start(request):
    # Redirect users to login page
    return redirect('/login')

def signup_view(request):
    # POST request - when user tries to sign up
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        # sign up user if info is valid
        if form.is_valid():
            user = form.save()
            # login user
            login(request, user)
            return redirect('/explore')
    # GET request - when user accesses page
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})


def login_view(request):
    # POST request - when user tries to log in
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        # sign up user if info is valid
        if form.is_valid():
            user = form.get_user()
            # login user
            login(request, user)

            # If 'next' exists, redirect users back to page (before prompted for login)
            if 'next' in request.POST:
                return redirect(request.POST.get('next'))
            else:
                return redirect('/explore')
    # GET request - when user accesses page
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

@require_POST
def logout_view(request):
    # logout user
    logout(request)
    return render(request, 'logout.html')


@login_required(login_url="/login")
def explore(request):
    communities = Community.objects.all()
    # get community and respective user count in a dict
    communityUserCount = User_Community.objects.values('communityID').annotate(count=Count('communityID'))
    charities = Charity.objects.all()
    return render(request, 'explore.html', {'communities': communities, 'communityUserCount': communityUserCount, 'charities': charities})


@login_required(login_url="/login")
def account(request):
    user = request.user
    userCommunities = User_Community.objects.filter(username=user)
    userHistories = User_History.objects.filter(username=user)
    return render(request, 'account.html', {'user': user, 'userCommunities': userCommunities, 'userHistories': userHistories})

@require_POST
def communitycomment(request):
    form = CommentForm(request.POST)
    if form.is_valid():
        # save new record to Community_Comment
        instance = form.save(commit=False)
        instance.username = request.user
        instance.communityID = Community.objects.get(name=request.POST.get('prevCommunity'))
        instance.save()
    # return to community
    return redirect(request.POST.get('prevPath'))

@require_POST
def joincommunity(request):
    user = request.user
    community = Community.objects.get(name=request.POST.get('prevCommunity'))
    if request.POST.get("status") == 'Join':
        # if user is not in community -> join (add new record to User_Community)
        User_Community(username=user, communityID=community).save()
    else:
        # if user is in community -> leave (delete record in User_Community)
        User_Community.objects.get(username=user, communityID=community).delete()
    # return to community
    return redirect(request.POST.get('prevPath'))

@require_POST
def donate(request):
    amount = request.POST.get('amount')
    # Stripe registers amount in pennies
    pennies = int(float(amount)*100)
    # add customer and payment to Stripe records
    customer = stripe.Customer.create(
        email=request.POST['email'],
        name=request.POST['name'],
        source=request.POST['stripeToken']
    )
    charge = stripe.Charge.create(
        customer=customer,
        amount=pennies,
        currency='cad',
        description="donation"
    )

    community = Community.objects.get(name=request.POST.get('prevCommunity'))
    link = request.POST.get('prevPath')

    # add donation amount to Community's progress
    community.progress = community.progress + decimal.Decimal(float(amount))
    community.save()
    # add donation to user donation history (User_History)
    User_History(username=request.user, communityName=community.name, charityName=community.cotm_id, amount=amount).save()

    return render(request, 'donate.html', {'community': community, 'link': link, 'amount': amount})

@login_required(login_url="/login")
def animals(request):
    # get community and related user count, donation history, charities and comments
    community = Community.objects.get(id=1)
    userCount = community.user_community_set.all().count()
    lastHistory = community.community_history_set.all().last()
    charities = community.community_charity_set.all()
    comments = community.community_comment_set.all()

    # get communities current user is in
    user = request.user
    userCommunities = User_Community.objects.filter(username=user)
    # Check if user joined the community
    join = False
    for item in userCommunities:
        if str(item.communityID) == str(community.name):
            join = True

    # Fetch comment form from forms
    commentform = CommentForm()

    return render(request, 'communities/animals.html',
                  {'community': community, 'userCount': userCount, 'lastHistory': lastHistory, 'charities': charities,
                   'comments': comments, 'commentform': commentform, 'userCommunities': userCommunities, 'join': join})

@login_required(login_url="/login")
def arts_culture(request):
    # get community and related user count, donation history, charities and comments
    community = Community.objects.get(id=2)
    userCount = community.user_community_set.all().count()
    lastHistory = community.community_history_set.all().last()
    charities = community.community_charity_set.all()
    comments = community.community_comment_set.all()

    # get communities current user is in
    user = request.user
    userCommunities = User_Community.objects.filter(username=user)
    # Check if user joined the community
    join = False
    for item in userCommunities:
        if str(item.communityID) == str(community.name):
            join = True

    # Fetch comment form from forms
    commentform = CommentForm()

    return render(request, 'communities/arts&culture.html',
                  {'community': community, 'userCount': userCount, 'lastHistory': lastHistory, 'charities': charities,
                   'comments': comments, 'commentform': commentform, 'userCommunities': userCommunities, 'join': join})


@login_required(login_url="/login")
def education(request):
    # get community and related user count, donation history, charities and comments
    community = Community.objects.get(id=3)
    userCount = community.user_community_set.all().count()
    lastHistory = community.community_history_set.all().last()
    charities = community.community_charity_set.all()
    comments = community.community_comment_set.all()

    # get communities current user is in
    user = request.user
    userCommunities = User_Community.objects.filter(username=user)
    # Check if user joined the community
    join = False
    for item in userCommunities:
        if str(item.communityID) == str(community.name):
            join = True

    # Fetch comment form from forms
    commentform = CommentForm()

    return render(request, 'communities/education.html',
                  {'community': community, 'userCount': userCount, 'lastHistory': lastHistory, 'charities': charities,
                   'comments': comments, 'commentform': commentform, 'userCommunities': userCommunities, 'join': join})

@login_required(login_url="/login")
def environment(request):
    # get community and related user count, donation history, charities and comments
    community = Community.objects.get(id=4)
    userCount = community.user_community_set.all().count()
    lastHistory = community.community_history_set.all().last()
    charities = community.community_charity_set.all()
    comments = community.community_comment_set.all()

    # get communities current user is in
    user = request.user
    userCommunities = User_Community.objects.filter(username=user)
    # Check if user joined the community
    join = False
    for item in userCommunities:
        if str(item.communityID) == str(community.name):
            join = True

    # Fetch comment form from forms
    commentform = CommentForm()

    return render(request, 'communities/environment.html',
                  {'community': community, 'userCount': userCount, 'lastHistory': lastHistory, 'charities': charities,
                   'comments': comments, 'commentform': commentform, 'userCommunities': userCommunities, 'join': join})

@login_required(login_url="/login")
def health(request):
    # get community and related user count, donation history, charities and comments
    community = Community.objects.get(id=5)
    userCount = community.user_community_set.all().count()
    lastHistory = community.community_history_set.all().last()
    charities = community.community_charity_set.all()
    comments = community.community_comment_set.all()

    # get communities current user is in
    user = request.user
    userCommunities = User_Community.objects.filter(username=user)
    # Check if user joined the community
    join = False
    for item in userCommunities:
        if str(item.communityID) == str(community.name):
            join = True

    # Fetch comment form from forms
    commentform = CommentForm()

    return render(request, 'communities/health.html',
                  {'community': community, 'userCount': userCount, 'lastHistory': lastHistory, 'charities': charities,
                   'comments': comments, 'commentform': commentform, 'userCommunities': userCommunities, 'join': join})

@login_required(login_url="/login")
def indigenouspeoples(request):
    # get community and related user count, donation history, charities and comments
    community = Community.objects.get(id=6)
    userCount = community.user_community_set.all().count()
    lastHistory = community.community_history_set.all().last()
    charities = community.community_charity_set.all()
    comments = community.community_comment_set.all()

    # get communities current user is in
    user = request.user
    userCommunities = User_Community.objects.filter(username=user)
    # Check if user joined the community
    join = False
    for item in userCommunities:
        if str(item.communityID) == str(community.name):
            join = True

    # Fetch comment form from forms
    commentform = CommentForm()

    return render(request, 'communities/indigenouspeoples.html',
                  {'community': community, 'userCount': userCount, 'lastHistory': lastHistory, 'charities': charities,
                   'comments': comments, 'commentform': commentform, 'userCommunities': userCommunities, 'join': join})

@login_required(login_url="/login")
def publicbenefit(request):
    # get community and related user count, donation history, charities and comments
    community = Community.objects.get(id=7)
    userCount = community.user_community_set.all().count()
    lastHistory = community.community_history_set.all().last()
    charities = community.community_charity_set.all()
    comments = community.community_comment_set.all()

    # get communities current user is in
    user = request.user
    userCommunities = User_Community.objects.filter(username=user)
    # Check if user joined the community
    join = False
    for item in userCommunities:
        if str(item.communityID) == str(community.name):
            join = True

    # Fetch comment form from forms
    commentform = CommentForm()

    return render(request, 'communities/publicbenefit.html',
                  {'community': community, 'userCount': userCount, 'lastHistory': lastHistory, 'charities': charities,
                   'comments': comments, 'commentform': commentform, 'userCommunities': userCommunities, 'join': join})

@login_required(login_url="/login")
def socialservices(request):
    # get community and related user count, donation history, charities and comments
    community = Community.objects.get(id=8)
    userCount = community.user_community_set.all().count()
    lastHistory = community.community_history_set.all().last()
    charities = community.community_charity_set.all()
    comments = community.community_comment_set.all()

    # get communities current user is in
    user = request.user
    userCommunities = User_Community.objects.filter(username=user)
    # Check if user joined the community
    join = False
    for item in userCommunities:
        if str(item.communityID) == str(community.name):
            join = True

    # Fetch comment form from forms
    commentform = CommentForm()

    return render(request, 'communities/socialservices.html',
                  {'community': community, 'userCount': userCount, 'lastHistory': lastHistory, 'charities': charities,
                   'comments': comments, 'commentform': commentform, 'userCommunities': userCommunities, 'join': join})



