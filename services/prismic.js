import * as prismic from "@prismicio/client";

export function getPrismicClient(req){
    const primicConnect = prismic.createClient(process.env.PRISMIC_API_ENDPOINT, {
        req,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN
    });

    return primicConnect;
}

