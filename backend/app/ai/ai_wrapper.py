import os
import openai
from dotenv import load_dotenv
from constants.prompts import (
    content_system_prompt,
    content_seo_prompt,
    content_marketing_connections_prompt,
    image_system_prompt,
    image_prompt,
)

load_dotenv()

# Set up your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")
model = "gpt-4o-mini"


def generate_movie_script(social_media_caption, seo_blog_post):

    response = openai.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": content_system_prompt},
            {
                "role": "user",
                "content": f"""
                Create a movie script based on the following:
                Social Media Caption: {social_media_caption}
                SEO Blog Post: {seo_blog_post}
                Format the script with scenes that include a timestamp, description, and dialogue.
                Like this example  {
                    "timestamp": "00:00",
                    "description": "This is the description of the scene",    
                    "dialogue": "This is the dialogue of the scene",
                }
                """,
            },
        ],
        temperature=0.7,
        top_p=0.9,
    )

    try:
        # Get the generated script text from the response
        script = response.choices[0].message.content
        return script

    except Exception as e:
        print(f"Error generating movie script: {str(e)}")
        return None


def generate_movie_scenes(movie_script):

    response = openai.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": content_system_prompt},
            {
                "role": "user",
                "content": f"""
                Create movie scenes based on the following:
                Movie Script: {movie_script}
                Format the script with scenes that include a timestamp, description, and dialogue.
                Like this example  {
                    "timestamp": "00:00",
                    "description": "This is the description of the scene",    
                    "dialogue": "This is the dialogue of the scene",
                }
                """,
            },
        ],
        temperature=0.7,
        top_p=0.9,
    )

    try:
        # Get the generated script text from the response
        script = response.choices[0].message.content
        return script

    except Exception as e:
        print(f"Error generating movie script: {str(e)}")
        return None


def generate_social_media_caption(
    avatar: str,
    pain_points: str,
    solutions: str,
    content: str,
):
    # Generate the caption using the OpenAI API
    response = openai.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": content_system_prompt},
            {
                "role": "user",
                "content": f"""
                Avatar: {avatar}
                Pain Points: {pain_points}
                Solutions: {solutions}
                Content: {content}
                Generate a catchy Instagram/Facebook caption based on the above details.
                """,
            },
        ],
        temperature=0.7,
        top_p=0.9,
    )

    try:
        # Get the generated caption text from the response
        caption_text = response.choices[0].message.content
        return caption_text

    except Exception as e:
        print(f"Error generating social media caption: {str(e)}")
        return None


# Function to simulate a conversation between two personas
def generate_seo_blog_post(
    avatar: str,
    pain_points: str,
    solutions: str,
    content: str,
):

    # Generate the response using the OpenAI API
    response = openai.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": content_system_prompt},
            {"role": "user", "content": content_seo_prompt},
            {
                "role": "user",
                "content": f"""
                Avatar: {avatar}
                Pain Points: {pain_points}
                Solutions: {solutions}
                Topic: {content}
            """,
            },
            {"role": "user", "content": content_marketing_connections_prompt},
        ],
        temperature=0.8,
        top_p=0.9,
    )

    try:
        # Get the generated post text from the response
        post_text = response.choices[0].message.content
        return post_text

    except Exception as e:
        print(f"Error generating social post: {str(e)}")
        return None


def generate_image_prompt(prompt):
    try:
        # gpt prompt generation from prompt parameter
        response = openai.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "system",
                    "content": image_system_prompt,
                },
                {
                    "role": "user",
                    "content": image_prompt,
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            temperature=1.2,
            top_p=1.0,
        )

        prompt = response.choices[0].message.content
        return prompt

    except Exception as e:
        print(f"Error generating image prompt: {str(e)}")
        return None


def generate_image(prompt):
    try:
        # gpt prompt generation from prompt parameter
        response = openai.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "system",
                    "content": image_system_prompt,
                },
                {
                    "role": "user",
                    "content": image_prompt,
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            temperature=1.2,
            top_p=1.0,
        )

        prompt = response.choices[0].message.content

        # image generation
        response = openai.images.generate(
            model="dall-e-3",  # or "dall-e-2" for the older model
            prompt=prompt,
            size="1024x1024",  # other options: "256x256", "512x512"
            quality="standard",  # or "hd" for dall-e-3
            n=1,  # number of images to generate
        )

        # The response contains a URL to the generated image
        url = response.data[0].url
        return url

    except Exception as e:
        print(f"Error generating image: {str(e)}")
        return None
