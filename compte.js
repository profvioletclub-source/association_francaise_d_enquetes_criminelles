// Attendre que Firebase soit prêt
document.addEventListener("DOMContentLoaded", () => {

    if (!firebase.apps.length) {
        document.getElementById("status").textContent = "Firebase non initialisé.";
        return;
    }

    const auth = firebase.auth();
    const db = firebase.firestore();

    auth.onAuthStateChanged(async (user) => {

        if (!user) {
            document.getElementById("status").textContent = "Vous devez être connecté.";
            return;
        }

        document.getElementById("status").textContent = "Connecté : " + user.email;

        const ref = db.collection("users").doc(user.uid);
        const snap = await ref.get();

        if (!snap.exists) {
            document.getElementById("status").textContent += " (aucune donnée Firestore)";
            return;
        }

        const data = snap.data();

        document.getElementById("status").textContent =
            "Connecté : " + (data.ndc || user.email);

        document.getElementById("firstName").textContent = data.firstName || "";
        document.getElementById("lastName").textContent = data.lastName || "";
        document.getElementById("middleNames").textContent = data.middleNames || "";
        document.getElementById("birthDate").textContent = data.birthDate || "";
        document.getElementById("birthPlace").textContent = data.birthPlace || "";
    });
});
