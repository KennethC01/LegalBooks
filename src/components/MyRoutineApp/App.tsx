import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from './src/components/CustomButton';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      //implementacion de componente personalizado
     
      <CustomButton title={'Boton Personalizado'} 
      onPress={()=>{console.log("dando tap a boton")}} />

      <CustomButton title={'Boton Generico'} 
      onPress={()=>{console.log("dando double tap a boton")}} />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
