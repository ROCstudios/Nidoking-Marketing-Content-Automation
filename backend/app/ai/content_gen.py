from db.user_store import user_store
from db.bundle_store import bundle_store
from db.auth_store import auth_store
from ai.ai_wrapper import *
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)


async def generate_text_bundle(email, title, topic):
    try:
        brand = await user_store.fetch_brand(email)
        if not brand:
            raise ValueError("Brand data is missing or invalid.")

        social_media_caption = generate_social_media_caption(
            brand.get("avatar", ""),
            brand.get("painPoints", ""),
            brand.get("solution", ""),
            topic,
        )
        seo_blog_post = generate_seo_blog_post(
            brand.get("avatar", ""),
            brand.get("painPoints", ""),
            brand.get("solution", ""),
            topic,
        )

        movie_script = generate_movie_script(social_media_caption, seo_blog_post)
        image_prompt = generate_image_prompt(social_media_caption)
        image_url = generate_image(image_prompt)

        title = "".join(e for e in title if e.isalnum() or e.isspace()).strip()

        bundle = {
            "title": title,
            "topic": topic,
            "social_media_caption": social_media_caption,
            "seo_blog_post": seo_blog_post,
            "image": image_url,
            "movie_script": movie_script,
        }

        logging.info("🚀 ~ bundle: %s", bundle)

        await bundle_store.save_bundle(email, title, bundle)
        return bundle

    except Exception as e:
        logging.error("Error generating text bundle: %s", str(e))
        return None
