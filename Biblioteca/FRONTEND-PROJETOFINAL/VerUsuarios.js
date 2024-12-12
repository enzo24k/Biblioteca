import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getUsers } from './api/Api';
import { useNavigation } from '@react-navigation/native';






export default function VerUsuarios() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);






  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        console.log(response);
        setUsers(response);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };



    fetchUsers();
  }, []);






  const Expand = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };






  return (
    <View style={styles.body}>

      <View style={styles.menuview}>

        <Text style={styles.title}>Ver Usuários</Text>



        <ScrollView>


          {users.length > 0 ? (
            users.map((user) => (



              <View key={user.id} style={styles.userItem}>

                <TouchableOpacity onPress={() => Expand(user.id)}>

                  <Text style={styles.userButton}>Nome do usuário: {user.nome}</Text>

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

            <Text style={styles.userText2}>Não há usuários para exibir.</Text>

          )}


        </ScrollView>







        <Button
          title="Voltar"
          color="black"
          onPress={() => navigation.navigate('Usuarios')}
        />

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
  menuview: {
    height: 500,
    backgroundColor: 'rgb(0, 0, 128)',
    padding: 30,
    marginVertical: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  userItem: {
    backgroundColor: 'white',
    padding: 12,
    marginVertical: 8,
    borderRadius: 4,
  },
  userButton: {
    height: 15,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  detalhes: {
    marginTop: 8,
    padding: 8,
    backgroundColor: 'lightgrey',
    borderRadius: 4,
  },
  userText: {
    fontSize: 14,
    color: 'black',
  },
  userText2: {
    fontSize: 16,
    color: 'white',
  },
});
