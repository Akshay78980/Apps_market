from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from core.models import AppDownload
from core.serializers import AppDownloadSerializer
from rest_framework import status

from django.contrib.auth import logout


from django.db.models import Sum, F

class UserProfileView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.headers.get('Accept') == 'application/json':
            user = request.user
            
            downloads = AppDownload.objects.filter(user=user.id)
            
            total_points = AppDownload.objects.filter(user=user.id).aggregate(points_sum = Sum(F('points_earned')))['points_sum']

            serializer = AppDownloadSerializer(downloads,many=True)

            response_data = {
                'username': user.username,
                'email': user.email,
                'points_earned': total_points,
                'tasks_completed': serializer.data
            }

            return Response(response_data)
        
        return render(request, 'user_profile.html')


def registration_view(request):
    if request.method == "GET":
        return render(request, 'registration.html')
    

def login_view(request):
    if request.method == "GET":
        return render(request, 'login.html')
    

class UploadScreenshotView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]

    def get(self, request, pk):
        try:
            download_record = AppDownload.objects.get(pk=pk, user=request.user)
            serializer = AppDownloadSerializer(download_record)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except AppDownload.DoesNotExist:
            return Response({'error': 'Download record not found'}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk):
        try:
            download_record = AppDownload.objects.get(pk=pk, user=request.user)

            # Assuming you have a screenshot field in your AppDownload model
            if 'screenshot' in request.FILES:
                download_record.screenshot = request.FILES['screenshot']
                download_record.save()

            serializer = AppDownloadSerializer(download_record)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except AppDownload.DoesNotExist:
            return Response({'error': 'Download record not found'}, status=status.HTTP_404_NOT_FOUND)
    