"""
URL configuration for algomentor project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from chat.views import chat_view, list_topics, signup_view



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/chat/', chat_view, name='chat'),  # Add 'api/' prefix
    path('api/topics/', list_topics, name='list_topics'),  # Add 'api/' prefix
     path('api/signup/', signup_view, name='signup'),
]
