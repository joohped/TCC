import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity, Image, ScrollView, Text} from 'react-native';
import { useFonts } from 'expo-font';

export default function Tela_Home({navigation}) {
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

  const [fontsLoaded] = useFonts({
    'Lollypop': require('../fonts/Lollypop.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

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

    const Config = async () => {
      navigation.navigate('Config', { 
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

      const Diario = async () => {
        navigation.navigate('Diario', { 
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



  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white'}}>

      <View>

        <View style={{width: 450, height: 200, backgroundColor: '#F7B61A', borderRadius: 150, 
        borderTopLeftRadius: 0, borderTopRightRadius: 0, top: -60, marginLeft: -20, marginRight: 0, alignItems: "center", justifyContent: "center", flexDirection: "row", display: 'flex', zIndex: 1000}}>

        <TouchableOpacity style={{zIndex: 1000, left: 75, top: 45}} onPress={Config}>
          <Image
          style={{
            width: 35, 
            height: 20, 
            resizeMode:'contain',
            marginLeft: "auto", 
            marginRight: "auto" 
            }} 
            source={require('../img/linhas.png')}/>
        </TouchableOpacity>

          <Image
          style={{width: 130, height: 55, resizeMode:'contain', top: 50, marginLeft: "auto", marginRight: "auto", left: -20}} source={require('../img/logo.png')}/>
        </View>

        <View style={styles.containerPersonagem}>
          <TouchableOpacity onPress={Perfil} style={{ width: 70, zIndex: 1000,   marginLeft: 295, marginTop: -150,}}>
          {personageEscolhido && (
            <Image 
              source={personageEscolhido} 
              style={styles.imagemPersonagem}
            />
          )}
          </TouchableOpacity>
        </View>
        
          <Text style={{fontSize: 26, zIndex: 1000, marginTop: -60, color: 'white', marginLeft: 30, fontFamily: 'QuickDelight' }}>Olá!,</Text>
          <Text style={{fontSize: 32, zIndex: 1000, marginTop: -10, color: 'white', marginLeft: 30, fontFamily: 'Lollypop' }}>{nome_usuario}</Text>
          <Image
          style={{width: 505, height: 740, resizeMode:'contain', left: -50, top: -450}}
          source={require('../img/circulo.png')}
        />

        <Image
          style={{width: 45, height: 740, resizeMode:'contain', left: -22, top: -860}}
          source={require('../img/det1.png')}
        />
        <Image
          style={{width: 40, height: 100, resizeMode:'contain', left: 360, top: -1240}}
          source={require('../img/det2.png')}
        />
        <Image
          style={{width: 40, height: 100, resizeMode:'contain', left: 8, top: -1070}}
          source={require('../img/det2.png')}
        />
        <Image
          style={{width: 70, height: 100, resizeMode:'contain', left: -30, top: -1060}}
          source={require('../img/det3.png')}
        />
        <Image
          style={{width: 80, height: 100, resizeMode:'contain', left: 355, top: -1130}}
          source={require('../img/det4.png')}
        />


        <TouchableOpacity
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: -1859,
            shadowColor: "#000", 
            shadowOffset: {width: 10, height: 4},
            shadowOpacity: 0.25,
            shadowRadius: 4,

            borderStyle: 'solid',
            borderColor: "#FDCB53",
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderTopWidth: 0,
            borderBottomWidth: 4,
            borderRadius: 57,

            }} onPress={Diario}>

            <Image source={require('../img/botao1DA.png')} style={{width: 314,
            height: 247, borderRadius: 52,}}/>
        </TouchableOpacity>
    
  
      </View>


     
      <View style={{alignItems: "center", justifyContent: "center", flexDirection: "row", display: 'flex'}}>

          <TouchableOpacity
          style={{
            marginRight: "auto",
            marginLeft: "auto",
            marginTop: 50,

            borderStyle: 'solid',
            borderColor: "#E54A4A",
            borderRightWidth: 2,
            borderLeftWidth: 2,
            borderTopWidth: 1,
            borderBottomWidth: 4,
            borderRadius: 53,

            shadowOpacity: 0.7,
            shadowColor: "#E54A4A",
            shadowRadius: 4,
            shadowOffset: {width: 0, height: 3}
            }}>

            <Image source={require('../img/botao2D.png')} style={{width: 117,
            height: 112, borderRadius: 48,}}/>

          </TouchableOpacity>

          <TouchableOpacity
          style={{
            marginRight: "auto",
            marginLeft: "auto",
            marginTop: 50,

            borderStyle: 'solid',
            borderColor: "#9BCB3C",
            borderRightWidth: 2,
            borderLeftWidth: 2,
            borderTopWidth: 1,
            borderBottomWidth: 4,
            borderRadius: 53,

            shadowOpacity: 0.7,
            shadowColor: "#9BCB3C",
            shadowRadius: 4,
            shadowOffset: {width: 0, height: 3}
            }}> 

            <Image source={require('../img/botao3M.png')} style={{width: 117,
            height: 112, borderRadius: 48,}}/>
          </TouchableOpacity>

          <TouchableOpacity
          style={{
            marginRight: "auto",
            marginLeft: "auto",
            marginTop: 50,

            borderStyle: 'solid',
            borderColor: "#388388",
            borderRightWidth: 2,
            borderLeftWidth: 2,
            borderTopWidth: 1,
            borderBottomWidth: 4,
            borderRadius: 53,

            shadowOpacity: 0.7,
            shadowColor: "#388388",
            shadowRadius: 4,
            shadowOffset: {width: 0, height: 3}
            }}>

            <Image source={require('../img/botao4DI.png')} style={{width: 117,
            height: 112, borderRadius: 48,}}/>
          </TouchableOpacity>
      </View>

      <View style={{alignItems: "center", justifyContent: "center", flexDirection: "row", display: 'flex'}}>
        <Image source={require('../img/desafiosTi.png')} style={{width: 88, height: 25,             marginRight: "auto", marginLeft: "auto", top: 5}}/>
        <Image source={require('../img/conquistasTi.png')} style={{width: 105, height: 38,             marginRight: "auto", marginLeft: "auto", top: 5 }}/>
        <Image source={require('../img/dicasInstruTi.png')} style={{width: 95, height: 40,     marginRight: "auto", marginLeft: "auto", top: 5 }}/>
      </View>
    

      <View>
        <TouchableOpacity
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 80,
          
          borderStyle: 'solid',
          borderColor: "#7CC9BC",
          borderRightWidth: 1,
          borderLeftWidth: 1,
          borderTopWidth: 0,
          borderBottomWidth: 4,
          borderRadius: 53,

          shadowOpacity: 0.7,
          shadowColor: "#7CC9BC",
          shadowRadius: 4,
          shadowOffset: {width: 0, height: 4}
          }}>

            <Image source={require('../img/botao5VC.png')} style={{width: 314,
            height: 158, borderRadius: 52,}}/>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
          style={{
            width: 450, 
            height: 450, 
            resizeMode:'contain', 
            top: 0, 
  
            left: -25}} 
            source={require('../img/botao6J.png')}/>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  }
});