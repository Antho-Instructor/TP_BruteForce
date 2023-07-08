const FORM = document.getElementById("login-form");

FORM.addEventListener("submit", async function (e) {
	e.preventDefault(); // Empêche l'envoi du formulaire par défaut

	// Récupérer les valeurs des champs
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	const API = "http://localhost:3000/api/login";

	try {
		// Appeler l'API pour vérifier les informations de connexion
		const response = await fetch(API, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		});

		if (response.ok) {
			const data = await response.text(); // Récupère la réponse sous forme de texte
			document.getElementById("login-message").innerHTML = `${data} Bienvenue !`;
		} else {
			throw new Error(
				"Mauvaise combinaison nom d'utilisateur/mot de passe."
			);
		}
	} catch (error) {
		document.getElementById("login-message").innerHTML =
			"Oups, " + error.message;
	}
});
