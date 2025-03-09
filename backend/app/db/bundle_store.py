from db.fire_core import fire_data, fire_storage


class BundleStore:

    async def save_image(self, image, storage_path, user_token=None):
        try:
            if user_token:
                fire_storage.child(storage_path).put(image, user_token)
            else:
                fire_storage.child(storage_path).put(image)
            print(f"Image uploaded to {storage_path}")
        except Exception as error:
            print("Error uploading image:", error)

    async def download_image(self, storage_path, local_file_name):
        try:
            fire_storage.child(storage_path).download(local_file_name)
            print(f"Image downloaded to {local_file_name}")
        except Exception as error:
            print("Error downloading image:", error)

    async def get_image_url(self, storage_path, user_token):
        try:
            url = fire_storage.child(storage_path).get_url(user_token)
            print(f"Image URL: {url}")
            return url
        except Exception as error:
            print("Error getting image URL:", error)
            return None

    async def delete_image(self, storage_path, user_token):
        try:
            fire_storage.child(storage_path).delete(user_token)
            print(f"Image deleted from {storage_path}")
        except Exception as error:
            print("Error deleting image:", error)

    async def save_bundle(self, email, title, bundle):
        try:
            fire_data.create_document(
                f"users/{email}/bundles/{title}",
                {
                    **bundle,
                },
            )
            print("Bundle saved:", bundle)
        except Exception as error:
            print("Error saving bundle:", error)

    async def save_all_bundles(self, email, bundles):
        try:
            for bundle in bundles:
                fire_data.create_document(
                    f"users/{email}/bundles/{bundle['title']}",
                    {**bundle},
                )
            print("All bundles saved:", bundles)
        except Exception as error:
            print("Error saving all bundles:", error)

    async def fetch_bundle(self, email, title):
        try:
            document = await fire_data.get_document(f"users/{email}/bundles/{title}")
            if document.exists:
                return document.to_dict()
            else:
                print("No such bundle!")
                return None
        except Exception as error:
            print("Error fetching bundle:", error)

    async def fetch_all_bundles(self, email):
        try:
            documents = fire_data.list_documents(f"users/{email}/bundles")
            if documents:
                return {document.id: document.to_dict() for document in documents}
            else:
                print("No bundles found for this user!")
                return {}
        except Exception as error:
            print("Error fetching all bundles:", error)


# Usage
bundle_store = BundleStore()
