import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getBooks, putBook } from './api/Api';






export default function EmprestarLivro() {

  const [id, setId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [books, setBooks] = useState([]);
  const [expandedBookId, setExpandedBookId] = useState(null);






  useEffect(() => {

    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        const availableBooks = response.filter((book) => !book.Emprestado);
        setBooks(availableBooks);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };




    fetchBooks();
  }, []);







  const Expand = (bookId) => {
    setExpandedBookId((view) => (view === bookId ? null : bookId));
  };








  const Emprestar = async () => {
    try {
      if (!id || !usuarioId) {
        alert('Por favor, insira um ID de livro e de usuário válidos.');
        return;
      }

      await putBook(id, usuarioId);
      alert('Livro emprestado com sucesso!');
      setId('');
      setUsuarioId('');

      const updatedBooks = await getBooks();
      setBooks(updatedBooks);
    } catch (error) {
      console.error('Erro ao emprestar livro:', error);
      alert('Erro ao emprestar livro!');
    }
  };









  return (

    <View style={styles.body}>





      <View style={styles.menuemprestar}>

        <Text style={styles.title}>EMPRESTAR NOVO LIVRO</Text>



        <ScrollView>

          {books.length > 0 ? (
            books.map((book) => (



              <View key={book.id} style={styles.bookItem}>





                <TouchableOpacity onPress={() => Expand(book.id)}>

                  <Text style={styles.bookButton}>
                    Titulo do livro: {book.titulo}
                  </Text>

                </TouchableOpacity>




                {expandedBookId === book.id && (

                  <View style={styles.detalhes}>

                    <Text style={styles.bookText}>
                      ID do Livro: {book.id}
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
                      Emprestado para usuários com ID: {book.usuariosEmprestados.join(', ')}
                    </Text>

                  </View>
                )}

              </View>




            ))


          ) : (
            <Text style={styles.bookText2}>Não há livros disponíveis.</Text>
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
          title="Emprestar livro" 
          color="darkgreen" 
          onPress={Emprestar}
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
  menuemprestar: {
    height: 500,
    backgroundColor: 'rgb(0, 0, 128)',
    padding: 30,
    marginVertical: 20,
    borderRadius: 8,
    marginTop: 0,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookItem: {
    backgroundColor: 'white',
    padding: 6,
    marginVertical: 8,
    borderRadius: 4,
  },
  bookButton: {
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
  bookText: {
    fontSize: 14,
    color: 'black',
  },
  bookText2: {
    fontSize: 14,
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
