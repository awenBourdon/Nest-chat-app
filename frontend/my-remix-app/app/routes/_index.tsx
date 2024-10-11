import type { ActionFunctionArgs, MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, useLoaderData } from "@remix-run/react";
import { z } from "zod"; // Sert à valider des schémas en typescript côté front
import { commitUserToken, getUserToken } from "~/session.server";

// Validation du schéma avec Zod pour le formulaire de login
const loginSchema = z.object({
  email: z.string().email("L'email doit être valide."),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
});

// Validation du schéma pour le token renvoyé par l'API
const tokenSchema = z.object({
  access_token: z.string(),
});

// Fonction meta pour définir les métadonnées de la page
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// Loader: cette fonction se déclenche lorsque la page est chargée. Elle vérifie si l'utilisateur est déjà connecté
export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Récupération du token utilisateur via la session
  const userToken = await getUserToken({ request });
  console.log({ userToken });
  
  // Vérifie si l'utilisateur est connecté en testant la présence du token
  const isLoggedIn = Boolean(userToken);
  return json({ isLoggedIn }); // Renvoie un JSON avec l'état de connexion
}

// Action: cette fonction gère les requêtes POST, elle est déclenchée lors de la soumission du formulaire de connexion
export const action = async ({ request }: ActionFunctionArgs ) => {
  // 1. Récupération des informations du formulaire envoyé par l'utilisateur
  const formData = await request.formData();
  const jsonData = Object.fromEntries(formData); // Transforme les données du formulaire en objet JSON

  // Validation des données avec Zod
  try {
    const parsedJson = loginSchema.parse(jsonData); // Valide les données du formulaire
    console.log("Données validées :", parsedJson);

    // 2. Envoi de la requête POST à l'API de login avec les données validées
    console.log("Envoi de la requête fetch...");
    const response = await fetch("http://localhost:3000/auth/login", {
      method: 'POST',
      body: JSON.stringify(parsedJson), // Envoie les données validées au format JSON
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 3. Vérification de la réponse de l'API
    if (!response.ok) {
      console.error("Erreur lors de la requête API :", response.status, response.statusText);
      return json({ error: "Erreur d'authentification" }, { status: response.status }); // En cas d'erreur, renvoie une réponse JSON avec un message d'erreur
    }

    // Si l'API renvoie un succès, on récupère le token d'accès
    const { access_token } = tokenSchema.parse(await response.json()); // Valide la réponse API avec Zod
    console.log(access_token);

    // 4. Enregistre le token dans un cookie de session et renvoie une réponse avec l'en-tête Set-Cookie
    return json({}, {
      headers: {
        "Set-Cookie": await commitUserToken({
          request, 
          userToken: access_token, // Enregistre le token dans la session
        }),
      },
    });

  } catch (err) {
    console.error("Erreur de validation ou de requête :", err);
    return json({ error: "Données invalides ou problème avec la requête" }, { status: 400 });
  }
};


export default function Index() {
  const { isLoggedIn } = useLoaderData<typeof loader>(); // Récupère l'état de connexion depuis le loader
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1>Bienvenue</h1>
      <span>{ isLoggedIn ? "✅" : "❌" }</span>
      
      <Form method="POST" className="flex flex-col">
        <input type="email" name="email" required className="mt-5 border" placeholder="Email" />
        <br />
        <input type="password" name="password" required className="mt-5 border" placeholder="Mot de passe" />
        <button type="submit" className="mt-5 border rounded-lg">Se connecter</button>
      </Form>
    </div>
  );
}
