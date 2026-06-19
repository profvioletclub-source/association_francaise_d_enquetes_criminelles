// --- CONFIG FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyDglfwLWM8V_MkKp7p4SRCR4nf4jaL4a14",
  authDomain: "afec-asso.firebaseapp.com",
  projectId: "afec-asso",
  storageBucket: "afec-asso.firebasestorage.app",
  messagingSenderId: "606731063826",
  appId: "1:606731063826:web:17613fa2efd3e3badcbecb"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// --- FONCTION POUR LIRE LES PARAMÈTRES D'URL ---
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// --- PAGE DE CONNEXION ---
if (document.getElementById("login-btn")) {
    document.getElementById("login-btn").addEventListener("click", async () => {
        const identifier = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        let emailToUse = identifier;

        // Si ce n'est pas un email, on suppose que c'est un pseudo
        if (!identifier.includes("@")) {
            // Recherche du pseudo dans Firestore
            const db = firebase.firestore();
            const usersRef = db.collection("users");
            const query = await usersRef.where("pseudo", "==", identifier).get();

            if (query.empty) {
                document.getElementById("error-message").textContent = "Pseudo inconnu.";
                return;
            }

            // On récupère l'email associé
            emailToUse = query.docs[0].data().email;
        }

        // Connexion normale avec email
        auth.signInWithEmailAndPassword(emailToUse, password)
            .then(() => {
                const redirect = getQueryParam("redirect");
                window.location.href = redirect ? "/association_francaise_d_enquetes_criminelles/" + redirect : "/association_francaise_d_enquetes_criminelles/index.html";
            })
            .catch(error => {
                document.getElementById("error-message").textContent = error.message;
            });
    });
}


// --- PROTECTION DES PAGES ---
//auth.onAuthStateChanged(user => {
//    const isLoginPage = window.location.pathname.endsWith("index.html");

//    if (!user && !isLoginPage) {
//        const currentPage = window.location.pathname.replace("/Cours_USMB_Histoire_SPD/", "");
//        window.location.href = "/Cours_USMB_Histoire_SPD/index.html?redirect=" + currentPage;
//    }
//});

// --- DECONNEXION ---
if (document.getElementById("logout-btn")) {
    document.getElementById("logout-btn").addEventListener("click", () => {
        auth.signOut().then(() => {
            window.location.href = "/association_francaise_d_enquetes_criminelles/connexion.html";
        });
    });
}
