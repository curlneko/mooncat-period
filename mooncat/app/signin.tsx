import { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Alert, Button } from 'react-native';
import { useRouter } from "expo-router";

import { signIn, signUp, confirmSignUp } from '@/utils/auth';
import { AuthContext } from '@/context/AuthContext';

export default function Tab() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSignInMode, setIsSignInMode] = useState<boolean>(true);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  const router = useRouter();
  const auth = useContext(AuthContext);

  // サインイン処理
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);

    await signIn(email, password)
      .then((user) => {
        auth?.setUser(user);
        router.replace("/(tabs)")
      }).catch((err) => {
        if (err.code === 'UserNotConfirmedException') {
          Alert.alert(
            'User Not Confirmed',
            'Please confirm your email before logging in.'
          );
        } else {
          Alert.alert('Login Failed', err.message || JSON.stringify(err));
        }
      }).finally(() => {
        setLoading(false);
      });
  };

  // サインアップ処理
  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    setLoading(true);

    await signUp(email, password)
      .then(() => {
        setIsConfirming(true);
      }).catch((err) => {
        Alert.alert('Sign Up Failed', err.message || JSON.stringify(err));
      }).finally(() => {
        setLoading(false);
      })
  };

  // 確認コードによるユーザー確認処理
  const handleConfirmSignUp = async () => {
    if (!confirmationCode) {
      Alert.alert('Error', 'Please enter confirmation code');
      return;
    }

    setLoading(true);

    await confirmSignUp(email, confirmationCode)
      .then(
        (user) => {
          auth?.setUser(user);
          router.replace("/(tabs)")
        }
      ).catch((err) => {
        Alert.alert('Confirm Failed', err.message || JSON.stringify(err));
      }).finally(() => {
        setLoading(false);
      });
  };

  // サインアップモードとサインインモードの切り替え
  const toggleSignUpMode = () => {
    setIsSignInMode(!isSignInMode);
    setIsConfirming(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isConfirming && (
        <TextInput
          style={styles.input}
          placeholder="Confirmation Code"
          value={confirmationCode}
          onChangeText={setConfirmationCode}
        />
      )}
      <Button
        title={loading ? 'Processing...' : isSignInMode ? 'Sign In' : isConfirming ? 'Confirm' : 'Sign Up'}
        onPress={isSignInMode ? handleSignIn : isConfirming ? handleConfirmSignUp : handleSignUp}
        disabled={loading}
      />
      <Button
        title={
          isSignInMode
            ? 'Don\'t have an account? Sign Up'
            : 'Already have an account? Login'
        }
        onPress={toggleSignUpMode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
