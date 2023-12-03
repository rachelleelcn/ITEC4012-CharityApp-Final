from django import forms
from .models import Community_Comment

class CommentForm(forms.ModelForm):
    class Meta:
        model = Community_Comment
        fields = ['comment']

