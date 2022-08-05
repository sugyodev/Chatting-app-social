from django.test import TestCase
from users.models import User


class UserTestCase(TestCase):
    DEFAULT_TEST_USEREMAIL1 = 'test1@gmail.com'
    DEFAULT_TEST_USEREMAIL2 = 'test2@gmail.com'
    DEFAULT_TEST_PASSWORD = 'testpassword'

    def setUp(self):
        User.objects.create_user(
            self.DEFAULT_TEST_USEREMAIL1,
            self.DEFAULT_TEST_PASSWORD,
            is_active=True,
        )
        User.objects.create_user(
            self.DEFAULT_TEST_USEREMAIL2,
            self.DEFAULT_TEST_PASSWORD,
            is_active=False,
        )

    def test_is_user_active(self):
        user = User.objects.get(email=self.DEFAULT_TEST_USEREMAIL1)
        self.assertEqual(user.is_active, True)

    def test_is_not_user_active(self):
        user = User.objects.get(email=self.DEFAULT_TEST_USEREMAIL2)
        self.assertEqual(user.is_active, False)
