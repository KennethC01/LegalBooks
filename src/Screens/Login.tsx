import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../constants/theme';

const GOLD_COLORS = {
  primary: '#D4AF37',
  dark: '#B8860B',
  subtext: '#665C38',
  text: '#1A1A1A',
  buttonText: '#121212',
};

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Campos requeridos', 'Por favor ingresa tu correo y contraseña.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    Alert.alert(
      'Correo inválido',
      'Por favor ingresa un correo electrónico válido.'
    );
    return;
  }
  if (password.length < 6) {
    Alert.alert(
      'Contraseña inválida',
      'La contraseña debe tener al menos 6 caracteres.'
    );
    return;
  }
    await login(email);
  };
console.log(
    Image.resolveAssetSource(require('../../assets/LegalBooks.png'))
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
  
      <View style={styles.content}>
            <Image
             source={require('../../assets/LegalBooks.png')}
              style={styles.logo}
               resizeMode="contain"
/>
        <Text style={styles.brandTitle}>LEGAL BOOKS</Text>
        <Text style={styles.subtitle}>Ingresa a tu cuenta para continuar</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="ejemplo@correo.com"
            placeholderTextColor={GOLD_COLORS.subtext}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="*******"
            placeholderTextColor={GOLD_COLORS.subtext}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 24,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: GOLD_COLORS.primary,
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 14,
    color: GOLD_COLORS.subtext,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 32,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: GOLD_COLORS.dark,
    marginBottom: 6,
  },
  input: {
    height: 48,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: GOLD_COLORS.primary,
    marginBottom: 16,
    color: GOLD_COLORS.text,
  },
  loginButton: {
    height: 48,
    backgroundColor: GOLD_COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: GOLD_COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  loginButtonText: {
    color: GOLD_COLORS.buttonText,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  logo: {
width: 120,
  height: 120,
  alignSelf: 'center',
  marginBottom: 16,
},
});

export default Login;