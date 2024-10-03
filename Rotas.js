import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './Telas/Inicio';
import Diario from './Telas/Diario';
import Desafios from './Telas/Desafios';
import Perfil from './Telas/Perfil';
import Config from './Telas/Config';
import Tela_Login from './Telas/Tela_Login';
import Tela_Cadastro1 from './Telas/Tela_Cadastro1';
import Tela_Home from './Telas/Tela_Home';
import CadastroSplash from './Telas/CadastroSplash';
import CadastroSplash1 from './Telas/CadastroSplash1';
import CadastroSplash2 from './Telas/CadastroSplash2';
import CadastroSplash3 from './Telas/CadastroSplash3';
import CadastroSplash4 from './Telas/CadastroSplash4';
import Tela_Cadastro2 from './Telas/Tela_Cadastro2';
import Tela_Cadastro3 from './Telas/Tela_Cadastro3';
import Tela_Cadastro4 from './Telas/Tela_Cadastro4';
import Tela_Cadastro5 from './Telas/Tela_Cadastro5';
import Tela_Cadastro6 from './Telas/Tela_Cadastro6';
import Tela_Cadastro7 from './Telas/Tela_Cadastro7';
import Tela_Cadastro8 from './Telas/Tela_Cadastro8';
import Tela_Cadastro9 from './Telas/Tela_Cadastro9';
import Tela_Cadastro10 from './Telas/Tela_Cadastro10';
import Tela_Cadastro11 from './Telas/Tela_Cadastro11';
import Tela_Cadastro12 from './Telas/Tela_Cadastro12';
import Personagem1 from './Telas/Personagem1';
import Personagem2 from './Telas/Personagem2';
import Personagem3 from './Telas/Personagem3';
import Personagem4 from './Telas/Personagem4';
import Personagem5 from './Telas/Personagem5';
import Tela_Alergia from './Telas/Tela_Alergia';


const Stack = createStackNavigator();

const Rotas = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CadastroSplash1" component={CadastroSplash1} options={{ headerShown: false }}/>
        <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
        <Stack.Screen name="Config" component={Config} options={{ headerShown: false }} />
        <Stack.Screen name="Diario" component={Diario} options={{ headerShown: false }} />
        <Stack.Screen name="Desafios" component={Desafios} options={{ headerShown: false }} />
        <Stack.Screen name="Tela_Login" component={Tela_Login} options={{ headerShown: false }} />
        <Stack.Screen name="Tela_Cadastro1" component={Tela_Cadastro1} options={{ headerShown: false }} />
        <Stack.Screen name="Tela_Cadastro2" component={Tela_Cadastro2} options={{ headerShown: false }}/>
        <Stack.Screen name="Tela_Cadastro3" component={Tela_Cadastro3} options={{ headerShown: false }}/>
        <Stack.Screen name="Tela_Cadastro4" component={Tela_Cadastro4} options={{ headerShown: false }}/>
        <Stack.Screen name="Tela_Cadastro5" component={Tela_Cadastro5} options={{ headerShown: false }}/>
        <Stack.Screen name="Tela_Cadastro6" component={Tela_Cadastro6} options={{ headerShown: false }}/>
        <Stack.Screen name="Tela_Cadastro7" component={Tela_Cadastro7} options={{ headerShown: false }}/>
        <Stack.Screen name="Tela_Cadastro8" component={Tela_Cadastro8} options={{ headerShown: false }}/>
        <Stack.Screen name="Tela_Cadastro9" component={Tela_Cadastro9} options={{ headerShown: false }}/>
        <Stack.Screen name="Tela_Cadastro10" component={Tela_Cadastro10} options={{ headerShown: false }}/>
        <Stack.Screen name="Tela_Cadastro11" component={Tela_Cadastro11} options={{ headerShown: false }}/>
        <Stack.Screen name="Tela_Cadastro12" component={Tela_Cadastro12} options={{ headerShown: false }}/>
        <Stack.Screen name="Personagem1" component={Personagem1} options={{ headerShown: false }}/>
        <Stack.Screen name="Personagem2" component={Personagem2} options={{ headerShown: false }}/>
        <Stack.Screen name="Personagem3" component={Personagem3} options={{ headerShown: false }}/>
        <Stack.Screen name="Personagem4" component={Personagem4} options={{ headerShown: false }}/>
        <Stack.Screen name="Personagem5" component={Personagem5} options={{ headerShown: false }}/>
        <Stack.Screen name="Tela_Alergia" component={Tela_Alergia} options={{ headerShown: false }}/>
        <Stack.Screen name="CadastroSplash" component={CadastroSplash} options={{ headerShown: false }}/>
        <Stack.Screen name="CadastroSplash2" component={CadastroSplash2} options={{ headerShown: false }}/>
        <Stack.Screen name="CadastroSplash3" component={CadastroSplash3} options={{ headerShown: false }}/>
        <Stack.Screen name="CadastroSplash4" component={CadastroSplash4} options={{ headerShown: false }}/>
        <Stack.Screen name="Tela_Home" component={Tela_Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Rotas;