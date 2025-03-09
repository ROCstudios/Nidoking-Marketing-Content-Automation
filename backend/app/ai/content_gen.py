from db.user_store import user_store
from db.bundle_store import bundle_store
from db.auth_store import auth_store
from ai.ai_wrapper import *


async def generate_text_bundle(email, title, topic):
    brand = await user_store.fetch_brand(email)
    social_media_caption = generate_social_media_caption(
        brand["avatar"], brand["painPoints"], brand["solution"], topic
    )
    seo_blog_post = generate_seo_blog_post(
        brand["avatar"], brand["painPoints"], brand["solution"], topic
    )

    image_prompt = generate_image_prompt(social_media_caption)

    image_url = generate_image(image_prompt)

    title = "".join(e for e in title if e.isalnum() or e.isspace()).strip()

    await bundle_store.save_bundle(
        email,
        title,
        {
            "title": title,
            "topic": topic,
            "social_media_caption": social_media_caption,
            "seo_blog_post": seo_blog_post,
            "image": image_url,
        },
    )
    return {
        "social_media_caption": social_media_caption,
        "seo_blog_post": seo_blog_post,
        "image_url": image_url,
    }
