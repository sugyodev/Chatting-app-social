from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from django.urls.conf import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'api/', include('messaging.urls')),
    path(r'auth/', include('djoser.urls')),
    path(r'auth/', include('djoser.urls.jwt')),
]

urlpatterns += [
    re_path(r'^.*', TemplateView.as_view(template_name='index.html'))
]
