import { View, Text, StyleSheet } from 'react-native';

import { Calendar } from "react-native-calendars"

export default function Tab() {
    return (
        <View style={styles.container}>
            <Calendar />
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
