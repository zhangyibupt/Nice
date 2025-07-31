from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import IntegrityError
import logging

# 添加日记记录
logger = logging.getLogger(__name__)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class RegisterView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        name = request.data.get('name', '')
        
        if not email or not password:
            return Response({
                'error': '邮箱和密码不能为空'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if len(password) < 6:
            return Response({
                'error': '密码长度至少为6位'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # 检查用户是否已存在
            if User.objects.filter(username=email).exists():
                return Response({
                    'error': '该邮箱已被注册'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # 创建新用户
            user = User.objects.create_user(
                username=email,
                email=email,
                password=password,
                first_name=name
            )

            logger.info(f"用户创建成功: {user.username}")
            
            # 生成 JWT token
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'message': '注册成功',
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                }
            }, status=status.HTTP_201_CREATED)
            
        except IntegrityError:
            return Response({
                'error': '该邮箱已被注册'
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"注册失败 - 用户: {email}, 错误: {str(e)}", exc_info=True)
            return Response({
                'error': '注册失败，请稍后重试'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)