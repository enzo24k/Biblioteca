import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { putBook2, seeBooks } from './api/Api';
import { useNavigation } from '@react-navigation/native';




export default function DevolverLivro() {
  const [id, setId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [books, setBooks] = useState([]);
  const [expandedBook, setExpandedBook] = useState(null);
  const navigation = useNavigation();






  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await seeBooks();
        const borrowedBooks = response.filter(book => book.quantidadeEmprestada > 0);
        setBooks(borrowedBooks);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };




    fetchBooks();
  }, []);






  const Devolver = async () => {
    try {
      if (!id || !usuarioId) {
        alert('Por favor, insira um ID de livro e de usuário válidos.');
        return;
      }


      await putBook2(id, usuarioId);
      alert('Livro devolvido com sucesso!');
      setId('');
      setUsuarioId('');

      const updatedBooks2 = await seeBooks();
      
      const borrowedBooks = updatedBooks2.filter(book => book.quantidadeEmprestada > 0);
      setBooks(borrowedBooks);
    } catch (error) {
      console.error('Erro ao devolver livro:', error);
      alert('Erro ao devolver livro!');
    }
  };







  const Expand = (bookId) => {
    setExpandedBook(expandedBook === bookId ? null : bookId);
  };








  return (
    <View style={styles.body}>

      <View style={styles.menudevolver}>

        <Text style={styles.title}>DEVOLVER LIVRO</Text>




        <ScrollView>

          {books.length > 0 ? (
            books.map((book) => (


              <View key={book.id} style={styles.bookItem}>



                <TouchableOpacity onPress={() => Expand(book.id)}>

                  <Text style={styles.bookButton}>
                    Título: {book.titulo}
                  </Text>

                </TouchableOpacity>




                {expandedBook === book.id && (
                  <View style={styles.detalhes}>


                    <Text style={styles.bookText}>
                      ID do livro: {book.id}
                    </Text>

                    <Text style={styles.bookText}>
                      Título: {book.titulo}
                    </Text>

                    <Text style={styles.bookText}>
                      Autor: {book.autor}
                    </Text>

                    <Text style={styles.bookText}>
                      Ano: {book.ano}
                    </Text>

                    <Text style={styles.bookText}>
                      Quantidade disponível: {book.quantidade}
                    </Text>
                      
                    <Text style={styles.bookText}>
                      Quantidade emprestada: {book.quantidadeEmprestada}
                    </Text>

                    <Text style={styles.bookText}>
                      Emprestado para usuários com ID's: {book.usuariosEmprestados.join(', ')}
                    </Text>


                  </View>
                )}


              </View>
            ))

          ) : (

            <Text style={styles.bookText2}>Não há livros emprestados.</Text>
          )}

        </ScrollView>








        <TextInput
          style={styles.input}
          placeholder="ID do Livro"
          value={id}
          onChangeText={setId}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="ID do Usuário"
          value={usuarioId}
          onChangeText={setUsuarioId}
          keyboardType="numeric"
        />

        <View style={styles.buttonGroup}>
          <Button 
          title="Devolver livro" 
          color="darkgreen" 
          onPress={Devolver}
           />

          <Button 
          title="VOLTAR" 
          color="black" 
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
  menudevolver: {
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
  bookItem: {
    backgroundColor: 'white',
    padding: 12,
    marginVertical: 8,
    borderRadius: 4,
  },
  bookButton: {
    height: 15,
    fontSize: 16,
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
  bookText: {
    fontSize: 14,
    color: 'black',
  },
  bookText2: {
    fontSize: 16,
    color: 'white',
  },
  input: {
    padding: 5,
    borderColor: 'black',
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
