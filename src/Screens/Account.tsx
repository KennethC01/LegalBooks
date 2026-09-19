import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector } from '../store/hooks';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
export const Account = () => {
  const navigation = useNavigation<any>();
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');
  const reduxUser = useAppSelector((state) => state.user);
  console.log('Usuario leído desde Redux:', reduxUser);
  useEffect(() => {
  const loadAccountData = async () => {
    try {
      const savedName = await AsyncStorage.getItem(`userName_${user?.email}`);
      const savedPhone = await AsyncStorage.getItem(`userPhone_${user?.email}`);
      if (savedName) {
        setName(savedName);
      }

      if (savedPhone) {
        setPhone(savedPhone);
      }
    } catch (error) {
      console.log('Error al cargar los datos de la cuenta:', error);
    }
  };

  loadAccountData();
}, []);  
  const handleSave = async () => {
  if (!name.trim() || !phone.trim()) {
   Alert.alert(
  language === 'es' ? 'Campos requeridos' : 'Required fields',
  language === 'es'
    ? 'Por favor ingresa tu nombre y número de teléfono.'
    : 'Please enter your name and phone number.'
);
    return;
  }

  const phoneRegex = /^[0-9]{8}$/;

  if (!phoneRegex.test(phone.trim())) {
    Alert.alert(
      language === 'es' ? 'Teléfono inválido' : 'Invalid phone number',
      language === 'es'
        ? 'El número de teléfono debe contener 8 dígitos.'
        : 'The phone number must contain 8 digits.'
    );
    return;
  }
 try {
  await AsyncStorage.setItem(`userName_${user?.email}`,name.trim());
  await AsyncStorage.setItem(`userPhone_${user?.email}`,phone.trim());
} catch (error) {
  Alert.alert(
    language === 'es' ? 'Error' : 'Error',
    language === 'es'
      ? 'No se pudieron guardar los datos.'
      : 'Failed to save data.'
  );
  return;
}

  Alert.alert(
    language === 'es' ? 'Datos guardados' : 'Data saved',
    language === 'es'
      ? 'La informacion de tu cuenta fue actualizada correctamente.'
      : 'Your account information has been updated successfully.'
  );
};

  return (
    <SafeAreaView
  style={[
    styles.container,
    { backgroundColor: colors.background },
  ]}
>
      <View style={styles.content}>
        <Text
  style={[
    styles.title,
    { color: colors.primary },
  ]}
>
  {language === 'es' ? 'Mi Cuenta' : 'My Account'}
</Text>
        
       <View
  style={[
    styles.card,
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
  ]}
>
          <Text style={[
  styles.label,
  { color: colors.textSecondary },
]}>
           {language === 'es' ? 'Nombre' : 'Name'}
            </Text>
          <TextInput
  style={[
  styles.input,
  {
    backgroundColor: colors.background,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
]}
  placeholder={
  language === 'es'? 'Ingresa tu nombre': 'Enter your name'}
  placeholderTextColor={colors.textSecondary}
  value={name}
  onChangeText={setName}
  autoCorrect={false}
/>
<Text style={[
  styles.label,
  { color: colors.textSecondary },
]}>
  {language === 'es' ? 'Correo electrónico' : 'Email'}
</Text>
<Text style={[ styles.value,
  { color: colors.textPrimary },
]}>
  {reduxUser.email || user?.email || 'No disponible'}
</Text>
         <Text
  style={[
    styles.label,
    { color: colors.textSecondary },
  ]}
>
  {language === 'es' ? 'Número de teléfono' : 'Phone number'}
</Text>
          <TextInput
 style={[
  styles.input,
  {
    backgroundColor: colors.background,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
]}
  placeholder="Ej. 98765432"
  placeholderTextColor={colors.textSecondary}
  value={phone}
  onChangeText={setPhone}
  keyboardType="phone-pad"
  maxLength={8}
/>
<TouchableOpacity
  style={styles.saveButton}
  onPress={handleSave}
>
  <Text style={styles.saveButtonText}>
    {language === 'es' ? 'GUARDAR DATOS' : 'SAVE DATA'}
  </Text>
</TouchableOpacity>
        </View>
       <TouchableOpacity
  style={[
    styles.settingsButton,
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
  ]}
  onPress={() => navigation.navigate('Settings')}
>
  <Ionicons
    name="settings-outline"
    size={20}
    color={colors.primary}
  />

  <Text
  style={[
    styles.settingsButtonText,
    { color: colors.primary },
  ]}
>
    {language === 'es' ? 'CONFIGURACIÓN' : 'SETTINGS'}
  </Text>
</TouchableOpacity>
        {/* Botón para borrar AsyncStorage y regresar al Login */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
           <Text style={styles.logoutButtonText}>{language === 'es' ? 'CERRAR SESIÓN' : 'LOG OUT'}
</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 24,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#170072',
    marginBottom: 24,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: '#DC3545',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  input: {
  height: 48,
  borderWidth: 1,
  borderColor: COLORS.border,
  borderRadius: 8,
  paddingHorizontal: 12,
  marginBottom: 16,
  color: COLORS.textPrimary,
  backgroundColor: COLORS.background,
},

saveButton: {
  backgroundColor: '#D4AF37',
  height: 48,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 8,
},

saveButtonText: {
  color: '#121212',
  fontWeight: 'bold',
  fontSize: 14,
},
settingsButton: {
  backgroundColor: COLORS.surface,
  height: 48,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: COLORS.border,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  gap: 8,
  marginBottom: 12,
},

settingsButtonText: {
  color: '#170072',
  fontWeight: 'bold',
  fontSize: 14,
},
});

export default Account;