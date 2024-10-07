import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Text, View, ImageBackground, Dimensions, Image, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal } from 'react-native';
import { initializeApp} from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { doc, getFirestore, getDoc, setDoc } from '@firebase/firestore';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const firebaseConfig = {
    apiKey: "AIzaSyC7Y3mJQ8EfFbvP9OAJ5Vb4lW5TO284_Fs",
    authDomain: "nhac-83fd2.firebaseapp.com",
    projectId: "nhac-83fd2",
    storageBucket: "nhac-83fd2.appspot.com",
    messagingSenderId: "971934815200",
    appId: "1:971934815200:web:7539262764480840bf5185",
    measurementId: "G-V5NPN7G6FP"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

export default function Conquistas({navigation}) {

    const auth = getAuth();

    const route = useRoute();
  const params = route.params;

  const userData = params.userData || params; 

  const {
        email,
        nome_r, 
        nome_usuario, 
        data_nasc_resp, 
        data_nasc_usua, 
        alergia, 
        alergia_outro, 
        comida_gosta,
        comidaFavorita_outro,
        comidasFavoritas,
        texturaFavorita_outro,
        texturasFavoritas,
        saborFavorito_outro,
        saboresFavoritos,
        comida_evita,
        comidasEvita,
        comidasEvita_outro,
        texturasEvita,
        texturasEvita_outro,
        saboresEvita,
        saboresEvita_outro,
        personagemEscolhido,
        fontSize,
        scale
  } = userData;

  const [items, setItems] = useState([0]);

  const handleScroll = ({ nativeEvent }) => {
    const isCloseToBottom = nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height - 20;
    if (isCloseToBottom) {
      setItems((prevItems) => [...prevItems, prevItems.length + 1]);
    }
  };

  const [personageEscolhido, setPersonageEscolhido] = useState(null);
  const [verModal, setVerModal] = useState(false);

  useEffect(() => {
    var imagem;
    
    switch (personagemEscolhido) {
      case 'personagem1':
        imagem = require('../img/circuloTommy.png');

        break;
      case 'personagem2':
        imagem = require('../img/circuloToby.png');

        break;
      case 'personagem3':
        imagem = require('../img/circuloBella.png');

        break;
      case 'personagem4':
        imagem = require('../img/circuloBob.png');

        break;
      case 'personagem5':
        imagem = require('../img/circuloBete.png');

        break;

      default:
        imagem = null;
    }

    setPersonageEscolhido(imagem);
  }, [personagemEscolhido]);

  const [fontsLoaded] = useFonts({
    SunBorn: require('../fonts/QuickDelight.otf'),
  });
  const [dataLoaded, setDataLoaded] = useState(false);
  const [barraProgresso, setBarraProgresso] = useState([]);
  const [conquistas, setConquistas] = useState([]);

  const Voltar = async () => {
    navigation.navigate('Tela_Home', { 
        email,
        nome_r, 
        nome_usuario, 
        data_nasc_resp, 
        data_nasc_usua, 
        alergia, 
        alergia_outro, 
        comida_gosta,
        comidaFavorita_outro,
        comidasFavoritas,
        texturaFavorita_outro,
        texturasFavoritas,
        saborFavorito_outro,
        saboresFavoritos,
        comida_evita,
        comidasEvita,
        comidasEvita_outro,
        texturasEvita,
        texturasEvita_outro,
        saboresEvita,
        saboresEvita_outro,
        personagemEscolhido,
        scale,
        fontSize});
  };

  const Perfil = async () => {
    navigation.navigate('Perfil', { 
      email,
      nome_r, 
      nome_usuario, 
      data_nasc_resp, 
      data_nasc_usua, 
      alergia, 
      alergia_outro, 
      comida_gosta,
      comidaFavorita_outro,
      comidasFavoritas,
      texturaFavorita_outro,
      texturasFavoritas,
      saborFavorito_outro,
      saboresFavoritos,
      comida_evita,
      comidasEvita,
      comidasEvita_outro,
      texturasEvita,
      texturasEvita_outro,
      saboresEvita,
      saboresEvita_outro,
      personagemEscolhido,
      scale,
      fontSize
        });
    };

    const Buscar = async () => {
      const user = auth.currentUser;
  
      const userDocRef = doc(db, 'users', user.uid);
      
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const desa = userDoc.data().desafios || {};
  
          const botao = Object.keys(desa).map(title => ({
            title,
            progress: desa[title],
          }));
          botao.sort((a, b) => b.progress - a.progress);
          

          setBarraProgresso(botao);
          const conquistas = botao.reduce((conjunto, item, conquista) => {
            if (item.progress >= 1) {
              conjunto.push(conquista);
            }
            if (item.progress < 1){
              conjunto.push((conquista) => conquista === 1);
            }
            return conjunto;
          }, []);

          setConquistas(conquistas);
        } else {
          setBarraProgresso([]);
        }
      } catch (error) {
        Alert.alert('Erro ao buscar dados do Firestore:', error.message);
      }
      };
  
      useEffect(() => {
          if (!dataLoaded) {
            Buscar();
            setDataLoaded(true);
          }
        }, [ dataLoaded]);

    const adicionar = () => {
      setVerModal(true);
    };

    const achievements = [1];
    

  return (

    
      <ImageBackground style={{ width: width , height: height+10 , top: 15, alignItems: 'center', zIndex: 1000}} source={require('../img/fundoConquistas.png')}> 

        <View style={{backgroundColor: '#9BCB3C', shadowColor: "#000", elevation: 4, height: 150, width: width, borderBottomEndRadius: 50, borderBottomStartRadius: 50, top: -25, zIndex: 1000}}>

            <View style={styles.containerPersonagem}>
                <TouchableOpacity onPress={Perfil} style={{ width: 70, zIndex: 1000,   left: 310, top: 55}}>
                {personageEscolhido && (
                <Image 
                    source={personageEscolhido} 
                    style={styles.imagemPersonagem}
                />
                )}
                </TouchableOpacity>
            </View>

           <Image source={require('../img/tituloConquistas.png')} style={{ width: 170 , height: 70  , top: -10, left: 115 }} />

           <TouchableOpacity onPress={Voltar} style={{width: 40, height: 40, top: -65, left: 35}}>
            <Image source={require('../img/voltarDesafios.png')} style={{ width: 25 , height: 28, top: 5, left: 5 }} />
          </TouchableOpacity>

        </View>
        
        <ScrollView style={{width: width,  marginTop: -25}} contentContainerStyle={{alignItems:'center'}} onScroll={handleScroll} >
          <View style={{backgroundColor: '#BAD487', shadowColor: "#000", height: 100, width: 320, borderRadius: 30, marginTop: 20, top: 5, alignItems: 'center', justifyContent: 'center'}}>

                <Text style={{color: 'white', fontSize: fontSize, width: 200, textAlign: 'center', fontFamily:'QuickDelight'}}>Ver todas as minhas conquistas!</Text>

            </View>
        {achievements.map((item, conquista) => (
          <View key={conquista} style={{alignItems: 'center',  height: height*8.75}}>
          
          <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista) && conquistas.indexOf(conquista) === 0 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {conquistas.includes(conquista+1) && conquistas.indexOf(conquista+1) === 1 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+2) && conquistas.indexOf(conquista+2) === 2 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {conquistas.includes(conquista+3) && conquistas.indexOf(conquista+3) === 3 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {conquistas.includes(conquista+4) && conquistas.indexOf(conquista+4) === 4 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>







            <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+5) && conquistas.indexOf(conquista+5) === 5 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {conquistas.includes(conquista+6) && conquistas.indexOf(conquista+6) === 6 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+7) && conquistas.indexOf(conquista+7) === 7 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {conquistas.includes(conquista+8) && conquistas.indexOf(conquista+8) === 8 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {conquistas.includes(conquista+9) && conquistas.indexOf(conquista+9) === 9 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>







            <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+10) && conquistas.indexOf(conquista+10) === 10 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {conquistas.includes(conquista+11) && conquistas.indexOf(conquista+11) === 11 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+12) && conquistas.indexOf(conquista+12) === 12 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {conquistas.includes(conquista+13) && conquistas.indexOf(conquista+13) === 13 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {conquistas.includes(conquista+14) && conquistas.indexOf(conquista+14) === 14 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>







            <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+15) && conquistas.indexOf(conquista+15) === 15 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {conquistas.includes(conquista+16) && conquistas.indexOf(conquista+16) === 16 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+17) && conquistas.indexOf(conquista+17) === 17 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {conquistas.includes(conquista+18) && conquistas.indexOf(conquista+18) === 18 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {conquistas.includes(conquista+19) && conquistas.indexOf(conquista+19) === 19 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>







            <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+20) && conquistas.indexOf(conquista+20) === 20 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {conquistas.includes(conquista+21) && conquistas.indexOf(conquista+21) === 21 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+22) && conquistas.indexOf(conquista+22) === 22 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {conquistas.includes(conquista+23) && conquistas.indexOf(conquista+23) === 23 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {conquistas.includes(conquista+24) && conquistas.indexOf(conquista+24) === 24 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>







            <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+25) && conquistas.indexOf(conquista+25) === 25 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {conquistas.includes(conquista+26) && conquistas.indexOf(conquista+26) === 26 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+27) && conquistas.indexOf(conquista+27) === 27 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {conquistas.includes(conquista+28) && conquistas.indexOf(conquista+28) === 28 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {conquistas.includes(conquista+29) && conquistas.indexOf(conquista+29) === 29 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>






          <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+30) && conquistas.indexOf(conquista+30) === 30 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {conquistas.includes(conquista+31) && conquistas.indexOf(conquista+31) === 31 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+32) && conquistas.indexOf(conquista+32) === 32 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {conquistas.includes(conquista+33) && conquistas.indexOf(conquista+33) === 33 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {conquistas.includes(conquista+34) && conquistas.indexOf(conquista+34) === 34 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>







            <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+35) && conquistas.indexOf(conquista+35) === 35 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {conquistas.includes(conquista+36) && conquistas.indexOf(conquista+36) === 36 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+37) && conquistas.indexOf(conquista+37) === 37 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {conquistas.includes(conquista+38) && conquistas.indexOf(conquista+38) === 38 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {conquistas.includes(conquista+39) && conquistas.indexOf(conquista+39) === 39 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>





            <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+40) && conquistas.indexOf(conquista+40) === 40 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {conquistas.includes(conquista+41) && conquistas.indexOf(conquista+41) === 41 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+42) && conquistas.indexOf(conquista+42) === 42 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {conquistas.includes(conquista+43) && conquistas.indexOf(conquista+43) === 43 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {conquistas.includes(conquista+44) && conquistas.indexOf(conquista+44) === 44 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>





            <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+45) && conquistas.indexOf(conquista+45) === 45 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {conquistas.includes(conquista+46) && conquistas.indexOf(conquista+46) === 46 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+47) && conquistas.indexOf(conquista+47) === 47 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {conquistas.includes(conquista+48) && conquistas.indexOf(conquista+48) === 48 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {conquistas.includes(conquista+49) && conquistas.indexOf(conquista+49) === 49 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>





            <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+50) && conquistas.indexOf(conquista+50) === 50 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {conquistas.includes(conquista+51) && conquistas.indexOf(conquista+51) === 51 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {conquistas.includes(conquista+52) && conquistas.indexOf(conquista+52) === 52 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {conquistas.includes(conquista+53) && conquistas.indexOf(conquista+53) === 53 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {conquistas.includes(conquista+54) && conquistas.indexOf(conquista+54) === 54 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>

          </View>

        ))}
        
       </ScrollView>

       <TouchableOpacity onPress={adicionar} style={{width: 160, height: 220, left:130, top:5, marginTop: -225}}>
            <Image source={require('../img/resposta.png')} style={{ width: 160 , height: 220}} />
          </TouchableOpacity>

          <Modal
              animationType="slide"
              transparent={true}
              visible={verModal}
              onRequestClose={() => setVerModal(false)}
            >
              <View style={styles.modal}>
                <View style={{backgroundColor: 'white', width: 370, alignItems: 'center', justifyContent: 'center', height: 405, borderRadius: 45}}>
                
                  <View style={{ height: 275, width: 310, borderRadius: 35, zIndex: 1000, alignItems: 'center', justifyContent:'center'}}>

                      <Text style={{ fontFamily: 'QuickDelight', fontSize: fontSize, textAlign: 'justify'}}>Essa tela é dedicada para você usuário, visualizar suas conquistas em relação a progressão da alimentação do seu filho. Na qual, ao decorrer do tempo que for marcado na aba de desafios os alimentos que foram “superados”, aparecerá um novo ícone nesta parte especial do app, mostrando que a criança melhorou em mais um nível de conquista.</Text>
                    </View>

                  <TouchableOpacity onPress={() => setVerModal(false)} style={{ width: 300, width: 200, marginTop: 20}}>
                    <View style={{backgroundColor: '#f34949', shadowColor: "#E54A4A", height: 50, width: 200, borderRadius: 20, zIndex: 1000, alignItems:'center', justifyContent:'center'}}>

                      <Text style={{ fontFamily: 'QuickDelight',  fontSize: fontSize, color:'white'}}> Fechar </Text>
                    </View>
                  </TouchableOpacity>
                    
                  </View>
              </View>
            </Modal>

      </ImageBackground>
  );
}

const styles = StyleSheet.create({
    imagemPersonagem: {
        width: 70,
        height: 70,
        zIndex: 1000
      },
      containerPersonagem: {
        zIndex: 1000,
      },
      modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
      },
});