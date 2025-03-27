import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({
        uri: process.env.EXPO_PUBLIC_API_URL,
        headers: {
            "x-api-key": process.env.EXPO_PUBLIC_API_KEY || "",
        }
    }),
    cache: new InMemoryCache(),
});

export default client;