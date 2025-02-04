from django.test import TestCase
from contacts.serializers import ContactSerializer

class ContactSerializerTest(TestCase):
    def test_serializer_valid_data(self):
        data = {
            'name': 'Test Contact',
            'address': '123 Test St',
            'phone': '555-0000'
        }
        serializer = ContactSerializer(data=data)
        self.assertTrue(serializer.is_valid())

    def test_serializer_invalid_data(self):
        data = {
            'name': '',  # Invalid: empty name
            'address': '123 Test St',
            'phone': '555-0000'
        }
        serializer = ContactSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)