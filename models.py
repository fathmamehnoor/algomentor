from django.db import models

class ChatHistory(models.Model):
    user_id = models.IntegerField()
    topic = models.CharField(max_length=100)
    history = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)


