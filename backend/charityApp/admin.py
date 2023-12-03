from django.contrib import admin
from .models import Charity
from .models import Community
from .models import User_History
from .models import User_Community
from .models import Community_History
from .models import Community_Charity
from .models import Community_Comment

# Define admin class
class UserHistoryAdmin(admin.ModelAdmin):
    list_display = ('username', 'communityName', 'charityName', 'amount', 'date')

class UserCommunityAdmin(admin.ModelAdmin):
    list_display = ('username', 'communityID')

class CommunityHistoryAdmin(admin.ModelAdmin):
    list_display = ('communityID', 'charityName', 'amount', 'date')

class CommunityCharityAdmin(admin.ModelAdmin):
    list_display = ('communityID', 'charityID')

class CommunityCommentAdmin(admin.ModelAdmin):
    list_display = ('communityID', 'username', 'comment', 'date')


# Register your models here.
admin.site.register(Charity)
admin.site.register(Community)
admin.site.register(User_History, UserHistoryAdmin)
admin.site.register(User_Community, UserCommunityAdmin)
admin.site.register(Community_History, CommunityHistoryAdmin)
admin.site.register(Community_Charity, CommunityCharityAdmin)
admin.site.register(Community_Comment, CommunityCommentAdmin)
