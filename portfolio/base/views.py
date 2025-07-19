from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

from base.models import ContactMessage
# Create your views here.
def home(request):
    return render(request, 'index.html')

@csrf_exempt
def contact(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        # Save the contact message to the database
        contact_message = ContactMessage(name=name, email=email, message=message)
        contact_message.save()
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'}, status=400)
