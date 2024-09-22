import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions, Image, TouchableOpacity, Modal } from 'react-native';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');



 const Perfil = ({route, navigation}) => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModal2, setMostrarModal2] = useState(false);
    const [mostrarModal3, setMostrarModal3] = useState(false);

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
        scale,
        fontSize } = route.params;

    const [fontsLoaded] = useFonts({
        'Lollypop': require('../fonts/Lollypop.otf'),
        'QuickDelight': require('../fonts/QuickDelight.otf')
      });
    
      if (!fontsLoaded) {
        return null;
      }

      const [personageEscolhido, setPersonageEscolhido] = useState(null);
      const [nome, setNome] = useState(null);
      const [alergias, setAlergias] = useState(null);

      useEffect(() => {
        if (alergia != 'não tem') {
          setAlergias('tem alergia a');
        }
        if (alergia === 'não tem') {
          setAlergias('não tem');
        }

        var imagem;
        var nome_p;
        
        switch (personagemEscolhido) {
          case 'personagem1':
            imagem = require('../img/circuloTommy.png');
            nome_p = 'Tommy Tomate';
    
            break;
          case 'personagem2':
            imagem = require('../img/circuloToby.png');
            nome_p = 'Toby Cenoura';
    
            break;
          case 'personagem3':
            imagem = require('../img/circuloBella.png');
            nome_p = 'Bella Brócolis';
    
            break;
          case 'personagem4':
            imagem = require('../img/circuloBob.png');
            nome_p = 'Bob Banana';
    
            break;
          case 'personagem5':
            imagem = require('../img/circuloBete.png');
            nome_p = 'Bete Abacate';
    
            break;
    
          default:
            imagem = null;
            nome_p = null;
        }
        setPersonageEscolhido(imagem);
        setNome(nome_p);
      }, [personagemEscolhido]);

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
      

  return (
    <View>
      <ImageBackground style={{ width: width+10 , height: height+50 , top: 0 }} source={require('../img/fundo2.png')}> 
        <View style={{backgroundColor: 'white', shadowColor: "#000", shadowOffset: {width: 1, height: 5}, shadowOpacity: 0.30, shadowRadius: 15, height: 190, width: 420,borderBottomEndRadius: 400, borderBottomStartRadius: 400}}>
            <TouchableOpacity onPress={Voltar} style={{ width: 50, top: 60, left: 50, height: 50}}>
                <Image source={require('../img/voltar2.png')} style={{ width: 35 , height: 35, left: 5, top: 5 }} />
            </TouchableOpacity>
            <View style={{     
              backgroundColor: '#F69343',   
              marginTop: 80,
              width: 105,
              height: 110,
              borderStyle: 'solid',
              borderColor: "#F69343",
              borderRightWidth: 2,
              borderLeftWidth: 2,
              borderTopWidth: 1,
              borderBottomWidth: 5,
              borderRadius: 57,
              resizeMode: 'contain',
              marginLeft: 280,
              zIndex: 1000,
              position: 'absolute'}}>
                {personageEscolhido && (
                    <Image 
                    source={personageEscolhido} 
                    style={styles.imagemPersonagem}
                    />
                )}
                
            </View>

            <Text style={{fontFamily: 'Lollypop', color: '#F69343', fontSize: 32, textAlign: 'right', marginTop: 40, marginRight: 150}}>{nome_usuario}</Text>
                <Text style={{fontFamily: 'QuickDelight', color: 'black', fontSize: 25,textAlign: 'right', marginRight: 150, top: -4}} >{nome}</Text>
        </View>


        <View style={{backgroundColor: 'white', shadowColor: "#000", shadowOffset: {width: 1, height: 6}, shadowOpacity: 0.35, shadowRadius: 4, height: 360, width: 347, top: 40, borderRadius: 55, left: 35}}>

          <Image source={require('../img/titulo12.png')} style={{ width: 180 , height: 35  , top: 20, left: 25 }} />
          
          <View style={{backgroundColor: '#F5F5F5', height: 53, width: 300, top: 30, borderRadius: 32, left: 25}}>
            
            <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize, marginLeft: 25, marginTop: 5}}>Data de Nascimento:</Text>
            <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize,marginLeft: 25}}>{data_nasc_usua}</Text>
          </View>

          <View style={{backgroundColor: '#F5F5F5', height: 53, width: 300, top: 35, borderRadius: 32, left: 25}}>
            
            <TouchableOpacity onPress={() => setMostrarModal3(true)}>
                <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize, marginLeft: 25, marginTop: 5}}>Alergias:</Text>
                <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize,marginLeft: 25}}>{alergias}...    veja mais</Text>
            </TouchableOpacity>
          </View>

          <Modal
                animationType="slide"
                transparent={true}
                visible={mostrarModal3}
                onRequestClose={() => setMostrarModal3(false)}
            >
                <View style={styles.modal}>
                    <View style={styles.dentroModal}>
                        <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize, marginTop: 5, marginBottom: 20}}>{alergia},{alergia_outro}</Text>
                        <TouchableOpacity onPress={() => setMostrarModal3(false)} style={styles.fechar}><Text style={{fontFamily: 'QuickDelight', color: 'white', fontSize: 20, textAlign: 'center', marginTop: 20, marginBottom: 20, height: 20}}>Fechar</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>

          <View style={{backgroundColor: '#F5F5F5', height: 53, width: 300, top: 40, borderRadius: 32, left: 25}}>
            
          <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize, marginLeft: 25, marginTop: 5}}>PcD</Text>
          <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize,marginLeft: 25}}>Não</Text>
            
          </View>

          <View style={{backgroundColor: '#F5F5F5', height: 53, width: 300, top: 45, borderRadius: 32, left: 25}}>
          <TouchableOpacity onPress={() => setMostrarModal2(true)}>
                <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize, marginLeft: 25, marginTop: 5}}>Gosto de comer:</Text>
                <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize,marginLeft: 25}}>{comida_gosta}...    veja mais</Text>
            </TouchableOpacity>
          </View>

          <Modal
                animationType="slide"
                transparent={true}
                visible={mostrarModal2}
                onRequestClose={() => setMostrarModal2(false)}
            >
                <View style={styles.modal}>
                    <View style={styles.dentroModal}>
                        <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize, marginTop: 5, marginBottom: 20}}>{comidasFavoritas},{comidaFavorita_outro}</Text>
                        <TouchableOpacity onPress={() => setMostrarModal2(false)} style={styles.fechar}><Text style={{fontFamily: 'QuickDelight', color: 'white', fontSize: 20, textAlign: 'center', marginTop: 20, marginBottom: 20, height: 20}}>Fechar</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>

          <View style={{backgroundColor: '#F5F5F5', height: 53, width: 300, top: 50, borderRadius: 32, left: 25}}>

          <TouchableOpacity onPress={() => setMostrarModal(true)}>
            <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize, marginLeft: 25, marginTop: 5}}>Evito:</Text>
            <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize,marginLeft: 25}}>{comida_evita} ...    veja mais</Text>
          </TouchableOpacity>
          </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={mostrarModal}
                onRequestClose={() => setMostrarModal(false)}
            >
                <View style={styles.modal}>
                    <View style={styles.dentroModal}>
                        <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize,  marginTop: 5, marginBottom: 20}}>{comidasEvita},{comidasEvita_outro}</Text>
                        <TouchableOpacity onPress={() => setMostrarModal(false)} style={styles.fechar}><Text style={{fontFamily: 'QuickDelight', color: 'white', fontSize: 20, textAlign: 'center', marginTop: 20, marginBottom: 20, height: 20}}>Fechar</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>


          <View style={{backgroundColor: 'white', shadowColor: "#000", shadowOffset: {width: 1, height: 6}, shadowOpacity: 0.35, shadowRadius: 4, height: 245, width: 346, top: 70, borderRadius: 55, left: 35}}>

            <Image source={require('../img/titulo18.png')} style={{ width: 200 , height: 35  , top: 20, left: 25 }} />
          
            <View style={{backgroundColor: '#F5F5F5', height: 53, width: 300, top: 30, borderRadius: 32, left: 25}}>
              
                <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize, marginLeft: 25, marginTop: 5}}>Nome:</Text>
                <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize,marginLeft: 25}}>{nome_r}</Text>
              
            </View>
            <View style={{backgroundColor: '#F5F5F5', height: 53, width: 300, top: 35, borderRadius: 32, left: 25}}>
              
            <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize, marginLeft: 25, marginTop: 5}}>Email:</Text>
            <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize,marginLeft: 25}}>{email}</Text>
              
            </View>

            <View style={{backgroundColor: '#F5F5F5', height: 53, width: 300, top: 40, borderRadius: 32, left: 25}}>
              
            <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize, marginLeft: 25, marginTop: 5}}>Data de Nascimento:</Text>
            <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize,marginLeft: 25}}>{data_nasc_resp}</Text>
              
            </View>

          </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    modal: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dentroModal: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    fechar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E54A4A',
        borderRadius: 20,
        width: 100,
        height: 45
    },
    imagemPersonagem: {
      width: 101,
      height: 101,
      left: -1,
      top: 1
      },
});

export default Perfil;