// ================================================================
// firebase-auth.js — Autenticação Firebase para o Lunera (compat)
// ================================================================

const firebaseConfig = {
    apiKey: "AIzaSyC98XA1fr1_yjymlteyUdLcnjrt5KXJFNI",
    authDomain: "lunera-e23dd.firebaseapp.com",
    projectId: "lunera-e23dd",
    storageBucket: "lunera-e23dd.firebasestorage.app",
    messagingSenderId: "552805623239",
    appId: "1:552805623239:web:9f62ae28e7e2a9aa2ee5e2"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db   = firebase.firestore();

window.firebaseAuth = {

    async register(email, password) {
        const cred = await auth.createUserWithEmailAndPassword(email, password);
        await db.collection('playlists').doc(cred.user.uid).set({ items: [] });
        return cred.user;
    },

    async login(email, password) {
        const cred = await auth.signInWithEmailAndPassword(email, password);
        return cred.user;
    },

    async logout() {
        await auth.signOut();
    },

    async sendPasswordReset(email) {
        await auth.sendPasswordResetEmail(email);
    },

    async loadPlaylist(uid) {
        const snap = await db.collection('playlists').doc(uid).get();
        return snap.exists ? (snap.data().items || []) : [];
    },

    async savePlaylist(uid, items) {
        await db.collection('playlists').doc(uid).set({ items }, { merge: true });
    },

    onAuthStateChanged(callback) {
        auth.onAuthStateChanged(callback);
    },

    getCurrentUser() {
        return auth.currentUser;
    }
};

console.log('[Lunera] Firebase Auth (compat) inicializado.');
