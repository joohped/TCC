import { Text, View, StyleSheet, ImageBackground, Dimensions, Image, TouchableOpacity, Linking } from 'react-native';

const { width, height } = Dimensions.get('window');

    const Config = ({route, navigation}) => {

        const Insta = () => {
            Linking.openURL("https://www.instagram.com/nhackids._/");
          };
        const Email = () => {
            Linking.openURL("mailto:nhac.kids00@gmail.com");
        };

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
            personagemEscolhido } = route.params;

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
                personagemEscolhido});
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
      personagemEscolhido
        });
    };

  return (
    <View>
      <ImageBackground style={{ width: width + 10 , height: height+50 , top: 0 }} source={require('../img/fundo.png')}> 
        <View style={{backgroundColor: 'white', shadowColor: "#000", shadowOffset: {width: 1, height: 7}, shadowOpacity: 0.25, shadowRadius: 4, height: 150, width: 420,borderBottomEndRadius: 55, borderBottomStartRadius: 55}}>
        
        
            <TouchableOpacity onPress={Voltar} style={{ width: 40, left: 30, marginTop: 50, marginBottom: -60, top: 10 }}>
                <Image source={require('../img/voltar.png')} style={{ width: 35 , height: 35  }} />
            </TouchableOpacity>
            <Text style={{fontFamily: 'Lollypop', color: 'black', fontSize: 40, marginLeft: 25, top: 5, width: 240, textAlign: 'center', marginLeft: 100, marginBottom: -40}}>Ajustes & Configurações</Text>
          <View style={{backgroundColor: 'white', shadowColor: "#000", shadowOffset: {width: 1, height: 6}, shadowOpacity: 0.35, shadowRadius: 4, height: 193, width: 337, top: 100, borderRadius: 32, left: 35}}>

          <Image source={require('../img/titulo2.png')} style={{ width: 150 , height: 20  , top: 20, left: 30, marginBottom: 10 }} />
          <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize: 20, left: 35, marginTop: 5, zIndex: 1000, top: 22}}>Assinante do plano grátis</Text>
          <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize: 20, left: 35, marginTop: 5, zIndex: 1000, top: 38}}>Mudar de Plano ?</Text>
          <Text style={{fontFamily: 'QuickDelight', color: '#ACACAC', fontSize: 16, left: 35,marginTop: -32, zIndex: 1000, top: 70, width: 260}}>Conheça nosso plano pago e todos os beneficios que ele oferece.</Text>
          
          <View style={{backgroundColor: '#E9E9E9', height: 38, width: 300, top: -35, borderRadius: 32, left: 17}}></View>
          <View style={{backgroundColor: '#E9E9E9', height: 77, width: 300, top: -30, borderRadius: 32, left: 17}}></View>
          </View>




          <View style={{backgroundColor: 'white', shadowColor: "#000", shadowOffset: {width: 1, height: 6}, shadowOpacity: 0.35, shadowRadius: 4, height: 109, width: 337, top: 120, borderRadius: 32, left: 35}}>

          <Image source={require('../img/titulo5.png')} style={{ width: 150 , height: 20  , top: 20, left: 30 }} />
          
          <View style={{backgroundColor: '#E9E9E9', height: 38, width: 300, top: 35, borderRadius: 32, left: 17, zIndex: 100}}></View>
            <TouchableOpacity style={{ zIndex: 100, left: 25, height: 35, width: 280, paddingLeft: 5}} onPress={Perfil}>
                <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize: 20,  top: 5, zIndex: 100}}>Ver meu perfil e meus dados</Text>
            </TouchableOpacity>
          </View>





      
          <View style={{backgroundColor: 'white', shadowColor: "#000", shadowOffset: {width: 1, height: 6}, shadowOpacity: 0.35, shadowRadius: 4, height: 148, width: 337, top: 140, borderRadius: 32, left: 35}}>

          <Image source={require('../img/titulo7.png')} style={{ width: 125 , height: 20  , top: 20, left: 30 }} />

          <View style={{backgroundColor: '#E9E9E9', height: 71, width: 300, top: 40, borderRadius: 32, left: 17}}></View>
          <TouchableOpacity style={{ top: -25, width: 280, left: 25}}>
            <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize: 20, left: 10,top: -2}}>Aumentar tamanho da fonte</Text>
            <Text style={{fontFamily: 'QuickDelight', color: '#ACACAC', fontSize: 16, left: 10,top: -2, width: 280}}>Aumente o tamanho da fonte para melhor conforto</Text>
        </TouchableOpacity>
          </View>








          <View style={{backgroundColor: 'white', shadowColor: "#000", shadowOffset: {width: 1, height: 6}, shadowOpacity: 0.35, shadowRadius: 4, height: 171, width: 337, top: 160, borderRadius: 32, left: 35}}>
          
          <Image source={require('../img/titulo9.png')} style={{ width: 75 , height: 24  , top: 20, left: 30 }} />
          
            <View style={{backgroundColor: '#E9E9E9', height: 50, width: 300, top: 30, borderRadius: 32, left: 17}}></View>
            <TouchableOpacity style={{ top: -15, width: 180,  left: 30}} onPress={Email}>
                <Image source={require('../img/titulo10.png')} style={{ width: 150 , height: 37, zIndex: 1000 }} />
            </TouchableOpacity>

            <View style={{backgroundColor: '#E9E9E9', height: 50, width: 300, top: -2, borderRadius: 32, left: 17}}></View>
            <TouchableOpacity style={{ top: -45, width: 180,left: 30}} onPress={Insta}>
                <Image source={require('../img/titulo11.png')} style={{ width: 125 , height: 38,  zIndex: 1000 }} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({

});

export default Config;
