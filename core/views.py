from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import App, AppDownload
from .serializers import AppSerializer, AppDownloadSerializer  # You'll need to create these serializers
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import SessionAuthentication, TokenAuthentication

from django.views import View
from django.http import HttpResponseForbidden

# Create your views here.



class AdminAddAppView(View):
    permission_classes = [IsAuthenticated, IsAdminUser]
    def get(self, request):
        
        if not request.user.is_superuser:
            return HttpResponseForbidden("You do not have permission to access this page.")

        return render(request, 'add_app.html')


class AdminAddAppApiView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    def post(self, request):
        print("User:", request.user)  # Logs the user
        print("Is superuser:", request.user.is_superuser)
        serializer = AppSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class AppsListView(View):
    def get(self, request):
        if request.user.is_authenticated:
            return render(request, 'apps_list.html')
        else:
            return HttpResponseForbidden()


class AppsListApiView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication,TokenAuthentication]

    def get(self, request):
        apps = App.objects.all()
        serializer = AppSerializer(apps, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class AppDownloadHistoryCreateApi(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication,TokenAuthentication]
    def post(self, request):
        app = App.objects.get(id=request.data['app'])
        request.data['user'] = request.user.id
        request.data['points_earned'] = app.points
        serializer = AppDownloadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            request.user.points += app.points
            request.user.save()
            return Response({'success':True,'data':serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class GetInstalledAppsApi(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    def get(self, request):
        app_downloads = AppDownload.objects.filter(user=request.user.id)
        serializer = AppDownloadSerializer(app_downloads,many=True)
        return Response(serializer.data)
    

# User side

# class UserAppsListView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         apps = App.objects.filter(visible=True)
#         serializer = AppSerializer(apps, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)


    
