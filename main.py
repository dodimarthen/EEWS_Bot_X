import os
from dotenv import load_dotenv

load_dotenv()

access_token = os.environ.get('AccessToken')
access_token_secret = os.environ.get('AccessTokenSecret')
api_key = os.environ.get('API_Key')
api_key_secret = os.environ.get('API_Key_Secret')

