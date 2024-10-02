from django.db import models
from django.contrib.auth.models import User  # Ensure this import is present

class ChatHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)  # Use ForeignKey for user
    topic = models.CharField(max_length=255)
    history = models.JSONField()  # Store chat history in JSON format
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat history for {self.user.username} on topic {self.topic}"

