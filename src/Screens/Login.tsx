import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../constants/theme';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/slices/userslice';
import { useLanguage } from '../context/LanguageContext';
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
  const { language } = useLanguage();
  const dispatch = useAppDispatch();
  
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(language === 'es' ? 'Campos requeridos' : 'Required fields',language === 'es'? 'Por favor ingresa tu correo y contraseña.': 'Please enter your email and password.');     
     return;
    }
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    Alert.alert(language === 'es' ? 'Correo inválido' : 'Invalid email',language === 'es'? 'Por favor ingresa un correo electrónico válido.': 'Please enter a valid email address.');
    return;
  }
  if (password.length < 6) {
    Alert.alert(language === 'es' ? 'Contraseña inválida' : 'Invalid password',language === 'es'? 'La contraseña debe tener al menos 6 caracteres.': 'The password must be at least 6 characters long.');
    return;
  }
   const cleanEmail = email.trim();

await login(cleanEmail);

const userName = cleanEmail
  .split('@')[0]
  .replace(/[0-9]/g, '')
  .split(/[._-]/)
  .filter(Boolean)
  .map(
    part =>
      part.charAt(0).toUpperCase() +
      part.slice(1).toLowerCase()
  )
  .join(' ');

dispatch(
  setUser({
    name: userName,
    email: cleanEmail,
  })
);

console.log('Usuario almacenado en Redux:', {
  name: userName,
  email: cleanEmail,
});
  };

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
<Text style={styles.subtitle}>
  {language === 'es'
    ? 'Ingresa a tu cuenta para continuar'
    : 'Sign in to your account to continue'}
</Text>
        <View style={styles.form}>
<Text style={styles.label}>
  {language === 'es' ? 'Correo Electrónico' : 'Email'}
</Text>
          <TextInput
            style={styles.input}
placeholder={language === 'es'? 'ejemplo@correo.com': 'example@email.com'}            placeholderTextColor={GOLD_COLORS.subtext}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

            <Text style={styles.label}>{language === 'es' ? 'Contraseña' : 'Password'}
          </Text>   
         <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={GOLD_COLORS.subtext}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
           
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>{language === 'es' ? 'INICIAR SESIÓN' : 'SIGN IN'}
                </Text>
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