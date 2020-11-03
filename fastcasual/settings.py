"""
Django settings for fastcasual project.

Generated by 'django-admin startproject' using Django 3.0.4.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os
import psycopg2
import dj_database_url

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get(
  'DJANGO_SECRET_KEY', 'z7t+y3%z6n&-$==3*@q#9@6b)!c+!3h1ftoqz_8su6n70mm*k%')
# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = 'PROD' not in os.environ
DEBUG = True
ALLOWED_HOSTS = [
  'music-player-1.herokuapp.com', '127.0.0.1', '0.0.0.0', 'localhost'
]

# Application definition

INSTALLED_APPS = [
  'whitenoise.runserver_nostatic',
  'user_auth.apps.UserAuthConfig',
  'song_player.apps.SongPlayerConfig',
  # 'django.contrib.admin',
  'django.contrib.auth',
  'django.contrib.contenttypes',
  'django.contrib.sessions',
  # 'django.contrib.messages',
  'django.contrib.staticfiles',
  'debug_toolbar'
]

MIDDLEWARE = [
  # 'django.middleware.security.SecurityMiddleware',
  'whitenoise.middleware.WhiteNoiseMiddleware',
  'django.contrib.sessions.middleware.SessionMiddleware',
  # 'django.middleware.common.CommonMiddleware',
  'django.middleware.csrf.CsrfViewMiddleware',
  'debug_toolbar.middleware.DebugToolbarMiddleware',
  # 'django.contrib.auth.middleware.AuthenticationMiddleware',
  # 'django.contrib.messages.middleware.MessageMiddleware',
  # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'fastcasual.urls'

TEMPLATES = [
  {
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [os.path.join(BASE_DIR, 'templates')],
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

WSGI_APPLICATION = 'fastcasual.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

ssl_require = os.environ.get('DATABASE_URL', '') != ''
DATABASES = {
  'default':
    dj_database_url.config(
      conn_max_age=600,
      ssl_require=ssl_require,
      default='postgresql://fastcasual:casual@localhost/fastcasual')
}

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
  {
    'NAME':
      'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
  },
  {
    'NAME':
      'django.contrib.auth.password_validation.MinimumLengthValidator',
  },
  {
    'NAME':
      'django.contrib.auth.password_validation.CommonPasswordValidator',
  },
  {
    'NAME':
      'django.contrib.auth.password_validation.NumericPasswordValidator',
  },
]

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static'),)
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

SESSION_ENGINE = "django.contrib.sessions.backends.signed_cookies"

# django_heroku.settings(locals())

# DEFAULT_FILE_STORAGE = 'storages.backends.dropbox.DropBoxStorage'
# DROPBOX_OAUTH2_TOKEN = 'yFzU8js8oqsAAAAAAAAAATi0VKrlceFPmFyjGbmHiunUFvXkoQQGCpYuce3fQUzP'

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
AWS_ACCESS_KEY_ID='AKIA5BJLHP7KHY6TTHKN'
AWS_SECRET_ACCESS_KEY='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'
AWS_STORAGE_BUCKET_NAME='music-player-1'

INTERNAL_IPS = [
    # ...
    '127.0.0.1',
    # ...
]