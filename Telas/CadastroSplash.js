
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const CadastroSplash = ({ navigation, route }) => {
  const { email, password, nome_r, data_nasc, data_nasc_resp } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Tela_Cadastro2', { email, password, nome_r, data_nasc, data_nasc_resp });
    }, 3000); 

    return () => clearTimeout(timer); 
  }, [navigation, email, password, nome_r, data_nasc]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/splash_cadastro.png')} 
        style={styles.backgroundImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    marginLeft: -20,
    flex: 1,
    marginTop: 0,
    width: width+20,
    height: height+50, 
    resizeMode: 'cover', 
    justifyContent: 'center', 
  },
});

export default CadastroSplash;