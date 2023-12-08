from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('explore/', Explore.as_view(), name='explore'),

    path('account_communities/', AccountCommunities.as_view(), name='account_communities'),
    path('account_history/', AccountHistory.as_view(), name='account_history'),

    path('community_details/<int:communityID>/', CommunityDetails.as_view(), name='community_details'),
    path('community_charities/<int:communityID>/', CommunityCharities.as_view(), name='community_charities'),
    path('community_comments/<int:communityID>/', CommunityComments.as_view(), name='community_comments'),
    path('community_join/<int:communityID>/', CommunityJoin.as_view(), name='community_join'),

    path('donate/<int:communityID>/', Donate.as_view(), name='donate'),

    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
