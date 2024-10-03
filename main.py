import os
from dotenv import load_dotenv
import tweepy

load_dotenv()

# Access environment variables
access_token = os.environ.get('AccessToken')
access_token_secret = os.environ.get('AccessTokenSecret')
api_key = os.environ.get('API_Key')
api_key_secret = os.environ.get('API_Key_Secret')
client_id = os.environ.get('ClientID')
client_secret = os.environ.get('ClientSecret')
bearer_token = os.environ.get('BearerToken')

# Authenticate using OAuth 1.0a (for API object)
auth = tweepy.OAuthHandler(api_key, api_key_secret)
auth.set_access_token(access_token, access_token_secret)

# Create an API object (for OAuth 1.0a requests)
api = tweepy.API(auth)

# Create a Client object (for OAuth 2.0 Bearer Token)
client = tweepy.Client(
    bearer_token=bearer_token,
    consumer_key=api_key,
    consumer_secret=api_key_secret,
    access_token=access_token,
    access_token_secret=access_token_secret,
    wait_on_rate_limit=True
)

# Upload media
media = api.media_upload("shakemap.png", chunked=True, media_category="tweet_image")
media_ids = [media.media_id]

# Post a tweet
try:
    response = client.create_tweet(text='EEWS Broadcast Testing by python', media_ids=media_ids)
    print(f"Tweet created successfully: {response.data['text']}")
except Exception as e:
    print(f"Error: {e}")
