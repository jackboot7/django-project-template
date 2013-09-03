# -*- coding:utf-8 -*-

"""
Django settings for {{ project_name }} project.
Shared settings for all enviroments
"""

from django.conf.global_settings import *  # pylint: disable=W0614,W0401
import os

#=============================================================================
# General Django project settings.
#=============================================================================
DEBUG = True
TEMPLATE_DEBUG = DEBUG
ADMINS = (
    # ('Your Name', 'your_email@example.com'),
)

MANAGERS = ADMINS
SITE_ID = 1

# Hosts/domain names that are valid for this site; required if DEBUG is False
# See https://docs.djangoproject.com/en/1.5/ref/settings/#allowed-hosts
ALLOWED_HOSTS = []

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
TIME_ZONE = 'America/Chicago'

LANGUAGE_CODE = 'es-ve'
USE_I18N = True
USE_L10N = True
USE_TZ = True

SECRET_KEY = '{{ secret_key }}'
#=============================================================================
# Calculation of directories relative to the project module.
#=============================================================================

import {{ project_name }} as project_module

PROJECT_DIR = os.path.dirname(os.path.realpath(project_module.__file__))


TEMP_DIR = os.path.split(os.path.dirname(os.path.realpath(__file__)))[0]

PROJECT_DIR, SITE_ROOT = os.path.split(TEMP_DIR)

VAR_ROOT = os.path.join(os.path.split(PROJECT_DIR)[0], 'var')
if not os.path.exists(VAR_ROOT):
    os.mkdir(VAR_ROOT)

#=============================================================================
# Project URLS and media settings.
#=============================================================================
ROOT_URLCONF = '{{ project_name }}.urls'  # {{ project_name }}

LOGIN_URL = '/login/'
LOGOUT_URL = '/logout/'
LOGIN_REDIRECT_URL = '/'

STATIC_URL = '/static/'
MEDIA_URL = '/uploads/'

STATIC_ROOT = os.path.join(VAR_ROOT, 'static')
MEDIA_ROOT = os.path.join(VAR_ROOT, 'uploads')

# Additional locations of static files
STATICFILES_DIRS = (
    os.path.join(PROJECT_DIR, 'static'),
)

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

#=============================================================================
# Templates.
#=============================================================================
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
    # 'django.template.loaders.eggs.Loader',
)
TEMPLATE_DIRS = (
    os.path.join(PROJECT_DIR, 'templates'),
)

TEMPLATE_CONTEXT_PROCESSORS += ()

#=============================================================================
# Middleware.
#=============================================================================

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

#=============================================================================
# Installed Applications.
#=============================================================================

INSTALLED_APPS = (
    # Django Applications
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Django Admin.
    # 'django.contrib.admin',
    # 'django.contrib.admindocs',

    # Third party applications/modules
    # 'south',
    # 'braces',
    # 'crispy_forms',

    # Project applications/modules
    # {{ project_name }}.apps.<module_name>

)
#=============================================================================
# Auth / security.
#=============================================================================

#AUTH_PROFILE_MODULE = ''
#PROFILE_URL = '/profile/'

#=============================================================================
# Third party applications settings.
#=============================================================================
# South settings
#=============================================================================

#=============================================================================
# Miscellaneous project settings.
#=============================================================================

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = '{{ project_name }}.wsgi.application'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}
