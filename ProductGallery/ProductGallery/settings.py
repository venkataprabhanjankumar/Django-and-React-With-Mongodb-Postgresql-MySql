from pathlib import Path
import os
from corsheaders.defaults import default_headers, default_methods

# Build paths inside the project like this: BASE_DIR / 'subdir'.

BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'Secreat Key'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'productsapp',
    'products.apps.ProductsConfig',
    'authenticate.apps.AuthenticateConfig',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'sslserver',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

'''
# Allow access to all domains

CORS_ORIGIN_ALLOW_ALL = True '''

# we can specify which domains must be given access
CORS_ORIGIN_ALLOW_ALL = False

CORS_ORIGIN_WHITELIST = [
    'https://127.0.0.1:8080',
]

CORS_ALLOWED_ORIGINS = [
    'https://127.0.0.1:8080',
]

CSRF_TRUSTED_ORIGINS = [
    '127.0.0.1:8080',
]


CORS_ALLOW_CREDENTIALS = True


CSRF_COOKIE_SAMESITE = 'None'
SESSION_COOKIE_SAMESITE = 'None'

CSRF_COOKIE_SECURE = True

CORS_ALLOW_HEADERS = list(default_headers) + [
    'Access-Control-Allow-Origin',
]
CORS_ALLOW_METHODS = list(default_methods) + [

]

SESSION_COOKIE_SECURE = True

SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# CSRF_USE_SESSIONS = True if it set true it will generate session id instead of csrf token

ROOT_URLCONF = 'ProductGallery.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'productsui/build'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ProductGallery.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {},
    'UsersDb': {
        'ENGINE': 'django.db.backends.postgresql',
        'USER': 'username',
        'PASSWORD': 'password',
        'NAME': 'usersdb',
        'PORT': '5432',
    },
    'ProductsCatalog': {
        'ENGINE': 'django.db.backends.mysql',
        'USER': 'username',
        'PASSWORD': 'password',
        'NAME': 'chattingdb',
        'PORT': '3306'
    },
    'ProductsDb': {
        'ENGINE': 'djongo',
        'ENFORCE_SCHEMA': False,
        'NAME': 'myFirstDatabase',
        'CLIENT': {
            'host': 'mongodb+srv://username:password@mycluster1.a27pe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        }
    }
}

DATABASE_ROUTERS = [
    'routers.UsersModels.UsersModel',
    'routers.UsersModels.ProductsModel',
    'routers.UsersModels.ProductsList',
]

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ]
}
STATIC_URL = '/static/'

STATIC_FILES_DIRS = (
    os.path.join(BASE_DIR, 'static')
)

# MEDIA_ROOT = '/media/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

FILE_UPLOAD_HANDLERS = ["django.core.files.uploadhandler.MemoryFileUploadHandler",
                        "django.core.files.uploadhandler.TemporaryFileUploadHandler"]

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
