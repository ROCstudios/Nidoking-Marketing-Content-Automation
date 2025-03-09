from db.fire_core import fire_data


class BundleStore:

    async def save_bundle(self, email, bundle):
        try:
            fire_data.create_document(
                f"users/{email}/bundles/{bundle['title']}",
                {
                    **bundle,
                    "createdAt": fire_data.SERVER_TIMESTAMP,
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
                    {
                        **bundle,
                        "createdAt": fire_data.SERVER_TIMESTAMP,
                    },
                )
            print("All bundles saved:", bundles)
        except Exception as error:
            print("Error saving all bundles:", error)

    async def fetch_bundle(self, email, title):
        try:
            document = fire_data.document(f"users/{email}/bundles/{title}")
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
# bundle_store = BundleStore()
