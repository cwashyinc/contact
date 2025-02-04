from django.test import TestCase
from contacts.models import Contact

class ContactModelTest(TestCase):
    def test_create_contact(self):
        contact = Contact.objects.create(
            name="John Doe",
            address="123 Main St",
            phone="555-1234"
        )
        self.assertEqual(contact.name, "John Doe")
        self.assertEqual(str(contact), "John Doe")