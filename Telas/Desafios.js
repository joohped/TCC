import React, { useState,useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Text, View, ImageBackground, Dimensions, Image, TouchableOpacity, ScrollView, Modal, TextInput, StyleSheet, Alert } from 'react-native';
import { initializeApp} from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { doc, getFirestore, getDoc, setDoc } from '@firebase/firestore';
import { useFonts } from 'expo-font';
import { ProgressBar } from 'react-native-paper';

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

export default function Desafios({ navigation }) {

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
        deficiencia,
        deficiencia_outro,
        personagemEscolhido,
        fontSize,
        scale
  } = userData;

  const [barraProgresso, setBarraProgresso] = useState([]);
  const [concluidos, setConcluidos] = useState([]);
  const [bgColor, setBgColor] = useState('#F6F6F6');
  const [bgColor2, setBgColor2] = useState('red');
  const [view, setView] = useState(0);
  const [verModal, setVerModal] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);


    const [fontsLoaded] = useFonts({
    SunBorn: require('../fonts/QuickDelight.otf'),
  });

  const adicionar = () => {
    setVerModal(true);
  };

  const adicionarBarraProgresso = (index) => {

    if(titulo === ''){
      Alert.alert('Não deixe vazio', ' escreva algum alimento na caixa de texto');
      return;
    }

    const existeTitulo = barraProgresso.some(item => item.title === titulo);
    if (existeTitulo) {
        Alert.alert('Alimento já utilizado anteriormente', 'Esse alimento já foi adicionado, tente outro semelhante.');
        return;
    }

    const value = 0;

    const user = auth.currentUser;

      if (user) {
          try {
              const userDocRef = doc(db, 'users', user.uid);
              const desafios = {
                  [titulo]: value, 
              };
              setDoc(userDocRef, { desafios }, { merge: true });
          } catch (error) {
              Alert.alert('Erro ao enviar o desafio para o Firestore:', error.message);
          }
        }

      setBarraProgresso([...barraProgresso, { progress: value, title: titulo }]);
      setTitulo('');
      setView(view+100);
      setVerModal(false);
    };

  const aumentarProgresso = (index) => {
    const barraProgressoNova = [...barraProgresso];

    if (barraProgressoNova[index].progress < 1) {
      barraProgressoNova[index].progress += 0.20; 

      setConcluidos(anteriores => {
    const existentes = anteriores.find(item => item.title === barraProgressoNova[index].title);

    if (existentes) {

      return anteriores.map(item =>
        item.title === barraProgressoNova[index].title
          ? { ...item, progress: barraProgressoNova[index].progress }
          : item
      );
      

    } else {
      return [...anteriores, { title: barraProgressoNova[index].title, progress: barraProgressoNova[index].progress }];
    }

    
  });
  const user = auth.currentUser;

    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        setDoc(userDocRef, {
          desafios: {
            [barraProgressoNova[index].title]: barraProgressoNova[index].progress,
          }
        }, { merge: true });
      } catch (error) {
        Alert.alert('Erro ao enviar o desafio para o Firestore:', error.message);
      }
    }


      
    }
    if (barraProgressoNova[index].progress === 1) {
      Alert.alert('Parabéns por completar um desafio! !','E conseguir uma nova conquista, clique no emblema de medalha, ao lado do Tommy Tomate, e veja a nova conquista desbloqueada');
    }


    setBarraProgresso(barraProgressoNova);
    

    if (barraProgressoNova[index].progress < 1) {
      setBgColor('#f6f6f6');
      setBgColor2('red');


    }
  };

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
        deficiencia,
        deficiencia_outro,
        personagemEscolhido,
        scale,
        fontSize});
  };

  const Conq = async () => {
    navigation.navigate('Conquistas', { 
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
        deficiencia,
        deficiencia_outro,
        personagemEscolhido,
        scale,
        fontSize});
  };

  const [personageEscolhido, setPersonageEscolhido] = useState(null);

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
      deficiencia,
      deficiencia_outro,
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
        setBarraProgresso(botao);
        
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

  return (

    
      <ImageBackground style={{ width: width , height: height , top: 0 }} source={require('../img/fundoDesafios.png')}> 

        <View style={{backgroundColor: '#E54A4A', shadowColor: "#000", shadowRadius: 4, elevation: 5, height: 150, width: width+5, borderBottomEndRadius: 55, borderBottomStartRadius: 55}}>

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

           <Image source={require('../img/tituloDesafios.png')} style={{ width: 170 , height: 50  , top: -10, left: 115 }} />

           <TouchableOpacity onPress={Voltar} style={{width: 40, height: 40, top: -50, left: 35}}>
            <Image source={require('../img/voltarDesafios.png')} style={{ width: 25 , height: 30, top: 5, left: 5}} />
          </TouchableOpacity>

        </View>



        <View style={{backgroundColor: '#fff', shadowColor: "#000", shadowRadius: 4, height: 700, width: 420, borderTopEndRadius: 55, borderTopStartRadius: 55, top: 190, }}>


        <TouchableOpacity style={{zIndex: 100, height: 42, width: 62, left: 360, top: -165}} onPress={Conq}>
          <View style={{backgroundColor: '#E54A4A', shadowColor: "#000", shadowOffset: {width: 1, height: 10}, shadowOpacity: 0.38, shadowRadius: 4, height: 42, width: 62,  zIndex: 1000, borderRadius: 13}}>
          
            <Image source={require('../img/emblema.png')} style={{ width: 24 , height: 26, top: 7, left: 9 }} />
          
          </View>
        </TouchableOpacity>
        <View style={{alignItems:'center', height: 100}}>
          <Text style={{ color: 'white', top: -180, left: 50, marginRight: 250, fontFamily: 'QuickDelight', fontSize: fontSize, textAlign: 'left' }}> Acompanhe aqui todos os nossos desafios a serem superados. </Text>
        </View>
          <Image source={require('../img/detalhe4Desafios.png')} style={{ width: 165 , height: 170, top: -300, left: 229,}} />

          <Image source={require('../img/detalhe1Desafios.png')} style={{ width: 65 , height: 35, top: -205, left: -25 }} />
          <Image source={require('../img/detalhe3Desafios.png')} style={{ width: 80 , height: 80, top: 135, left: 335 }} />
          <Image source={require('../img/detalhe2Desafios.png')} style={{ width: 40 , height: 40, top: -35, left: -5 }} />

            
              <View style={{ height: 510,top: -430, alignItems: 'center'}}>
              <ScrollView style={{  height: 1000, zIndex: 1000}} showsVerticalScrollIndicator={false} >
            
                <TouchableOpacity onPress={adicionar} style={{ width: 325, marginBottom: 40}}>
                  <View style={{backgroundColor: '#D9D9D9', shadowColor: "#E54A4A", shadowOffset: {width: 1, height: 5}, shadowOpacity: 1, shadowRadius: 4, height: 76, width: 325, borderRadius: 35, zIndex: 1000, alignItems:'center', justifyContent:'center'}}>

                      <Text style={{ fontFamily: 'QuickDelight', right: 5, fontSize: fontSize}}> Adicionar </Text>
                    </View>
                  </TouchableOpacity>

              
              

                {barraProgresso .sort((a, b) => a.progress - b.progress) .map((item, index) => (
                  <View key={item.title} style={{bottom: 15, width: 330}}>
              <TouchableOpacity  onPress={() => aumentarProgresso(index)} 
              style={[styles.progressoContendo, barraProgresso[index].progress >= 1, { 
                backgroundColor: barraProgresso[index].progress >= 1 ? 'lightgreen' : bgColor,
                shadowColor: barraProgresso[index].progress >= 1 ? 'green' : bgColor2}]} disabled={barraProgresso[index].progress >= 1 }>
                
                    <Text style={{left: 20, top: 5, width: 290, marginBottom: 5, color: 'black', fontFamily: 'QuickDelight', fontSize: fontSize}}>{item.title}</Text>

                {barraProgresso[index].progress >= 1 ? (
        <Text style={{fontSize: fontSize, top: 0, left: 20, color: 'white', fontFamily: 'QuickDelight'}}>Concluído</Text>
      ) : (
                  <ProgressBar progress={item.progress} style={styles.barraProgresso} color={bgColor2} disabled={barraProgresso[index].progress >= 1}/>
                )}

              </TouchableOpacity>
              </View>
            ))}

            <Modal
              animationType="slide"
              transparent={true}
              visible={verModal}
              onRequestClose={() => setVerModal(false)}
            >
              <View style={styles.modal}>
                <View style={{backgroundColor: 'white', width: 370, alignItems: 'center', justifyContent: 'center', height: 320, borderRadius: 50}}>
                <Text style={styles.tituloModal}>Adicionar Progresso</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Informe o alimento/desafio"
                  placeholderTextColor={'lightgray'}
                  value={titulo}
                  onChangeText={setTitulo}
                  maxLength={55}
                />
                <TouchableOpacity onPress={adicionarBarraProgresso} style={{ width: 300, marginBottom: 20, left: -10}}>
                  <View style={{backgroundColor: '#4df489', shadowColor: "#E54A4A", height: 65, width: 325, borderRadius: 35, zIndex: 1000, alignItems: 'center', justifyContent:'center'}}>

                      <Text style={{ fontFamily: 'QuickDelight', fontSize: fontSize, color: 'white'}}> Adicionar </Text>
                    </View>
                    
                  </TouchableOpacity>
                <TouchableOpacity onPress={() => setVerModal(false)} style={{ width: 300, left: -10}}>
                  <View style={{backgroundColor: '#f34949', shadowColor: "#E54A4A", height: 65, width: 325, borderRadius: 35, zIndex: 1000, alignItems:'center', justifyContent:'center'}}>

                      <Text style={{ fontFamily: 'QuickDelight',  fontSize: fontSize, color:'white'}}> Cancelar </Text>
                    </View>
                  </TouchableOpacity>
                  </View>
              </View>
            </Modal>
            </ScrollView>
            </View>
        </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  progressoContendo: {
    width: 320,
    backgroundColor: 'black',
    height: 100,
    borderRadius: 30,
    top: 0,
    left: 5,
    textAlign: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: 'red',
    elevation: 3,
    zIndex: 100
  },
  barraProgresso: {
    backgroundColor: 'white',
    top: 10,
    width: 280,
    left: 20,
    height: 4,
    borderRadius: 10,
  },
  tituloProgresso: {
    left: 20,
    width: 290,
    marginBottom: 5,
    color: 'black',
    fontFamily: 'QuickDelight',
    whiteSpace: 'nowrap',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  tituloModal: {
    fontSize: 20,
    marginBottom: 50,
    color: 'black',
  },
  input: {
    color: 'black',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    fontFamily: 'QuickDelight',
    fontSize: 20,
    borderWidth: 1,
    width: 320,
    marginBottom: 20,
    whiteSpace: 'nowrap',
    paddingHorizontal: 10,
    marginTop: -30,
  },
  imagemPersonagem: {
    width: 70,
    height: 70,
    zIndex: 1000
  },
  containerPersonagem: {
    zIndex: 1000,
  }
});

