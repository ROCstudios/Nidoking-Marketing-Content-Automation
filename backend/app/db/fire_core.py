import empyrebase
import firebase_admin
from firebase_admin import credentials

cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred)

config = {
    "apiKey": "AIzaSyADudOoSNeTRFvoT98xeYGHhzsbSpRnqE0",
    "authDomain": "test-nidoking-marketing.firebaseapp.com",
    "projectId": "test-nidoking-marketing",
    "storageBucket": "test-nidoking-marketing.firebasestorage.app",
    "messagingSenderId": "575940079994",
    "appId": "1:575940079994:web:2ae9e2ea3b85ee694326c3",
    "measurementId": "G-LZHK7QVJZT",
    "databaseURL": "https://test-nidoking-marketing-default-rtdb.firebaseio.com",
}

firebase = empyrebase.initialize_app(config)

fire_data = firebase.firestore()

fire_storage = firebase.storage()
