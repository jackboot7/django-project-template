django-project-template
=======================

Simple Django 1.5 Base Template.
Please, use the issue tracker to inform of issues or suggest changes. Pull Request are welcome.

Features:
++++++++++


- Requirement file with basic applications.

Templates
----------------------------
- Twitter Bootstrap ready templates.
- Django Registration templates (login, logout, register, etc)


How to use this template to create your project:
+++++++++++++++++++++++++++++++++++++++++++++++++

- Create your working environment and virtualenv.
- Activate your virtualenv and install django in it.::

    $ . venv/bin/activate
    $ pip install django

- Use Django Admin to generate a new project::

    $ django-admin.py startproject --template https://github.com/jackboot7/django-project-template/zipball/master --extension py,rst,conf,ini projectname

- Install the project requirements and start working::
    
    $ pip install -r requirements.pip



To do:
++++++++

- Add fabric file for deployment.



