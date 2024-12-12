import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Inicio() {
  const navigation = useNavigation("");

  return (
    <View style={styles.body}>

      

      <View style={styles.menu}>

        <Text style={styles.title}>GERENCIAR USUÁRIOS</Text>

        <View style={styles.button}>
          <Button
            title="Ver usuários"
            color="black"
            onPress={() => navigation.navigate('VerUsuarios')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Adicionar usuário"
            color="black"
            onPress={() => navigation.navigate('AdicionarUsuario')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Remover usuário"
            color="black"
            onPress={() => navigation.navigate('RemoverUsuario')}
          />
        </View>  

        <View style={styles.button}>
          <Button
            title="VOLTAR"
            color="darkgreen"
            onPress={() => navigation.navigate('Inicio')}
          /> 
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  menu: {
    backgroundColor: 'rgb(0, 0, 128)',
    padding: 30,
    marginVertical: 20,
    borderRadius: 8,
    marginTop: 80,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  button: {
    marginBottom: 15,
  },
});
