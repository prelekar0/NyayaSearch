from django.shortcuts import render

def index(request):
    return render(request, 'home.html')

def chat(request):
    return render(request, 'chat.html')
