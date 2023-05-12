
# Create your views here.
from rest_framework import generics
from .models import Message
from .serializers import MessageSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from urllib import request
from django.http import HttpResponse , JsonResponse
from django.views.decorators.csrf import csrf_exempt 

class MessageList(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

@csrf_exempt
def facts(request):
    if request.method == "POST":
       
       fact = request.POST.get('fact')
       name = request.POST.get('name')
       email = request.POST.get('email')
       mesage = Message.objects.create(fact=fact, reciever=name, emailAddress=email)
       id = mesage.id
       mesage.save()
       return HttpResponse(f"Fact with {id} saved")
    else:
        
        #return HttpResponse("Fact not saved")
        # serializer = MessageSerializer()
        # print(serializer.data)
        # message_list = Message.objects.all()
        # print(message_list)
        return MessageList.as_view()(request)
@csrf_exempt
def get_fact(request, fact_id):
    if request.method == "GET":
        #print("hello")
        try :
             fact = Message.objects.get(id=fact_id)

        except Message.DoesNotExist:
            fact = "Fact not found"
       
        return HttpResponse(fact)
    else:
        return HttpResponse("Wrong `request.method`")