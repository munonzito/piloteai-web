import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const useEmulators = !process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID;

if (useEmulators) {
    process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
    process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";
    console.log("Using Firebase Emulators (Auth: 9099, Firestore: 8080)");
}

let firebaseApp: admin.app.App;

if (useEmulators) {
    firebaseApp = admin.initializeApp({
        projectId: "demo-piloteai"
    });
} else {
    firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID,
            privateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        })
    });
}

export const firestoreDb = getFirestore(firebaseApp);
firestoreDb.settings({ ignoreUndefinedProperties: true });
export const firebaseAuth = getAuth(firebaseApp);
