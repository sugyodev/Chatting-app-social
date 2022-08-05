from rest_framework import routers
from messaging.views import ChatView

router = routers.SimpleRouter()
router.register(r'chats', ChatView)

urlpatterns = [
    # path(r'/', ),
]

urlpatterns += router.urls
