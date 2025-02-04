from django.urls import reverse
from rest_framework.test import APITestCase
from contacts.models import Contact

class ContactAPITest(APITestCase):
    def setUp(self):
        self.contact = Contact.objects.create(
            name="Jane Doe",
            address="456 Elm St",
            phone="555-5678"
        )

    def test_list_contacts(self):
        url = reverse('contact-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_create_contact(self):
        url = reverse('contact-list')
        data = {
            'name': 'New Contact',
            'address': '789 Oak St',
            'phone': '555-9876'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Contact.objects.count(), 2)