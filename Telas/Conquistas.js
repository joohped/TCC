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
  const [overlayIndexes, setOverlayIndexes] = useState([]);

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
          const overlayIndexes = botao.reduce((indexes, item, index) => {
            if (item.progress >= 1) {
              indexes.push(index);
            }
            if (item.progress < 1){
              indexes.push((index) => index === 1);
            }
            return indexes;
          }, []);

          setOverlayIndexes(overlayIndexes);
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

                <Text style={{color: 'white', fontSize: 23.5, width: 200, textAlign: 'center', fontFamily:'QuickDelight'}}>Ver todas as minhas conquistas!</Text>

            </View>
        {achievements.map((item, index) => (
          <View key={index} style={{alignItems: 'center',  height: height*8.75}}>
          
          <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index) && overlayIndexes.indexOf(index) === 0 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {overlayIndexes.includes(index+1) && overlayIndexes.indexOf(index+1) === 1 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+2) && overlayIndexes.indexOf(index+2) === 2 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {overlayIndexes.includes(index+3) && overlayIndexes.indexOf(index+3) === 3 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {overlayIndexes.includes(index+4) && overlayIndexes.indexOf(index+4) === 4 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>







            <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+5) && overlayIndexes.indexOf(index+5) === 5 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {overlayIndexes.includes(index+6) && overlayIndexes.indexOf(index+6) === 6 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+7) && overlayIndexes.indexOf(index+7) === 7 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {overlayIndexes.includes(index+8) && overlayIndexes.indexOf(index+8) === 8 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {overlayIndexes.includes(index+9) && overlayIndexes.indexOf(index+9) === 9 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>







            <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+10) && overlayIndexes.indexOf(index+10) === 10 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {overlayIndexes.includes(index+11) && overlayIndexes.indexOf(index+11) === 11 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+12) && overlayIndexes.indexOf(index+12) === 12 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {overlayIndexes.includes(index+13) && overlayIndexes.indexOf(index+13) === 13 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {overlayIndexes.includes(index+14) && overlayIndexes.indexOf(index+14) === 14 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>







            <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+15) && overlayIndexes.indexOf(index+15) === 15 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {overlayIndexes.includes(index+16) && overlayIndexes.indexOf(index+16) === 16 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+17) && overlayIndexes.indexOf(index+17) === 17 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {overlayIndexes.includes(index+18) && overlayIndexes.indexOf(index+18) === 18 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {overlayIndexes.includes(index+19) && overlayIndexes.indexOf(index+19) === 19 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>







            <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+20) && overlayIndexes.indexOf(index+20) === 20 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {overlayIndexes.includes(index+21) && overlayIndexes.indexOf(index+21) === 21 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+22) && overlayIndexes.indexOf(index+22) === 22 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {overlayIndexes.includes(index+23) && overlayIndexes.indexOf(index+23) === 23 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {overlayIndexes.includes(index+24) && overlayIndexes.indexOf(index+24) === 24 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>







            <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+25) && overlayIndexes.indexOf(index+25) === 25 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {overlayIndexes.includes(index+26) && overlayIndexes.indexOf(index+26) === 26 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+27) && overlayIndexes.indexOf(index+27) === 27 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {overlayIndexes.includes(index+28) && overlayIndexes.indexOf(index+28) === 28 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {overlayIndexes.includes(index+29) && overlayIndexes.indexOf(index+29) === 29 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>






          <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+30) && overlayIndexes.indexOf(index+30) === 30 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {overlayIndexes.includes(index+31) && overlayIndexes.indexOf(index+31) === 31 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+32) && overlayIndexes.indexOf(index+32) === 32 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {overlayIndexes.includes(index+33) && overlayIndexes.indexOf(index+33) === 33 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {overlayIndexes.includes(index+34) && overlayIndexes.indexOf(index+34) === 34 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>







            <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+35) && overlayIndexes.indexOf(index+35) === 35 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {overlayIndexes.includes(index+36) && overlayIndexes.indexOf(index+36) === 36 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+37) && overlayIndexes.indexOf(index+37) === 37 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {overlayIndexes.includes(index+38) && overlayIndexes.indexOf(index+38) === 38 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {overlayIndexes.includes(index+39) && overlayIndexes.indexOf(index+39) === 39 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>





            <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+40) && overlayIndexes.indexOf(index+40) === 40 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {overlayIndexes.includes(index+41) && overlayIndexes.indexOf(index+41) === 41 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+42) && overlayIndexes.indexOf(index+42) === 42 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {overlayIndexes.includes(index+43) && overlayIndexes.indexOf(index+43) === 43 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {overlayIndexes.includes(index+44) && overlayIndexes.indexOf(index+44) === 44 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>





            <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+45) && overlayIndexes.indexOf(index+45) === 45 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {overlayIndexes.includes(index+46) && overlayIndexes.indexOf(index+46) === 46 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+47) && overlayIndexes.indexOf(index+47) === 47 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {overlayIndexes.includes(index+48) && overlayIndexes.indexOf(index+48) === 48 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {overlayIndexes.includes(index+49) && overlayIndexes.indexOf(index+49) === 49 ? (
            <Image source={require('../img/circuloBob.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          )}
            </View>





            <View style={{ height: 125, width: 130, top: 40, left: 50, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+50) && overlayIndexes.indexOf(index+50) === 50 ? (
            <Image source={require('../img/circuloBete.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 35, left: -20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />

              {overlayIndexes.includes(index+51) && overlayIndexes.indexOf(index+51) === 51 ? (
            <Image source={require('../img/circuloBella.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -82 }} />
            )}
            </View>

            <View style={{ height: 125, width: 130, top: 32, left: 20, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista1.png')} style={{ width: 115 , height: 125  ,  }} />

              {overlayIndexes.includes(index+52) && overlayIndexes.indexOf(index+52) === 52 ? (
            <Image source={require('../img/circuloTommy.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -46, left: 2  }} />
          )}
            </View>

            <View style={{ height: 125, width: 130, top: 40, left: -35, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista3.png')} style={{ width: 110 , height: 140}} />
              {overlayIndexes.includes(index+53) && overlayIndexes.indexOf(index+53) === 53 ? (
            <Image source={require('../img/circuloToby.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          ) : (
              <Image source={require('../img/cadeado.png')} style={{ width: 50 , height: 55  , marginTop: -55, top: -64 }} />
          )}
            </View>

            <View style={{ height: 160, width: 130, top: 45, left: 30, alignItems: 'center', justifyContent: 'center'}}>

              <Image source={require('../img/conquista2.png')} style={{ width: 105 , height: 160}} />
              {overlayIndexes.includes(index+54) && overlayIndexes.indexOf(index+54) === 54 ? (
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
                <View style={{backgroundColor: 'white', width: 370, alignItems: 'center', justifyContent: 'center', height: 320, borderRadius: 50}}>
                
                  <View style={{ height: 200, width: 310, borderRadius: 35, zIndex: 1000, alignItems: 'center', justifyContent:'center'}}>

                      <Text style={{ fontFamily: 'QuickDelight', fontSize: fontSize, textAlign: 'justify'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat, commodo.</Text>
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