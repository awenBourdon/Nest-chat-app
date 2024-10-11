// Fonction de Remix pour créer un système de stockage basé sur les cookies
import { createCookieSessionStorage } from "@remix-run/node"; 

// Création du stockage de session
const { getSession, commitSession } = createCookieSessionStorage({
    cookie: {
        name: '__session',
        secrets: ["s3cret1"],
        sameSite: 'none',
        secure: true,
    },
});

// Récupère les données de session à partir du cookie
export const getUserToken = async ({ request }: { request: Request }) => {
    const session = await getSession(request.headers.get('Cookie'));
    return session.get('userToken');
};

// Stocke le token utilisateur dans la session
export const commitUserToken = async ({ request, userToken }: { request: Request, userToken: string }) => {
    const session = await getSession(request.headers.get('Cookie'));
    session.set('userToken', userToken);
    return await commitSession(session);
};
