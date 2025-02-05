# contacts/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Contact
from .serializers import ContactSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

@api_view(['GET'])
def api_contact_list(request):
    """
    get:
    Return a list of all contacts.
    """
    contacts = Contact.objects.all()
    serializer = ContactSerializer(contacts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def contact_detail(request, pk):
    """
    get:
    Return a single contact by ID.
    """
    try:
        contact = Contact.objects.get(pk=pk)
        serializer = ContactSerializer(contact)
        return Response(serializer.data)
    except Contact.DoesNotExist:
        return Response(serializer.errors, status=404)

@api_view(['POST'])
def api_create_contact(request):
    """
    post:
    Create a new contact.
    """
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)