import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { getBooks, deleteBook, deleteUnit } from './api/Api';
import { useNavigation } from '@react-navigation/native';





export default function RemoverLivros() {
  const navigation = useNavigation();
  const [id, setId] = useState('');
  const [books, setBooks] = useState([]);
  const [expandedBook, setExpandedBook] = useState(null);






  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        setBooks(response);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };

    fetchBooks();
  }, []);






  const Expand = (bookId) => {
    setExpandedBook(expandedBook === bookId ? null : bookId); // Alterna a exibição dos detalhes
  };






  const RemoverLivro = async () => {
    try {
      if (!id) {
        alert('Por favor, insira um ID de livro válido.');
        return;
      }

      await deleteBook(id);
      alert('Livro removido com sucesso!');
      setId('');

      const updatedBooks = await getBooks();
      setBooks(updatedBooks);
    } catch (error) {
      console.error('Erro ao remover livro:', error);
      alert('Erro ao remover livro!');
    }
  };






  const RemoverUnidade = async () => {
    try {
      if (!id) {
        alert('Por favor, insira um ID de livro válido.');
        return;
      }

      await deleteUnit(id);
      alert('Unidade removida com sucesso!');
      setId('');

      const updatedBooks = await getBooks();
      setBooks(updatedBooks);
    } catch (error) {
      console.error('Erro ao remover unidade:', error);
      alert('Erro ao remover unidade!');
    }
  };






  return (
    <View style={styles.body}>

      <View style={styles.menuremover}>

        <Text style={styles.title}>REMOVER LIVRO</Text>

        <ScrollView>


          {books.length > 0 ? (
            books.map((book) => (

              <View key={book.id} style={styles.bookItem}>




                <TouchableOpacity onPress={() => Expand(book.id)}>

                  <Text style={styles.bookButton}>Título do livro: {book.titulo}</Text>

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

            <Text style={styles.bookText2}>Não há livros para exibir.</Text>

          )}


        </ScrollView>






        <TextInput
          style={styles.input}
          placeholder="ID do Livro"
          value={id}
          onChangeText={setId}
          keyboardType="numeric"
        />

        <View style={styles.buttonGroup}>
          <Button 
          title="Remover Livro" 
          color="red" 
          onPress={RemoverLivro}
           />

          <Button 
          title="Remover Unidade" 
          color="orange" 
          onPress={RemoverUnidade}
           />

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
  bookItem: {
    backgroundColor: 'lightgrey',
    padding: 8,
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
    backgroundColor: 'white',
    borderRadius: 4,
  },
  bookText: {
    fontSize: 16,
    color: 'black',
  },
  bookText2: {
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
