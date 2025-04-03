import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    CognitoUserAttribute,
    ICognitoUserPoolData,
} from 'amazon-cognito-identity-js';

import { jwtDecode } from "jwt-decode";

const UserPoolId = process.env.EXPO_PUBLIC_USERPOOL_ID || '';
const ClientId = process.env.EXPO_PUBLIC_CLIENT_ID || '';

const poolData: ICognitoUserPoolData = {
    UserPoolId,
    ClientId,
};

const userPool = new CognitoUserPool(poolData);

export const getCurrentUserSession = (): Promise<CognitoUser | null> => {
    return new Promise((resolve, reject) => {
        const user = userPool.getCurrentUser();

        if (!user) {
            return reject(null);
        }

        user.getSession((err: any, session: any) => {
            if (err || !session?.isValid()) {
                return reject(null);
            }

            resolve(user);
        });
    });
}

export const signOut = (): Promise<void> => {
    return new Promise((resolve) => {
        const user = userPool.getCurrentUser();

        if (user) {
            user.globalSignOut(
                {
                    onSuccess: () => resolve(),
                    onFailure: () => resolve(),
                }
            );
        } else {
            resolve();
        }

        resolve();
    });
}

export const signIn = (email: string, password: string): Promise<{ user: CognitoUser; session: any, groups: string[] }> => {
    return new Promise((resolve, reject) => {
        const user = new CognitoUser({ Username: email, Pool: userPool });
        const authDetails = new AuthenticationDetails({ Username: email, Password: password });

        user.authenticateUser(authDetails, {
            onSuccess: (session) => {
                const accessToken = session.getAccessToken().getJwtToken();
                const idToken = session.getIdToken().getJwtToken();

                const decodedToken: any = jwtDecode(idToken);
                const groups: string[] = decodedToken["cognito:groups"] || [];

                console.log('Access Token:', accessToken);
                console.log('ID Token:', idToken);
                console.log('Groups:', groups);

                resolve({ user, session, groups })
            },
            onFailure: (err) => reject(err),
        });
    });
}

export const signUp = (email: string, password: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const emailAttribute = new CognitoUserAttribute({
            Name: 'email',
            Value: email,
        });

        const attributeList = [emailAttribute];

        userPool.signUp(email, password, attributeList, [], (err, result) => {
            if (err) {
                console.log(err.message || JSON.stringify(err))
                reject(err);
            }
            console.log(result);
            resolve(result);
        });
    });
}

export const confirmSignUp = (email: string, confirmationCode: string): Promise<CognitoUser> => {
    return new Promise((resolve, reject) => {
        const user = new CognitoUser({
            Username: email,
            Pool: userPool,
        });

        user.confirmRegistration(confirmationCode, true, (err, result) => {
            if (err) {
                console.log(err);
                reject();
            }

            console.log(result);
            resolve(user);
        });
    });
}