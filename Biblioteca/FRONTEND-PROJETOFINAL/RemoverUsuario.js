import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { getUsers, deleteUser } from './api/Api';
import { useNavigation } from '@react-navigation/native';






export default function RemoverUsuarios() {
  const navigation = useNavigation();
  const [id, setId] = useState('');
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);






  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);






  const RemoverUsuario = async () => {
    try {
      if (!id) {
        alert('Por favor, insira um ID de usuário válido.');
        return;
      }
  
      await deleteUser(id);
      alert('Usuário removido com sucesso!');
      setId('');
  
      const updateUsers = await getUsers();
      setUsers(updateUsers);
  
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      alert('Erro ao remover usuário!');
    }
  };






  const Expand = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };






  return (

    <View style={styles.body}>

      <View style={styles.menuremover}>

        <Text style={styles.title}>REMOVER USUARIO</Text>




        <ScrollView>


          {users.length > 0 ? (
            users.map((user) => (


              <View key={user.id} style={styles.userItem}>




                <TouchableOpacity onPress={() => Expand(user.id)}>

                  <Text style={styles.userButton}>
                    Nome do usuário: {user.nome}
                  </Text>

                </TouchableOpacity>





                {expandedUser === user.id && (
                  <View style={styles.detalhes}>

                    <Text style={styles.userText}>
                      ID do usuário: {user.id}
                    </Text>

                    <Text style={styles.userText}>
                      Nome: {user.nome}
                    </Text>

                    <Text style={styles.userText}>
                      Telefone: {user.telefone}
                    </Text>

                    <Text style={styles.userText}>
                      Idade: {user.idade}
                    </Text>

                  </View>

                )}

              </View>

            ))

          ) : (

            <Text style={styles.userText2}>Não há usuários para remover.</Text>

          )}


        </ScrollView>






        <TextInput
          style={styles.input}
          placeholder="ID do Usuário"
          value={id}
          onChangeText={setId}
          keyboardType="numeric"
        />


        <View style={styles.buttonGroup}>
          <Button 
          title="Remover usuário" 
          color="red" 
          onPress={RemoverUsuario}
           />

          <Button 
          title="Voltar" 
          color="darkgreen" 
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
    backgroundColor: 'rgb(0, 0, 128)',
    padding: 16,
  },
  menuremover: {
    height: 500,
    backgroundColor: 'black',
    padding: 30,
    marginVertical: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  userItem: {
    backgroundColor: 'lightgrey',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  userButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  detalhes: {
    marginTop: 8,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  userText: {
    fontSize: 16,
    color: 'black',
  },
  userText2: {
    fontSize: 16,
    color: 'white',
  },
  input: {
    padding: 5,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 8,
    color: 'black',
    borderRadius: 4,
  },
  buttonGroup: {
    gap: 10,
  },
});
