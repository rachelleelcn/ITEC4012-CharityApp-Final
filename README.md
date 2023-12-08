# ITEC 4012-CharityApp

## Github repo link
https://github.com/rachelleelcn/ITEC4012-CharityApp.git

## Steps to get this django app running on your own server
## Backend
1) Open a terminal and navigate to the folder you want to create your project in (e.g. `cd ~Documents/Code`)
2) Clone this repository with `git clone https://github.com/rachelleelcn/ITEC4012-CharityApp.git`
3) Open the repository with PyCharm. You can do this by going file->open and selecting the cloned folder called `ITEC4012_CharityApp`
4) Configure your project interpreter. Go to file->settings, and selecting Python Interpreter under `Project: ITEC4012_CharityApp`, and clicking Add Interpreter->Add Local Interpreter
5) Choose the default settings and click OK
6) Then, you can install dependencies using PyCharm (django, python-decouple, pillow, stripe). Or, you can use the command line (`pip install django python-decouple pillow stripe`)
7) Go to edit configurations
8) Configure it to run manage.py with the parameter `runserver`
9) In your project folder (ITEC4012_CharityApp) create a file called `.env`
10) Generate a secret key by running `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'` in the terminal. Copy the output.
11) Edit `.env` (created in part 9) with a text editor like notepad, and add a line that says `SECRET_KEY="your-secret-key-here"`. Paste the output from part 10 into 'your-secret-key-here'.
12) On the terminal, navigate to `ITEC4012_CharityAppo` and run `python manage.py migrate`
13) Run the server by clicking the play button for the run configuration you set up
14) Navigate to 127.0.0.1:8000! Your app should load.
## Frontend

## Features of the Charity App
1) Login system (login, sign up, logout)
2) Account (View joined communities and donation history of users)
3) Explore (View available featured and non-featured communities with their respective Charity of the Month)
4) Communities (View individual communities)
    - Donate to Charity of the Month and view community donation progress
      - For payment test
        - credit card number: 4242 4242 4242 4242
        - Expiry date: any future date (Ex. 1234)
        - CVC: any (Ex. 567)
    - Comment to the community's Words of Support board
    - View and visit community-related charity websites

## References
1) Community categories and charities reference to CanadaHelps https://www.canadahelps.org/en/
2) Donation system's credit card integration uses Stripe API https://stripe.com/docs/api

## Implementations

## User accounts (for testing)
1) User account (username: user1, password: user1test1234)
2) 1) Admin account (username: admin, password: admintest1234)