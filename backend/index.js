/**
 * Importation des modules nécessaires
 */
const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Autoriser les requêtes depuis n'importe quelle origine
app.use(cors());

// Autoriser les requêtes avec le corps au format JSON
app.use(express.json());

// Vérification des informations de connexion
app.post("/api/login", (req, res) => {
	const { username, password } = req.body;

	// Lecture du fichier JSON des utilisateurs
	/**
	 * NOUS SIMULONS UNE BASE DE DONNÉES AVEC UN FICHIER JSON
	 * BIEN ÉVIDEMMENT, IL FAUDRAIT UTILISER UN SYSTÈME DE GESTION DE BASE DE DONNÉES (SGBD)
	 */
	fs.readFile("users.json", "utf8", (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send(
				"Une erreur s'est produite lors de la vérification des informations de connexion."
			);
			return;
		}

		try {
			const users = JSON.parse(data);

			// Vérification des informations de connexion
			const user = users.find(
				(u) => u.username === username && u.password === password
			);

			if (user) {
				res.status(200).send("Connexion réussie !");
			} else {
				res.status(401).send(
					"Nom d'utilisateur ou mot de passe incorrect."
				);
			}
		} catch (error) {
			console.error(error);
			res.status(500).send(
				"Une erreur s'est produite lors de la vérification des informations de connexion."
			);
		}
	});
});

// Démarrage du serveur
app.listen(PORT, () => {
	console.log(`Le serveur est en écoute sur le port ${PORT}`);
});
