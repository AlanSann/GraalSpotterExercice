# GraalSpotterExercice

python3 -m venv web_env for macOS

python -m venv web_env for windows

source web_env/scripts/activate 

. web_env\scripts\activate


if local database not working : replace it by 
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'scrapped_sneakers',
        'USER': 'root',
        'PASSWORD': 'root',
        'HOST': 'localhost',
        'PORT': '8889',
    }
}
```

if there is a problem with cors : 

Go to your Python installation folder -> Lib -> site-packages -> corsheaders -> signal.py file. (for me it was C:\Python310\Lib\site-packages\corsheaders\signal.py)

I solved the issue by changing the file to the following:

```
from django.dispatch import Signal

# Return Truthy values to enable a specific request.
# This allows users to build custom logic into the request handling
check_request_enabled = Signal()
```