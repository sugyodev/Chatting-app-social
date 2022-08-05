from django.test import TestCase
from chat.models import Chat
from account.models import MyUser


class ChatTestCase(TestCase):
    def setUp(self):
        obj = MyUser.objects.create(
            email="testing@gmail.com",
            is_active=True,
            is_staff=True
        )
        obj.save()
        userObj = MyUser.objects.filter(email="testing@gmail.com").first()
        Chat.objects.create(
            user=userObj,
            recipient=userObj,
            title="Testing",
            body="this is for testing",
            trash_by_user=True,
            trash_by_recipient=True
        )
        Chat.objects.create(
            user=userObj,
            recipient=userObj,
            title="",
            body="this is for testing2",
            trash_by_user=False,
            trash_by_recipient=False
        )
        Chat.objects.create(
            user=userObj,
            recipient=userObj,
            title="Testing2",
            body="this is for testing2",
            trash_by_user=True,
            trash_by_recipient=False
        )
        Chat.objects.create(
            user=userObj,
            recipient=userObj,
            title="Testing3",
            body="",
            trash_by_user=False,
            trash_by_recipient=False
        )

    def test_is_chat_title_exist(self):
        user = Chat.objects.get(title="Testing")
        self.assertEqual(user.title, "Testing")

    def test_is_chat_title_not_exist(self):
        user = Chat.objects.filter(body="this is for testing2").first()
        self.assertEqual(user.title, "")

    def test_is_chat_body_exist(self):
        user = Chat.objects.get(title="Testing2")
        self.assertEqual(user.body, "this is for testing2")

    def test_is_chat_body_not_exist(self):
        user = Chat.objects.get(title="Testing3")
        self.assertEqual(user.body, "")

    def test_is_chat_trash_by_user_exist(self):
        user = Chat.objects.get(title="Testing2")
        self.assertEqual(user.trash_by_user, True)

    def test_is_chat_trash_by_user_not_exist(self):
        user = Chat.objects.get(title="Testing3")
        self.assertEqual(user.trash_by_user, False)
