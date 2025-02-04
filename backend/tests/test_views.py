from django.urls import reverse
from rest_framework.test import APITestCase
from contacts.models import Contact

class ContactAPITest(APITestCase):
    def setUp(self):
        # Create a test contact
        self.contact = Contact.objects.create(
            name="Jane Doe",
            address="10 Downing St",
            phone="020 7946 0000"
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
    
    
class ContactDeleteTest(APITestCase):
    def setUp(self):
        # Create a test contact
        self.contact = Contact.objects.create(
            name="Jane Doe",
            address="10 Downing St",
            phone="020 7946 0000"
        )
        self.url = reverse('contact-detail', args=[self.contact.id])
    
    def test_delete_contact(self):
        # Delete the contact
        response = self.client.delete(self.url)
        
        # Verify the response
        self.assertEqual(response.status_code, 204)  # No Content
        self.assertEqual(Contact.objects.count(), 0)  # Contact should be deleted

    def test_delete_nonexistent_contact(self):
        # Try to delete a contact that doesn't exist
        invalid_url = reverse('contact-detail', args=[999])
        response = self.client.delete(invalid_url)
        
        # Verify the response
        self.assertEqual(response.status_code, 404)  # Not Found

class ContactEditTest(APITestCase):
    def setUp(self):
        # Create a test contact
        self.contact = Contact.objects.create(
            name="John Smith",
            address="25 Oxford St",
            phone="020 7946 0000"
        )
        self.url = reverse('contact-detail', args=[self.contact.id])

    def test_edit_contact(self):
        # Update the contact
        updated_data = {
            'name': 'Jane Smith',
            'address': '18 Regent St',
            'phone': '020 7946 0000'
        }
        response = self.client.put(self.url, updated_data, format='json')
        
        # Verify the response
        self.assertEqual(response.status_code, 200)
        
        # Verify the updated data
        self.contact.refresh_from_db()
        self.assertEqual(self.contact.name, 'Jane Smith')
        self.assertEqual(self.contact.address, '18 Regent St')
        self.assertEqual(self.contact.phone, '020 7946 0000')

    def test_edit_with_invalid_data(self):
        # Try to update with invalid data (empty name)
        invalid_data = {
            'name': '',  # Invalid: empty name
            'address': '18 Regent St',
            'phone': '020 7946 0000'
        }
        response = self.client.put(self.url, invalid_data, format='json')
        
        # Verify the response
        self.assertEqual(response.status_code, 400)  # Bad Request
        self.assertIn('name', response.data)  # Error message for name field

    def test_edit_nonexistent_contact(self):
        # Try to edit a contact that doesn't exist
        invalid_url = reverse('contact-detail', args=[999])
        response = self.client.put(invalid_url, {}, format='json')
        
        # Verify the response
        self.assertEqual(response.status_code, 404)  # Not Found 
        