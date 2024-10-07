import { useState, useEffect } from 'react';
import { initializeApp} from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { doc, getFirestore, getDoc, updateDoc } from '@firebase/firestore';
import { Text, View, StyleSheet, ImageBackground, Dimensions, Image, TouchableOpacity, Linking, Alert } from 'react-native';

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


    const Config = ({route, navigation}) => {
      const auth = getAuth();

      const [fontSize, setFontSize] = useState(17);
      const [scale, setScale] = useState(1);

      const scaleMaxima = 1.28;
      const fontSizeMaxima = 23.5;
      const fontSizeMinima = 14.5;
      const scaleMinima = 0.96;

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
            deficiencia,
            deficiencia_outro,
            personagemEscolhido
             } = route.params;

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
                fontSize,
                scale});
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
            deficiencia,
            deficiencia_outro,
            personagemEscolhido,
            scale,
            fontSize
              });
          };

          const Diminuir = async () => {
            const user = auth.currentUser;
            
            setFontSize(prevSize => Math.max(prevSize - 0.5, fontSizeMinima));
            setScale(scale => Math.max(scale - 0.02, scaleMinima));

            if(user){
              try { 
              const userDocRef = doc(db, 'users', user.uid)
              await updateDoc(userDocRef,{
                fontSize,
                scale,
              });
            }catch (error) {
              Alert.alert ('Erro no aumento de fonte:', error.message);
            }
          }
      };

          const Aumentar = async () => {
            const user = auth.currentUser;

            setFontSize(prevSize => Math.min(prevSize + 0.5, fontSizeMaxima));
            setScale(scale => Math.min(scale + 0.02, scaleMaxima));

            if(user){
            try { 
            const userDocRef = doc(db, 'users', user.uid)
            await updateDoc(userDocRef,{
              fontSize,
              scale,
            });
          }catch (error) {
            Alert.alert ('Erro no aumento de fonte:', error.message);
          }
        }
            
          };

          const Info = async () => {
            
            try {
              const user = auth.currentUser;
              if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
        
                if (userDoc.exists() && userDoc.data().fontSize && userDoc.data().scale) {
                  const Tamanho = userDoc.data().fontSize;
                  const Escala = userDoc.data().scale;
        
                  if (Tamanho && Escala) {
                    const tam = Tamanho;
                    const esc = Escala;
        
                    setFontSize(tam);
                    setScale(esc);
                  }
                  if (!Tamanho && !Escala) {
                    setFontSize(17);
                    setScale(1);
                  }
                } 
              }
            } catch (error) {
              console.error("Erro ao obter diário: ", error);
              Alert.alert('Erro', 'Falha ao buscar o diário.');
            }
          };
  

useEffect(() => {
  Info();
}, []);

  return (
    <View>
      <ImageBackground style={{ width: width + 10 , height: height+50 , top: 0 }} source={require('../img/fundo.png')}> 
        <View style={{backgroundColor: 'white', shadowColor: "#000", shadowOffset: {width: 1, height: 7}, shadowOpacity: 0.25, shadowRadius: 4, height: 150, width: 420,borderBottomEndRadius: 55, borderBottomStartRadius: 55}}>
        
        
            <TouchableOpacity onPress={Voltar} style={{ width: 40, left: 30, marginTop: 50, marginBottom: -60, top: 10 }}>
                <Image source={require('../img/voltar.png')} style={{ width: 35 , height: 35  }} />
            </TouchableOpacity>
            <Text style={{fontFamily: 'Lollypop', color: 'black', fontSize: 40, marginLeft: 25, top: 5, width: 240, textAlign: 'center', marginLeft: 100, marginBottom: -40}}>Ajustes & Configurações</Text>
          <View style={{backgroundColor: 'white', shadowColor: "#000", shadowOffset: {width: 1, height: 6}, shadowOpacity: 0.35, shadowRadius: 4, height: 193, width: 337, top: 100, borderRadius: 32, left: 35}}>

          <Image source={require('../img/titulo2.png')} style={{ width: 150 , height: 20  , top: 20, left: 40, transform: [{ scale }]}} />
          
          <View style={{backgroundColor: '#E9E9E9', height: 38, width: 300, top: -40, borderRadius: 32, left: 17, marginTop: 70}}><Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize , left: 18, zIndex: 1000, top: 0, marginTop: 10}}>Assinante do plano grátis</Text></View>
          <View style={{backgroundColor: '#E9E9E9', height: 77, width: 300, top: -30, borderRadius: 32, left: 17}}>
            <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize , left: 17, marginTop: -5, zIndex: 1000, top: 10}}>Mudar de Plano ?</Text>
            <Text style={{fontFamily: 'QuickDelight', color: '#ACACAC', fontSize , left: 17,marginTop: -32, zIndex: 1000, top: 42, width: 260}}>Conheça nosso plano pago e todos os beneficios oferecidos.</Text>
          </View>
          </View>




          <View style={{backgroundColor: 'white', shadowColor: "#000", shadowOffset: {width: 1, height: 6}, shadowOpacity: 0.35, shadowRadius: 4, height: 109, width: 337, top: 120, borderRadius: 32, left: 35}}>

          <Image source={require('../img/titulo5.png')} style={{ width: 150 , height: 20  , top: 20, left: 40, transform: [{ scale }] }} />
          
          <View style={{backgroundColor: '#E9E9E9', height: 38, width: 300, top: 35, borderRadius: 32, left: 17, zIndex: 100}}></View>
            <TouchableOpacity style={{ zIndex: 100, left: 25, height: 35, width: 280, paddingLeft: 5}} onPress={Perfil}>
                <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize ,  top: 5, zIndex: 100}}>Ver meu perfil e meus dados</Text>
            </TouchableOpacity>
          </View>





      
          <View style={{backgroundColor: 'white', shadowColor: "#000", shadowOffset: {width: 1, height: 6}, shadowOpacity: 0.35, shadowRadius: 4, height: 148, width: 337, top: 140, borderRadius: 32, left: 35}}>

          <Image source={require('../img/titulo7.png')} style={{ width: 125 , height: 20  , top: 20, left: 40, transform: [{ scale }] }} />

          <View style={{backgroundColor: '#E9E9E9', height: 38, width: 300, top: 30, borderRadius: 32, left: 17}}></View>
          <TouchableOpacity style={{ top: -4, width: 290, left: 20, height: 30}} onPress={Aumentar}>
            <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize , left: 15,top: 4}}>Aumentar tamanho da fonte</Text>
        </TouchableOpacity>
        <View style={{backgroundColor: '#E9E9E9', height: 38, width: 300, top: 8, borderRadius: 32, left: 17}}></View>
        <TouchableOpacity style={{ top: -25, width: 290, left: 20, height: 30}} onPress={Diminuir}>
            <Text style={{fontFamily: 'QuickDelight', color: '#959595', fontSize , left: 15,top: 5}}>Diminuir tamanho da fonte</Text>
        </TouchableOpacity>
          </View>








          <View style={{backgroundColor: 'white', shadowColor: "#000", shadowOffset: {width: 1, height: 6}, shadowOpacity: 0.35, shadowRadius: 4, height: 171, width: 337, top: 160, borderRadius: 32, left: 35}}>
          
          <Image source={require('../img/titulo9.png')} style={{ width: 75 , height: 24  , top: 20, left: 40, transform: [{ scale }] }} />
          
            <View style={{backgroundColor: '#E9E9E9', height: 50, width: 300, top: 30, borderRadius: 32, left: 17}}></View>
            <TouchableOpacity style={{ top: -15, width: 180,  left: 55}} onPress={Email}>
                <Image source={require('../img/titulo10.png')} style={{ width: 150 , height: 37, zIndex: 1000, transform: [{ scale }]}} />
            </TouchableOpacity>

            <View style={{backgroundColor: '#E9E9E9', height: 50, width: 300, top: -2, borderRadius: 32, left: 17}}></View>
            <TouchableOpacity style={{ top: -48, width: 180,left: 45}} onPress={Insta}>
                <Image source={require('../img/titulo11.png')} style={{ width: 125 , height: 38,  zIndex: 1000, transform: [{ scale }] }} />
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
