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

    path('animal_community/', AnimalCommunity.as_view(), name='animal_community'),
    path('animal_charities/', AnimalCharities.as_view(), name='animal_charities'),
    path('animal_comments/', AnimalComments.as_view(), name='animal_comments'),

    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),

]
