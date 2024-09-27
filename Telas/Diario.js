import React, { useState, useRef, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Text, View, StyleSheet, ImageBackground, Dimensions, Image, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import Checkbox from 'expo-checkbox';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import { useFonts } from 'expo-font';
import 'moment/locale/pt';
moment.locale('pt');

const { width, height } = Dimensions.get('window');

const Diario = ({ navigation }) => {

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

  const [comidaDia, setComidaDia] = useState({
    nao_Comi: false,
    comi_Pouco: false,
    comi_Bem: false,
    comi_Tudo: false
  });
  const [comidaTarde, setComidaTarde] = useState({
    nao_Comi: false,
    comi_Pouco: false,
    comi_Bem: false,
    comi_Tudo: false
  });

  const comiDSelecionados = (comi) => {
    setComidaDia(prevState => ({ ...prevState, [comi]: !prevState[comi] }));
  };
  const comiTSelecionados = (comi) => {
    setComidaTarde(prevState => ({ ...prevState, [comi]: !prevState[comi] }));
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

  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const weeks = React.useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week');
    return [-1, 0, 1].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');
        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  const [fontsLoaded] = useFonts({
    'Lollypop': require('../fonts/Lollypop.otf'),
    'QuickDelight': require('../fonts/QuickDelight.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

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
  <View style={styles.container}>
    <ImageBackground source={require('../img/Gradient.png')} style={{width: width, top: 380, height: height,}}>
      <View style={{backgroundColor: '#F7B61A', shadowColor: "black",  elevation: 4, height: 170, width: width,borderBottomEndRadius: 60, borderBottomStartRadius: 60, top: -30}}>
        <TouchableOpacity style={{ width: 32, height: 32, top: 95, left: 40}} onPress={Voltar}>
          <Image source={require('../img/voltar4.png')} style={{ width: 20, height: 24, top: 4, left: 5 }} />
        </TouchableOpacity >
        
          <Image source={require('../img/diario.png')} style={{ width: 140, height: 58   , top: 55, left: 130 }} />
        
        </View>
        <TouchableOpacity style={{ width: 62, height: 58   , top: 25, left: 350}}>
          <Image source={require('../img/desafios.png')} style={{ width: 62, height: 58  }} />
        </TouchableOpacity>
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: -50, marginBottom: -85, }}>
          {personageEscolhido && (
            <Image 
              source={personageEscolhido} 
              style={{width: 120, height: 120, borderWidth: 4, borderColor: '#F69343', borderRadius: 60}}
            />
          )}
          <View style={{justifyContent: 'center', alignItems: 'center', width: 130, height: 30, backgroundColor: '#F69343', marginTop: -15, borderRadius: 20 }}>
            <Text style={{fontSize: fontSize, color: 'white', fontFamily: 'QuickDelight'}}>{nome_usuario}</Text>
          </View>
        </View>
        <Image source={require('../img/fundo_diario.png')} style={{width: width, height: 520, top: 164}}/>
        <View style={{backgroundColor: '#ffffff', elevation: 8,
    shadowColor: '#F69343', height: 425, width: 330,borderRadius: 20, top: -294, left: 40, alignItems: 'center'}}>
        

    <Text style={{fontSize: fontSize, textAlign: 'center', top: 20, zIndex: 100, fontFamily: 'QuickDelight'}}>Refeição do dia:
    </Text>
    <View style={{backgroundColor: '#F1F0F0', width: 280, height: 125, top: 30, borderRadius:  10}}>
            <Text style={{fontFamily: 'QuickDelight', fontSize: fontSize, color: '#F7B61A', marginLeft: 20, marginTop: 2, maxHeight: 26 }}>Café da manhã</Text>
    {Object.keys(comidaDia).map(comi => (
            
            <TouchableOpacity
            key={comi}
            style={styles.containerCheckBox}
            onPress={() => comiDSelecionados(comi)}
          >
              <Checkbox
                value={comidaDia[comi]}
                onValueChange={() => comiDSelecionados(comi)}
                color={comidaDia[comi] ? '#00FF00' : '#FF0000'}
              />
              <Text style={{ color: '#5C5C5C', fontFamily: 'QuickDelight', marginLeft: 10, fontSize: fontSize, maxHeight: 22}}>
                {comi.charAt(0).toUpperCase() + comi.slice(1).replace('_', ' ')}
              </Text>
          </TouchableOpacity>
          ))}
    </View>
    <View style={{backgroundColor: '#F1F0F0', width: 280, height: 125, top: 50, borderRadius:  10}}>
            <Text style={{fontFamily: 'QuickDelight', fontSize: fontSize, color: '#F7B61A', marginLeft: 20, marginTop: 2, maxHeight: 26 }}>Almoço</Text>
    {Object.keys(comidaTarde).map(comi => (
            
            <TouchableOpacity
            key={comi}
            style={styles.containerCheckBox}
            onPress={() => comiTSelecionados(comi)}
          >
              <Checkbox
                value={comidaTarde[comi]}
                onValueChange={() => comiTSelecionados(comi)}
                color={comidaTarde[comi] ? '#00FF00' : '#FF0000'}
              />
              <Text style={{ color: '#5C5C5C', fontFamily: 'QuickDelight', marginLeft: 10, fontSize: fontSize, maxHeight: 22}}>
                {comi.charAt(0).toUpperCase() + comi.slice(1).replace('_', ' ')}
              </Text>
          </TouchableOpacity>
          ))}
    </View>

    <TouchableOpacity style={{backgroundColor: '#F1F0F0', width: 280, height: 45, top: 75, borderRadius:  20, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('../img/Mais.png')} style={{width: 18, height: 10}}/>
    </TouchableOpacity>

        </View>
        
    </ImageBackground >
    

      <View style={styles.container2}>
        <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={ind => {
              if (ind === 1.5) {
                return;
              }
              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, 'week').toDate());
                swiper.current.scrollTo(1, true);
              }, 10);
            }}>
            {weeks.map((dates, index) => (
              <View style={styles.itemRow} key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setValue(item.date)}>
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: '#F69343',
                          },
                        ]}>
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && { color: '#fff' },
                          ]}>
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && { color: '#fff' },
                          ]}>
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    justifyContent: 'center',
    backgroundColor: '#fffff',
  },
  container2: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    top: -30
  },
    picker: {
    flex: 1,
    top: -120,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#F69343',
    borderRadius: 15,
    marginLeft: 0,
    width: 345,
  },

  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 35,
    marginLeft: -30,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F1F0F0',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 45,
  },
  itemWeekday: {
    fontSize: 12,
    fontWeight: '500',
    color: '#F69343',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
  containerCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    marginTop: -1,
    marginLeft: 20,
  },
});

export default Diario;
