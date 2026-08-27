import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Account = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');

  useEffect(() => {
  const loadAccountData = async () => {
    try {
      const savedName = await AsyncStorage.getItem('userName');
      const savedPhone = await AsyncStorage.getItem('userPhone');

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
      'Campos requeridos',
      'Por favor ingresa tu nombre y numero de telefono.'
    );
    return;
  }

  const phoneRegex = /^[0-9]{8}$/;

  if (!phoneRegex.test(phone.trim())) {
    Alert.alert(
      'Telefono invlido',
      'El numero de telefono debe contener 8 digitos.'
    );
    return;
  }
 try {
  await AsyncStorage.setItem('userName', name.trim());
  await AsyncStorage.setItem('userPhone', phone.trim());
} catch (error) {
  Alert.alert(
    'Error',
    'No se pudieron guardar los datos.'
  );
  return;
}

  Alert.alert(
    'Datos guardados',
    'La informacion de tu cuenta fue actualizada correctamente.'
  );
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Mi Cuenta</Text>
        
        <View style={styles.card}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
  style={styles.input}
  placeholder="Ingresa tu nombre"
  placeholderTextColor={COLORS.textSecondary}
  value={name}
  onChangeText={setName}
  autoCorrect={false}
/>

          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
  style={styles.input}
  placeholder="Ej. 98765432"
  placeholderTextColor={COLORS.textSecondary}
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
    GUARDAR DATOS
  </Text>
</TouchableOpacity>
        </View>

        {/* Botón para borrar AsyncStorage y regresar al Login */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>CERRAR SESIÓN</Text>
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
    color: '#D4AF37',
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
});

export default Account;