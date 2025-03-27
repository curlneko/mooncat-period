import { View, Text, StyleSheet } from 'react-native';

import { Card } from 'react-native-paper';

export default function Tab() {
    return (
        <View>
            <Card>
                <Card.Content>
                    <Text>名前</Text>
                    <Text>誕生日</Text>
                    <Text>Email</Text>
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
