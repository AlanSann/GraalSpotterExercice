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
