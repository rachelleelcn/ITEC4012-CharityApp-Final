# ITEC 4012-CharityApp-Final

## Github repo link
https://github.com/rachelleelcn/ITEC4012-CharityApp-Final.git

## Get the code
1) Open a terminal and navigate to the folder you want to create your project in (e.g. `cd ~Documents/Code`)
2) Clone this repository with `git clone https://github.com/rachelleelcn/ITEC4012-CharityApp-Final.git`
   
## Set up backend
1) Open the `backend` folder with PyCharm. You can do this by going file->open and selecting the folder within `ITEC4012-CharityApp-Final` called `backend`
2) Configure your project interpreter. In Pycharm Pro, this might be done automatically for you. Otherwise, you can go to file->settings, and select Python Interpreter under `Project: backend`, and clicking Add Interpreter->Add Local Interpreter
3) Choose the default settings and click OK
4) Then, you can install dependencies using `pip install -r requirements.txt`
5) Go to `Edit Configurations` under `Current File`
6) Configure `Script path` to run `manage.py` with the name and parameter as `runserver`
7) Create a file called `.env` in the backend folder
8) Generate a secret key by running `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'` in the terminal. Copy the output.
9) Edit `.env` (created in part 7) with a text editor like notepad, and add a line that says `SECRET_KEY="your-secret-key-here"`. Paste the output from part 8 into 'your-secret-key-here'.
10) On the terminal, navigate to ``ITEC4012-CharityApp-Final\backend` and run `python manage.py migrate`
11) Run the server by clicking the play button for the run configuration you set up
12) Navigate to 127.0.0.1:8000! Your backend should run.
    
## Set up frontend
1) Open the `frontend` folder with WebStorm. You can do this by going file->open and selecting the folder within `ITEC4012-CharityApp-Final` called `frontend`
2) In the terminal, ensure you are in the `ITEC4012-CharityApp-Final/frontend` folder.  Run `npm install` in the terminal. If you are on a lab computer, you may need to run the following:
   - `$env:path += ";C:\Util\WPy64-31090\n\"` (only works on powershell, like in WebStorm's terminal) 
   - `C:\Util\WPy64-31090\n\npm.cmd install`
3) Run the frontend with `npm start` in the terminal. If you are on a lab computer, you may need to run `C:\Util\WPy64-31090\n\npm.cmd start`
4) (optional, but helpful) Add a run configuration in WebStorm:
   When you add a run configuration, select **npm** from the list. You want to ensure:
   - `Command:` is **run**
   - `Scripts:` is **start**
   - `Node interpreter:` is not blank. If you're on the lab computer you may need to add `C:\Util\WPy64-31090\n\node.exe`
   - `Package Manager:` is not blank. If you're on the lab computer you may need to add `C:\Util\WPy64-31090\n\npm.cmd`
   - Then click OK, and you should be able to run your frontend with the green play button.

## Login credentials (for testing)
1) User account (username: user1, password: user1test1234)
2) Admin account (username: admin, password: admintest1234)

## Features of the Charity App
1) Login system (login, logout)
2) Account (View joined communities and donation history of users)
3) Explore (View available featured and non-featured communities with their respective Charity of the Month)
4) Communities (View individual communities)
    - Donate to Charity of the Month and view community donation progress
    - Comment to the community's Words of Support board
    - View and visit community-related charity websites

## References
1) Community categories and charities reference to CanadaHelps https://www.canadahelps.org/en/

## Implementations
1) Main features
    - All main features from the backend are implmented in the frontend
    - Exception: donation amounts unable to be linked to Stripe API account (however, all with-in app interactions, e.g. add amount to community progress, add donation to account history, and client- and server-side donation form validation, were implemented)
3) Miscellaneous features
    - Breadcrumb navigation
    - Tooltip hover animation (over non-featured communities to display community descriptions)

