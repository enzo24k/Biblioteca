import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './Inicio.js';
import VerLivros from './VerLivros.js';
import AdicionarLivro from './AdicionarLivro.js';
import EmprestarLivro from './EmprestarLivro.js';
import DevolverLivro from './DevolverLivro.js';
import RemoverLivro from './RemoverLivro.js';
import Usuarios from './Usuarios.js';
import AdicionarUsuario from './AdicionarUsuario.js';
import RemoverUsuario from './RemoverUsuario.js';
import VerUsuarios from './VerUsuarios.js';
import Emprestados from './Emprestados.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="VerLivros" component={VerLivros} />
        <Stack.Screen name="AdicionarLivro" component={AdicionarLivro} />
        <Stack.Screen name="EmprestarLivro" component={EmprestarLivro} />
        <Stack.Screen name="DevolverLivro" component={DevolverLivro} />
        <Stack.Screen name="RemoverLivro" component={RemoverLivro} />
        <Stack.Screen name="Usuarios" component={Usuarios} />
        <Stack.Screen name="Emprestados" component={Emprestados} />
        <Stack.Screen name="VerUsuarios" component={VerUsuarios} />
        <Stack.Screen name="AdicionarUsuario" component={AdicionarUsuario} />
        <Stack.Screen name="RemoverUsuario" component={RemoverUsuario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
