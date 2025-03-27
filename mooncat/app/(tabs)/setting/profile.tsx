import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { Card } from 'react-native-paper';

import { useQuery } from '@apollo/client';
import { GET_USER } from '@/src/queries/getUser';

const userId = process.env.EXPO_PUBLIC_USER_ID

console.log("URL:"+process.env.EXPO_PUBLIC_API_URL)

export default function Tab() {
    const { data, loading, error } = useQuery(GET_USER, {
        variables: {
            id: userId
        }
    })

    if (loading) return <ActivityIndicator size="large" />;
    if (error) return <Text>{error.message}</Text>;

    const user = data.getMoonCatUser;

    return (
        <View>
            <Card>
                <Card.Content>
                    <Text>{user.name}</Text>
                    <Text>{user.birthday}</Text>
                    <Text>{user.email}</Text>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
