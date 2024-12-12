import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import {postUser } from './api/Api';
import { useNavigation } from '@react-navigation/native';







export default function Usuarios() {
  const navigation = useNavigation("");
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [telefone, setTelefone] = useState('');






  

  const Salvar = async () => {
    if (!nome ||!telefone || !idade) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const usuario = {
      Nome: nome,
      Telefone: telefone,
      Idade: parseInt(idade),
    };






    try {
      await postUser(usuario, 'Usuarios');
      alert('Usuário adicionado com sucesso!');
      setNome('');
      setIdade('');
      setTelefone('');
    } catch (error) {
      console.error('Erro ao adicionar o usuário:', error);
      alert('Erro ao adicionar o usuário. Tente novamente.');
    }
  };







  return (
    <View style={styles.body}>




      <View style={styles.menuadd}>



        <Text style={styles.title}>ADICIONAR NOVO USUÁRIO</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do Usuário"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Idade do Usuário"
          value={idade}
          onChangeText={setIdade}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone do Usuário"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="numeric"
        />

        <View style={styles.buttonGroup}>

        <Button 
        title="Adicionar usuario" 
        color="darkgreen" 
        onPress={Salvar} 
        />

        <Button
          title="VOLTAR"
          color="black"
          onPress={() => navigation.navigate('Usuarios')}
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
  menuadd: {
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
  input: {
    height: 30,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: 'black',
  },
  buttonGroup: {
    gap: 10,
  },
});
