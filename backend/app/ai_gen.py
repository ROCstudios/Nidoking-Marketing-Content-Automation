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


# Function to simulate a conversation between two personas
def generate_seo_blog_post(
    avatar: str,
    pain_points: str,
    solutions: str,
    brand_voice: str,
):

    # Generate the response using the OpenAI API
    response = openai.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": content_system_prompt},
            {"role": "user", "content": content_seo_prompt},
            {
                "role": "user",
                "content": """
                Avatar: {avatar}
                Pain Points: {pain_points}
                Solutions: {solutions}
                Brand Voice: {brand_voice}
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
