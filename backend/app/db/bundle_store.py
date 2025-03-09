from firebase_admin import firestore


class BundleStore:
    _firebase_initialized = False

    def __init__(self):
        self.db = firestore.client()

    async def save_bundle(self, email, bundle):
        try:
            bundle_ref = (
                self.db.collection("users")
                .document(email)
                .collection("bundles")
                .document(bundle["title"])
            )
            bundle_data = {
                **bundle,
                "createdAt": firestore.SERVER_TIMESTAMP,
            }
            await bundle_ref.set(bundle_data, merge=True)
            print("Bundle saved:", bundle_data)
        except Exception as error:
            print("Error saving bundle:", error)

    async def save_all_bundles(self, email, bundles):
        try:
            bundle_ref = (
                self.db.collection("users").document(email).collection("bundles")
            )
            bundle_data = {}
            for bundle in bundles:
                bundle_data[bundle["title"]] = {
                    **bundle,
                    "createdAt": firestore.SERVER_TIMESTAMP,
                }
            await bundle_ref.set(bundle_data, merge=True)
            print("All bundles saved:", bundle_data)
        except Exception as error:
            print("Error saving all bundles:", error)

    async def fetch_bundle(self, email, title):
        try:
            bundle_ref = (
                self.db.collection("users")
                .document(email)
                .collection("bundles")
                .document(title)
            )
            doc = await bundle_ref.get()
            if doc.exists:
                return doc.to_dict()
            else:
                print("No such bundle!")
                return None
        except Exception as error:
            print("Error fetching bundle:", error)

    async def fetch_all_bundles(self, email):
        try:
            bundle_ref = (
                self.db.collection("users").document(email).collection("bundles")
            )
            docs = await bundle_ref.get()
            if docs:
                return {doc.id: doc.to_dict() for doc in docs}
            else:
                print("No bundles found for this user!")
                return {}
        except Exception as error:
            print("Error fetching all bundles:", error)


# Usage
# bundle_store = BundleStore()
