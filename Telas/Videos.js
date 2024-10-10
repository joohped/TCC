import React, { useState, useRef, useEffect } from 'react';
import { Text, View, ImageBackground, Dimensions, Image, TouchableOpacity, FlatList, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Modal, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Video, Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');

const thumbnails = [
  { 
    id: '1', 
    src: require('../img/video1TBN.png'), 
    alt: 'Bolinho de Tapioca', 
    keywords: [
      'receita', 
      'com', 
      'de',
      'tapioca', 
      'bolinho', 
      'salgado',
      'saudável',
      'fácil',
      'comida',
      'atum',
      'batata'], 
    videoSrc: require('../img/video1.mp4'),
    ingredients: [
      '100 g de batata-doce cozida e amassada ', 
      '1 ovo ', 
      '1 colher (sopa) de requeijão ', 
      '2 colheres (sopa) cheias de atum ralado', 
      '1 xícara (chá) de queijo mozarela ralado', 
      '6 colheres (sopa) de goma para tapioca hidratada', 
      'Meia xícara (chá) de aveia em flocos finos', 
      '1 pitada de sal', 
      '1 pitada de orégano', 
      '1 colher (chá) de fermento em pó'],
    steps: [
      '1. Em um recipiente, coloque todos os ingredientes e misture bem. ',
      '2. Distribua em forminhas individuais previamente untadas com manteiga.',
      '3. Leve para assar em forno médio (180 °C), preaquecido, por 25 minutos.',
      '4. Deixe esfriar por 5 minutos e sirva.',
      'Dica de chef: use forminhas de silicone para assar os bolinhos. Assim fica mais fácil de desenformar.'
    ]
  },

  { 
    id: '2', 
    src: require('../img/video1TBN.png'), 
    alt: 'Muffin de Omelete com Vegetais', 
    keywords: [
      'receita', 
      'com', 
      'de', 
      'ovo', 
      'vegetal', 
      'verdura',
      'vegetais',
      'salgado',
      'verduras',
      'comida',
      'muffin',
      'saudável'], 
    videoSrc: require('../img/video1.mp4'),
    ingredients: [
      '1 folha de couve (com talo) bem picada', 
      '½ xícara (chá) de brócolis bem picado', 
      '1 tomate médio (sem sementes) picado', 
      '½ xícara (chá) de milho-verde cozido', 
      '5 ovos', 
      '1 colher (chá) de sal', 
      '½ colher (chá) de orégano', 
      '4 colheres (sopa) de leite integral', 
      '½ colher (chá) de fermento em pó'],
    steps: [
      'Em uma tigela grande, misture a couve, o brócolis, o tomate e o milho. Unte 6 forminhas para empada com azeite e distribua a mistura. Reserve. Na mesma tigela, misture o restante dos ingredientes e bata bem até ficar homogêneo. Derrame a mistura por cima dos vegetais nas forminhas. Leve para assar em forno preaquecido por 25 minutos ou até os bolinhos ficarem dourados e firmes. Sirva ainda quente.',
      'Dica: Para deixar essa receita ainda mais prática, você pode picar os vegetais na noite anterior e deixá-los reservados na geladeira.'
    ]
  },

  { 
    id: '3', 
    src: require('../img/video1TBN.png'), 
    alt: 'Panqueca Arco-Íris sem Glúten Vegana', 
    keywords: [
      'receita', 
      'com', 
      'de', 
      'panqueca', 
      'sem glúten', 
      'vegano',
      'vegana',
      'colorido',
      'arco íris',
      'banana',
      'saudável',
      'leite de amêndoas',
      'farinha de arroz',
      'morango',
      'aveia',
      'doce'], 
    videoSrc: require('../img/video1.mp4'),
    ingredients: [
      '2 colheres de sopa de aveia em flocos (sem glúten)', 
      '2 bananas-prata amassadas', 
      '½ xícara de chá de leite de amêndoas', 
      '2 colheres de sopa de farinha de arroz', 
      '2 colheres de sopa de leite de coco em pó', 
      '1 colher de sopa de cacau em pó ', 
      '3 colheres de chá de adoçante ', 
      'Corante alimentício (opcional) ', 
      '6 morangos médios '],

    steps: [
      '1. Em uma tigela, coloque as bananas amassadas, a aveia, 1 colher de chá de adoçante, a farinha de arroz, o leite de coco em pó e o leite vegetal.',
      '2. Separe essa mistura em porções. ',
      '3. Utilize duas gotas do corante alimentício em cada pequena porção para colorir as panquecas. ',
      '4. Reserve uma das porções e adicione o cacau em pó. ',
      '5. Unte uma pequena frigideira e coloque uma porção da massa. Utilize o fogo baixo e vire-as assim que ficarem levemente douradas. ',
      '6. Repita o mesmo processo para o restante da massa. ',
      '7. Para a calda, leve os morangos com o restante do adoçante em fogo médio. Misture bem. ',
      '8. Derrame a calda por cima das panquecas e sirva. Bom apetite.'
    ]
  },

  { 
    id: '4', 
    src: require('../img/video1TBN.png'), 
    alt: 'Paçoca Fit', 
    keywords: [
      'receita', 
      'com', 
      'de', 
      'paçoca', 
      'fitness', 
      'fit',
      'doce',
      'amendoim',
      'baunilha',
      'saudável',
      'fácil',
      ], 
    videoSrc: require('../img/video1.mp4'),
    ingredients: [
      '1 xícara de amendoim torrado sem sal e sem casca', 
      '75g de pasta de amendoim', 
      '4 colheres de sopa de Xylitol ou outro substituto de açúcar de fonte natural', 
      '1 pitada de sal', 
      '1 scoop de Vanilla Whey ou outra proteína sabor baunilha', 
    ],
    steps: [
      '1.	Coloque todos os ingredientes, com exceção do Vanilla Whey, no processador e processe',
      '2.	Depois acrescente o Vanilla Whey e processe novamente. ',
      '3.	É importante que fique com a textura parecida com uma farofa e não com uma massa. ',
      '4.	Utilize um molde para fazer as paçocas, tire do molde e pronto!'
    ]
  },

  { 
    id: '5', 
    src: require('../img/video1TBN.png'), 
    alt: 'Leão de Fruta', 
    keywords: [
      'receita', 
      'com', 
      'de', 
      'laranja', 
      'banana', 
      'uva',
      'morango',
      'maçã',
      'cereal de milho',
      'fruta',
      'frutas',
      'divertido',
      'prato',
      'saudável',
      'fácil',
      'vegano'
      ],
    videoSrc: require('../img/video1.mp4'),
    ingredients: [
      'Laranja', 
      'Banana', 
      'Uvas roxas ou verdes', 
      'Morango', 
      'Maçã', 
      'Cereal de milho sem açúcar', 
    ],
    steps: [
      'Corte uma rodela de laranja para ser o rosto e coloque duas fatias de banana sob a laranja para criar as orelhinhas. Use uvas roxas para fazer os olhos, um morango para o nariz e também uvinhas cortadinhas para a boca. Já nos bigodes, você pode usar lâminas fininhas de maçã e para a juba alguns cereais de milho sem açúcar.',
      'Outra opção é deixar os elementos à disposição das crianças e pedir para que elas criem os próprios animais com as frutas e vegetais. Divertido, não?',
    ]
  },

  { 
    id: '6', 
    src: require('../img/video1TBN.png'), 
    alt: 'Pão Colorido ', 
    keywords: [
      'receita', 
      'com', 
      'de', 
      'pão', 
      'colorido', 
      'beterraba',
      'cenoura',
      'espinafre',
      'divertido',
      'saudável',
      'salgado',
      ],
    videoSrc: require('../img/video1.mp4'),
    ingredients: [
      '1 xícara de beterraba cozida', 
      '1 xícara de cenoura', 
      '1 xícara de folhas de espinafre', 
      '1 colher de sopa de açúcar, para cada massa', 
      '1 colher de café de sal, para cada massa', 
      '1 colher de sopa de óleo, para cada massa', 
      '1 colher de chá fermento biológico seco, para cada massa', 
      'O que bastar de água', 
      'O que bastar de farinha de trigo', 

    ],
    steps: [
      '1. Bata, no liquidificador, individualmente a beterraba cozida com 1/2 xícara de água. Reserve.',
      '2. Em seguida, no liquidificador, bate apenas a cenoura com 1/2 xícara de água. Reserve.',
      '3. Por fim, coloque o espinafre com 1/2 xícara de água, separadamente, e bata. Reserve.',

      'Em cada massa faça o seguinte processo:',
      '5. Misture o açúcar, sal e óleo.',
      '6. Adicione o fermento e misture.',
      '7. Acrescente a farinha de trigo aos poucos até a massa ficar macia e soltar das mãos.',
      '8. Sove por 7 minutos.',
      '9. Deixe descansar coberta por 40 minutos.',
      '10. Sove novamente e divida cada massa em 2 partes iguais.',
    ],
    steps2: [
      '1. Para a montagem tipo rocambole, abra cada massa individualmente, com o auxílio de um rolo, mas sem afinar muito a massa.',
      '2. Enrole como rocambole.',
      '3. Coloque em uma forma e espere crescer até dobrar de tamanho.',
      '4. Para a montagem como trança, faça um rolo, maior que a forma, com cada massa.',
      '5. Una as pontas e faça uma trança.',
      '6. Dobre as pontas para baixo.',
      '7. Coloque em uma forma e deixe crescer até dobrar de volume.',
      '8. Asse em um forno a 180°C por 30 minutos.',
      '9. Tudo pronto, agora é só servir! Bom apetite.',
    ]
  },

  { 
    id: '7', 
    src: require('../img/video1TBN.png'), 
    alt: 'Pão de Queijo de Inhame ', 
    keywords: [
      'receita', 
      'com', 
      'de', 
      'pão', 
      'queijo', 
      'inhame',
      'salgado',
      'saudável',
      'fácil',
      ],
    videoSrc: require('../img/video1.mp4'),
    ingredients: [
      '1 + 1/2 xícara de polvilho doce', 
      '1 xícara de polvilho azedo', 
      '100 g de queijo minhas padrão', 
      'Sal a gosto', 
      '1/2 xícara de óleo', 
      '1/2 xícara de água', 
      '2 inhames cozidos e amassados como um purê', 
      '1 colher (sopa) de chia', 
    ],
    steps: [
      '1.	Em uma tigela, misture o polvilho doce, o polvilho azedo, o queijo, o sal e o óleo.',
      '2.	Misture bem. ',
      '3.	Adicione a água, o purê de inhame e a chia.',
      '4.	Misture bem até formar uma massa homogênea. ',
      '5.	Faça bolinhas com a massa. ',
      '6.	Coloque-as em uma forma untada com óleo.',
      '7.	Leve ao forno preaquecido (200° C) por cerca de 30 minutos',
    ]
  },

  { 
    id: '8', 
    src: require('../img/video1TBN.png'), 
    alt: 'Pizza na Frigideira ', 
    keywords: [
      'receita', 
      'com', 
      'de', 
      'pizza', 
      'na', 
      'frigideira',
      'divertido',
      'fácil',
      'salgado',
      ],
    videoSrc: require('../img/video1.mp4'),
    ingredients: [
      '2 e 1/2 xícaras de farinha de trigo', 
      '1 colher de manteiga', 
      '1 colher pequena de sal', 
      '1 copo de leite morno', 
    ],
    steps: [
      '1.	Misture tudo em uma travessa com as mãos.',
      '2.	Caso não encontre o ponto certo, adicione mais farinha até desgrudar a massa das mãos.',
      '3.	Separar 4 bolinhas de massa. Abra-as separadamente na frigideira.',
      '4.	Asse somente um lado até o ponto desejado. Vire a massa.',
      '5.	Desligue o fogo.',
      '6.	Coloque molho de tomate.',
      '7.	Cubra o molho com muçarela, rodelas de tomate e orégano.',
      '8.	Asse agora o outro lado.',
    ]
  },

  { 
    id: '9', 
    src: require('../img/video1TBN.png'), 
    alt: 'Biscoito PassaTempo ', 
    keywords: [
      'receita', 
      'com', 
      'de', 
      'biscoito', 
      'bolacha', 
      'passatempo',
      'baunilha',
      'doce',
      'fácil',
      ],
    videoSrc: require('../img/video1.mp4'),
    ingredients: [
      '3⁄4 de xícara de farinha de aveia', 
      '1⁄4 de xícara de leite em pó', 
      '2 colheres de sopa de farinha de arroz', 
      '2 colheres de sopa de açúcar demerara', 
      '2 colheres de sopa de manteiga derretida', 
      '10 gotas de extrato de baunilha', 
      '2 colheres de sopa de água', 
    ],
    steps: [
      '1.	Em uma tigela coloque todos os ingredientes, menos a água.',
      '2.	Misture bem e adicione a água.',
      '3.	A massa deve soltar das suas mãos para estar no ponto certo.',
      '4.	Abra a massa com a ajuda de um rolo em uma superfície enfarinhada.',
      '5.	Corte pequenos retângulos e coloque em uma assadeira untada.',
      '6.	Asse em forno preaquecido a 180 °C por 10 a 15 minutos.',
      '7.	Agora é só servir! Bom apetite',
    ]
  },

  { 
    id: '10', 
    src: require('../img/video1TBN.png'), 
    alt: 'Pipoca Doce Fit ', 
    keywords: [
      'receita', 
      'com', 
      'de', 
      'pipoca', 
      'doce', 
      'fitness',
      'fit',
      'milho',
      'saudável',
      'fácil',
      ],
    videoSrc: require('../img/video1.mp4'),
    ingredients: [
      '3 colheres de sopa de milho de pipoca', 
      '3 scoops de Carbolift ou outro substituto de açúcar de fonte natural', 
      '1 sachê de Sweetlift ou outro substituto de açúcar de fonte natural', 
    ],
    steps: [
      '1.	É só preparar a pipoca no microondas',
      '2.	Depois é só levar o Carbolift e o Sweetlift ao fogo até caramelizar e misturar os dois! ',
    ]
  },

];

const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export default function Videos({ navigation }) {
  const route = useRoute();

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
    scale,
    fontSize } = route.params;

  const [search, setSearch] = useState('');
  const [filteredThumbnails, setFilteredThumbnails] = useState(thumbnails);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  const [fontsLoaded] = useFonts({
    SunBorn: require('../fonts/QuickDelight.otf'),
    Lollypop: require('../fonts/Lollypop.otf'),
    Retrograde: require('../fonts/Retrograde.ttf'),
  });

  const updateSearch = (search) => {
    const normalizedSearch = normalizeText(search);
    setSearch(search);
    const searchWords = normalizedSearch.split(' ');

    const filtered = thumbnails.filter(thumbnail =>
      searchWords.every(word =>
        thumbnail.keywords.some(keyword => normalizeText(keyword).includes(word))
      )
    );
    setFilteredThumbnails(filtered);
  };

  const clearSearch = () => {
    setSearch('');
    setFilteredThumbnails(thumbnails);
  };

const openModal = async (video) => {
  setSelectedVideo(video);
  setModalVisible(true);
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: false, 
      playThroughEarpieceAndroid: false,
    });
  } catch (error) {
    console.error("Error setting audio mode:", error);
  }
};


useEffect(() => {
  if (!modalVisible) {
    if (selectedVideo) {
      selectedVideo.pause();
      console.log("Video paused automatically");
    }
  }
}, [modalVisible]);

const handleCloseModal = () => {
  setModalVisible(false);
};


  const closeModal = () => {
    setModalVisible(false);
    setSelectedVideo(null);
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

  return (
    
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <ImageBackground style={{ width: width, height: height+25, top: 0 }} source={require('../img/fundoVideos.png')}>
          <View style={{ backgroundColor: '#7CC9BC', shadowColor: "#000", shadowOffset: { width: 1, height: 10 }, shadowOpacity: 0.38, shadowRadius: 4, height: 150, width: 420, borderBottomEndRadius: 55, borderBottomStartRadius: 55 }}>
            <Image source={require('../img/tituloVideos.png')} style={{ width: 180, height: 80, top: 50, left: 105 }} />
            
            <TouchableOpacity onPress={Voltar} style={{width: 30, height: 35, top: -10, left: 30 }}>
              <Image source={require('../img/voltarDesafios.png')} style={{ width: 30, height: 35 }} />
            </TouchableOpacity>

            <View style={styles.containerPersonagem}>
            <TouchableOpacity onPress={Perfil} style={{ width: 70, zIndex: 1000,   left: 310, top: -60}}>
            {personageEscolhido && (
              <Image 
                source={personageEscolhido} 
                style={styles.imagemPersonagem}
              />
            )}
            </TouchableOpacity>
          </View>
          </View>

          <Text style={{ color: 'white', top: 10, left: 35, marginRight: 230, marginTop: 10,fontFamily: 'QuickDelight', fontSize: fontSize, textAlign: 'left' }}>
            Aqui você encontrará algumas receitas nutritivas e diferentes para introduzir novos alimentos à sua rotina.
          </Text>

          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder=""
              placeholderTextColor="#fff"
              onChangeText={updateSearch}
              value={search}
              selectionColor="#fff"
            />
            {search ? (
              <TouchableOpacity onPress={clearSearch}>
                <Icon name="times" size={20} color="#fff" style={styles.searchIcon} />
              </TouchableOpacity>
            ) : (
              <Icon name="search" size={20} color="#fff" style={styles.searchIcon} />
            )}
          </View>
          <ScrollView contentContainerStyle={styles.buttonsContainer} showsVerticalScrollIndicator={false} >
            <View style={styles.buttonsContainer}>
              {filteredThumbnails.map((thumbnail, index) => (
                <TouchableOpacity key={index} style={styles.button} onPress={() => openModal(thumbnail)}>
                  <Image source={thumbnail.src} style={styles.thumbnail} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={{ backgroundColor: '#7CC9BC', shadowColor: "#000", shadowOffset: { width: 1, height: 10 }, shadowOpacity: 0.38, shadowRadius: 4, height: 150, width: '100%', borderBottomEndRadius: 55, borderBottomStartRadius: 55, position: 'absolute', zIndex: 1000 }}>
              <Image source={require('../img/tituloVideos.png')} style={{ width: 180, height: 80, top: 45, left: 125 }} />
              <TouchableOpacity onPress={closeModal} style={{ width: 30, height: 35, top: -15, left: 40 }}>
                <Image source={require('../img/voltarDesafios.png')} style={{ width: 30, height: 35}} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalContainer}>
              {selectedVideo && (
                <>
                  <Video
                    ref={videoRef}
                    source={selectedVideo.videoSrc}
                    style={styles.video}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    useNativeControls
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                  />
                  <ScrollView style={styles.recipeContainer}>
                    <Text style={styles.recipeTitle}>{selectedVideo.alt}</Text>
                    <Text style={styles.recipeIngredients}>Ingredientes:</Text>
                    {selectedVideo.ingredients.map((ingredient, index) => (
                      <Text key={index} style={styles.recipeText}>{ingredient}</Text>
                    ))}
                    <Text style={styles.recipeSteps}>Modo de preparo:</Text>
                    {selectedVideo.steps.map((step, index) => (
                      <Text key={index} style={styles.recipeText}>{step}</Text>
                    ))}
                    {selectedVideo.id === '6' && (
                      <>
                        <Text style={styles.montagemDoPao}>Montagem do pão:</Text>
                        {selectedVideo.steps2.map((step, index) => (
                          <Text key={index} style={styles.recipeText}>{step}</Text>
                        ))}
                      </>
                    )}
                    
                    <Text style={styles.attention}>Todos os vídeos culinários apresentados dentro do aplicativo, são de total autoria dos desenvolvedores com o direito totalmente reservado à empresa Nhac. </Text>
                    <Image source={require('../img/detVideos.png')} style={styles.detVideosImage} />
                  </ScrollView>
                </>
              )}
            </View>
          </Modal>

        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 291,
    height: 43,
    backgroundColor: '#4BBFBE',
    borderRadius: 21.5,
    paddingHorizontal: 10,
    marginTop: 80,
    marginBottom: 25,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  searchBar: {
    flex: 1,
    color: '#fff',
  },
  searchIcon: {
    marginLeft: 10,
  },
  buttonsContainer: {
    marginTop: 5,
    marginBottom: 20,
    alignItems:'center'
  },
  button: {
    width: 325,
    height: 159,
    borderRadius: 35,
    marginBottom: 20,
    shadowColor: '#4BBFBE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#4BBFBE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: 371,
    height: 212,
    borderRadius: 35,
    marginTop: 180,
  },



  recipeContainer: {
    backgroundColor: '#fff',
    borderStartStartRadius: 66,
    borderStartEndRadius: 66,
    padding: 20,
    marginTop: 20,
    width: '100%',
    height: '100%',
    flexGrow: 1,
  },
  recipeTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Lollypop',
    marginTop: 15,
    color: '#4BBFBE'
  },
  recipeText: {
    fontSize: 16,
    color: '#000',
    marginVertical: 5, 
  },
  recipeIngredients: {
    fontSize: 20,
    textAlign: 'left',
    fontFamily: 'Retrograde',
    marginTop: 20,
    marginBottom: 10,
  },
  recipeSteps: {
    fontSize: 20,
    textAlign: 'left',
    fontFamily: 'Retrograde',
    marginTop: 30,
    marginBottom: 10,
  },

  montagemDoPao: {
    fontFamily: 'Retrograde', 
    fontSize: 20, 
    textAlign: 'left',
    marginTop: 30,
    marginBottom: 10,
  },

  attention: {
    color: 'red',
    fontSize: 13,
    textAlign: 'left',
    marginTop: 35
  },


  detVideosImage: {
    width: 300,
    height: 270,
    marginTop: 45,
    top: -20,
    marginLeft: 70,
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