from db.user_store import UserStore
from db.bundle_store import BundleStore
from ai.ai_wrapper import *

user_store = UserStore()
bundle_store = BundleStore()


async def generate_text_bundle(email, title, topic):
    brand = await user_store.fetch_brand(email)
    social_media_caption = generate_social_media_caption(
        brand["avatar"], brand["painPoints"], brand["solution"], topic
    )
    seo_blog_post = generate_seo_blog_post(
        brand["avatar"], brand["painPoints"], brand["solution"], topic
    )
    title = "".join(e for e in title if e.isalnum() or e.isspace()).strip()
    await bundle_store.save_bundle(
        email,
        title,
        {
            "title": title,
            "topic": topic,
            "social_media_caption": social_media_caption,
            "seo_blog_post": seo_blog_post,
        },
    )
    return {
        "social_media_caption": social_media_caption,
        "seo_blog_post": seo_blog_post,
    }
