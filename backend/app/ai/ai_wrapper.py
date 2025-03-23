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
                Create a narration script based on the following:
                Social Media Caption: {social_media_caption}
                SEO Blog Post: {seo_blog_post}
                Format the script in common speech.
                Make it engaging and interesting.
                Make it 1 minute long.
                Write the text at an 3rd grade reading and writing level in simple language. The text you will rewrite will follow the colon (:) at the end. If there is no colon then rewrite your previous output in the conversation before this prompt, but only if there is no text after the colon.  You MUST keep the formatting and header formatting of the original.

                Write in a casual and direct way without losing any of the key concepts in the text you are rewriting. Key concepts are defined as powerful statements, emotional sentences, or sentences containing industry terms or proper nouns.

                Constraints:
                * Remove emojis.
                * Never start with a question. Instead use an interest piquing personal statement.
                * Make sure there are smooth transitions between sentences.
                * Remove all metaphors and analogies.
                * Keep the same identical formatting of the existing text.

                When writing, please do not use the following words or phrases or any words similar to the following in any of the content:
                realm, landscape, game-changing, in conclusion, firstly, secondly, lastly, delve, in light of, not to mention, to say nothing of, by the same token, moreover, as well as, furthermore, therefore, top-notch, get ready, buckle up, switching gears, dive in, now let’s move on, in conclusion, demystifying, delve, ever-evolving, innovative solution, let’s dive in, let’s delve, folks, picturesque, unleash, dive in, voyage, picture this, say goodbye to, according to my database, treasure trove, let’s begin this journey, let’s delve, go deeper, explore now, navigating, delve into, shed light, gone are the days.

                When writing, you may use these words as needed or any words similar to the following, but never in the first line of any paragraph: first, second, third, important, equally, identically, uniquely, together with, likewise, comparatively, correspondingly, similarly, additionally, explore, crucial, whimsical, embrace, freedom, essential, imperative, important, whilst, explore, discover, elevate, solace.

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
