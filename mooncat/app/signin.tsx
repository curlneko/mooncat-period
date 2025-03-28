import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Button } from 'react-native';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
  ICognitoUserPoolData,
} from 'amazon-cognito-identity-js';

const UserPoolId = process.env.EXPO_PUBLIC_USERPOOL_ID || '';
const ClientId = process.env.EXPO_PUBLIC_CLIENT_ID || '';

const poolData: ICognitoUserPoolData = {
  UserPoolId,
  ClientId,
};

const userPool = new CognitoUserPool(poolData);

export default function Tab() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSignInMode, setIsSignInMode] = useState<boolean>(true);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  // サインイン処理
  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        setLoading(false);
        Alert.alert('Login Successful', 'Logged in successfully!');

        const accessToken = result.getAccessToken().getJwtToken();
        const idToken = result.getIdToken().getJwtToken();

        console.log('Access Token:', accessToken);
        console.log('ID Token:', idToken);
      },
      onFailure: (err) => {
        setLoading(false);
        console.log(err);
        if (err.code === 'UserNotConfirmedException') {

          Alert.alert(
            'User Not Confirmed',
            'Please confirm your email before logging in.'
          );
        } else {
          Alert.alert('Login Failed', err.message || JSON.stringify(err));
        }
      },
    });
  };

  // サインアップ処理
  const handleSignUp = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);

    const emailAttribute = new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    });

    const attributeList = [emailAttribute];

    userPool.signUp(email, password, attributeList, [], (err, result) => {
      setLoading(false);

      if (err) {
        Alert.alert('Sign Up Failed', err.message || JSON.stringify(err));
        return;
      }

      setIsConfirming(true);

      Alert.alert('Sign Up Successful', `User ${email} signed up!`);
      console.log(result);
    });
  };

  // 確認コードによるユーザー確認処理
  const handleConfirmSignUp = () => {
    if (!confirmationCode) {
      Alert.alert('Error', 'Please enter confirmation code');
      return;
    }

    setLoading(true);

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      setLoading(false);

      if (err) {
        Alert.alert('Confirmation Failed', err.message || JSON.stringify(err));
        return;
      }

      Alert.alert('Confirmation Successful', `User ${email} is now confirmed!`);
      console.log(result);
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
