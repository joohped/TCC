import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const questions = [
  {
    question: "Qual é uma fruta?",
    answers: [
      { id: 1, image: require('../img/picole.png'), correct: false, width: 90, height: 110 },
      { id: 2, image: require('../img/maca.png'), correct: true, width: 100, height: 100 },
      { id: 3, image: require('../img/hamburguer.png'), correct: false, width: 110, height: 90 },
    ],
  },
  {
    question: "Qual é rico em proteína?",
    answers: [
      { id: 1, image: require('../img/frango.png'), correct: true, width: 100, height: 130 },
      { id: 2, image: require('../img/cereja.png'), correct: false, width: 100, height: 130 },
      { id: 3, image: require('../img/chocolate.png'), correct: false, width: 100, height: 130 },
    ],
  },
  {
    question: "Qual deve ser comido com moderação?",
    answers: [
      { id: 1, image: require('../img/cenoura.png'), correct: false, width: 65, height: 145 },
      { id: 2, image: require('../img/peixe.png'), correct: false, width: 120, height: 130 },
      { id: 3, image: require('../img/picole.png'), correct: true, width: 90, height: 110 },
    ],
  },
  {
    question: "Qual bebida é saudável?",
    answers: [
      { id: 1, image: require('../img/shake.png'), correct: false, width: 70, height: 135 },
      { id: 2, image: require('../img/soda.png'), correct: false, width: 70, height: 135 },
      { id: 3, image: require('../img/suco.png'), correct: true, width: 100, height: 130 },
    ],
  },
  {
    question: "Qual é o melhor lanche saudável?",
    answers: [
      { id: 1, image: require('../img/hamburguer.png'), correct: false, width: 110, height: 90 },
      { id: 2, image: require('../img/batatafrita.png'), correct: false, width: 70, height: 120 },
      { id: 3, image: require('../img/yorgut.png'), correct: true, width: 90, height: 130 },
    ],
  },
];

const Quiz = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

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


  const [fontsLoaded] = useFonts({
    'QuickDelight': require('../fonts/QuickDelight.otf'),
  });

  useEffect(() => {
    shuffleQuestions();
  }, []);

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

  const shuffleQuestions = () => {
    const shuffled = questions.map(question => ({
      ...question,
      answers: question.answers.sort(() => Math.random() - 0.5)
    }));
    setShuffledQuestions(shuffled);
  };

  const checkAnswer = (answer) => {
    setSelectedAnswer(answer.id);
    if (answer.correct) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        navigation.navigate('Result', { score: score + (answer.correct ? 1 : 0), total: shuffledQuestions.length,
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
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    shuffleQuestions();
  };

  if (!fontsLoaded) {
    return;
  }

  if (shuffledQuestions.length === 0) {
    return null;
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

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

  return (
    <View style={styles.container}>
      <ImageBackground style={{ width: width , height: height+30 , top: 0 }} source={require('../img/fundoQuiz2.png')}>

        <TouchableOpacity onPress={Voltar}>
          <Image source={require('../img/voltarQuiz.png')} style={{ width: 55 , height: 55  , top: '110%', left: 30 }} /> 
        </TouchableOpacity>

        <View style={styles.containerPersonagem}>
            <TouchableOpacity onPress={Perfil} style={{ width: 70, zIndex: 1000,   left: 310, top: 75, marginTop: -70}}>
                {personageEscolhido && (
                <Image 
                    source={personageEscolhido} 
                    style={styles.imagemPersonagem}
                />
                )}
            </TouchableOpacity>
        </View>
        
          <View style={styles.questionContainer}>
            <Text style={{ fontSize: fontSize, textAlign: 'center', fontFamily: 'QuickDelight'}}>{currentQuestion.question}</Text>
          </View>
          <View style={styles.answers}>
            {currentQuestion.answers.map((answer) => (
              <TouchableOpacity
                key={answer.id}
                onPress={() => checkAnswer(answer)}
                disabled={selectedAnswer !== null}
              >
                <View style={[
                  styles.imageBackground,
                  selectedAnswer !== null && answer.correct && styles.correct,
                  selectedAnswer !== null && !answer.correct && selectedAnswer === answer.id && styles.incorrect,
                ]}>
                  <Image source={answer.image} style={{ width: answer.width, height: answer.height }} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  questionContainer: {
    width: 370,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 60,
    marginBottom: 20,
    top: "13%",
    left: 20
  },

  answers: {
    justifyContent: 'center',
    alignItems: 'center',
    top: "15%",
  },
  imageBackground: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 159,
    height: 156,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, 
  },
  correct: {
    backgroundColor: 'lightgreen',
  },
  incorrect: {
    backgroundColor: 'red',
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

export default Quiz;