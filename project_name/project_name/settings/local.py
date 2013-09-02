from project_name.settings.base import * # pylint: disable=W0614,W0401

DEBUG = True
TEMPLATE_DEBUG = DEBUG

ADMIN_MEDIA_PREFIX = '/static/admin/'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(VAR_ROOT, 'dev.db'),
    },
}

INSTALLED_APPS += (
    'django.contrib.admin',
    'django.contrib.admindocs',
)

TWITTER_APP_KEY = 'odYTj7bT0QByDkcBA8RvUQ'
TWITTER_APP_SECRET = 'Hv7kuNlknYxTqwyY1vREDluT41w22qGIhYGkvHFcrM'
