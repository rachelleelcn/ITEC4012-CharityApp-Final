from django.urls import path
from . import views
from .views import *

urlpatterns = [
    # path('', views.start, name='start'),
    # path('signup/', views.signup_view, name='signup'),
    # path('login/', views.login_view, name='login'),
    # path('logout/', views.logout_view, name='logout'),
    # path('explore/', views.explore, name='explore'),
    # path('account/', views.account, name='account'),
    # path('explore/animals/', views.animals, name='animals'),
    # path('explore/arts&culture/', views.arts_culture, name='arts&culture'),
    # path('explore/education/', views.education, name='education'),
    # path('explore/environment/', views.environment, name='environment'),
    # path('explore/health/', views.health, name='health'),
    # path('explore/indigenouspeoples/', views.indigenouspeoples, name='indigenouspeoples'),
    # path('explore/publicbenefit/', views.publicbenefit, name='publicbenefit'),
    # path('explore/socialservices/', views.socialservices, name='socialservices'),
    # path('comment/', views.communitycomment, name='communitycomment'),
    # path('join/', views.joincommunity, name='joincommunity'),
    # path('donate/', views.donate, name='donate')

    path('explore/', Explore.as_view(), name='explore'),

    path('account_communities/', AccountCommunities.as_view(), name='account_communities'),
    path('account_history/', AccountHistory.as_view(), name='account_history'),

    path('community_details/', CommunityDetails.as_view(), name='community_details'),
    path('community_charities/', CommunityCharities.as_view(), name='community_charities'),
    path('community_comments/', CommunityComments.as_view(), name='community_comments'),
    path('community_join/', CommunityJoin.as_view(), name='community_join'),

    path('donate/', Donate.as_view(), name='donate'),

    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),

]
