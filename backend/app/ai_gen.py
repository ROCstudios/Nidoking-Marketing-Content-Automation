import json
import os
from datetime import datetime, timedelta
import openai
from dotenv import load_dotenv

load_dotenv()

# Set up your OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')
model = "gpt-4o-mini"
#Prompts
system_prompt = """You will make content for me"""  


# Function to simulate a conversation between two personas
def generate_social_post(topic):
    prompt = f"Generate an engaging social media post about {topic}"

    # Generate the response using the OpenAI API
    response = openai.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ],
        temperature=1.2,
        top_p=1.0
    )

    try:
        # Get the generated post text from the response
        post_text = response.choices[0].message.content
        return post_text
        
    except Exception as e:
        print(f"Error generating social post: {str(e)}")
        return None
    
def generate_image(prompt):
    try:
        # gpt prompt generation from prompt parameter
        response = openai.chat.completions.create(
            model=model,
            messages=[{"role": "system", "content": """
You are a prompt generator for an image generation AI. You will be given a prompt and you will need to generate a new prompt for the image generation AI.

Your job is to take the original which is a conversation between two people and extract the visual elements of the conversation and create a new prompt for the image generation AI.
"""}, {"role": "user", "content": f"""Create a prompt for the image generation AI that will make it generate a profile picture for one person based on the following conversation:
{prompt}
"""}],
            temperature=1.2,
            top_p=1.0
        )

        prompt = response.choices[0].message.content

        # image generation
        response = openai.images.generate(
            model="dall-e-3",  # or "dall-e-2" for the older model
            prompt=prompt,
            size="1024x1024",  # other options: "256x256", "512x512"
            quality="standard",  # or "hd" for dall-e-3
            n=1  # number of images to generate
        )
        
        # The response contains a URL to the generated image
        url = response.data[0].url
        return url
    
    except Exception as e:
        print(f"Error generating image: {str(e)}")
        return None
