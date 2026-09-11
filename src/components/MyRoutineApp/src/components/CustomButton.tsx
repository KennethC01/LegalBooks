import { Button, Text, TouchableOpacity, StyleSheet } from "react-native";
type CustomButtonProps = {
  title: string;
  onPress: () => void;
};

//definicion de componente personalizado utilizando componentes nativos
export default function CustomButton({ title, onPress }: CustomButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}> {title} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: 'navy',
        width: 150, 
        padding:12,
        borderRadius: 6,
    },
    buttonText: {
        color: 'white'
    }
})
