import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, ScrollView, Image, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useFonts } from 'expo-font';
import { useRoute } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import Modal1 from './Modal1'; 
import Modal2 from './Modal2'; 
import Modal3 from './Modal3'; 
import Modal4 from './Modal4'; 
import Modal5 from './Modal5'; 
import Modal6 from './Modal6'; 
import Modal7 from './Modal7'; 
import Modal8 from './Modal8'; 
import Modal9 from './Modal9'; 
import Modal10 from './Modal10'; 


const { width, height } = Dimensions.get('window');

const dicas = [
  {
    id: 1,
    type: 'type1',
    title: 'Dica para introdução alimentar',
    description: 'Veja como podemos facilitar esta nova fase de aprendizagem alimentar do bebê.',
    image: require('../img/dica1.png'),
    text1: 'A introdução alimentar é uma fase que ocorre por volta dos seis meses de idade, quando o bebê começa a experimentar alimentos sólidos além do leite materno ou fórmula. Esse processo é crucial não apenas para fornecer os nutrientes necessários para o crescimento e desenvolvimento, mas também para ajudar o bebê a desenvolver habilidades motoras orais, como mastigar e engolir.',
    subtitle1: 'Algumas dicas para introduzir o seu bebê a alimentação de forma adequada',

    subtitle2: '1. Iniciar a introdução com frutas e legumes',
    text2: 'Os melhores alimentos para iniciar a introdução alimentar são as  frutas da estação (ao oferecê-las para os bebês, devemos sempre tirar sementes e caroços) e os legumes. Para prepará-los, o ideal é cozinhá-los bem para terem uma consistência firme e macia para poder amassar com o garfo',

    subtitle3: '2. Montar o pratinho de acordo as devidas proporções alimentares',
    text3: 'A montagem do pratinho deve ser feita nas devidas proporções de cada grupo alimentar, não há necessidade de começar apenas com um grupo. Porém, ofereça um alimento por vez. Por exemplo, primeiro o brócolis, depois a carne e assim por diante, para que o bebê sinta a textura de cada um.',

    subtitle4: '3. Se o bebê preferir utilizar as mãos ao invés da colher, não há problema algum!',
    text4: 'Se o bebê não se interessar em receber os alimentos com a  colher e preferir utilizar as mãos, não há problema algum. Nunca o repreenda por querer colocar as mãos e interagir com o alimento. Permita sempre que o bebê manipule, cheire e lamba os alimentos. O bebê necessita desta exploração sensorial para apresentar um bom desenvolvimento alimentar.',

    subtitle5: '4. Adapte os alimentos de acordo com a necessidade',
    text5: 'Começamos com alimentos amassados na colher, ou inteiros e macios, de forma que o bebê possa pegar com a mão, levar à boca e amassar entre a língua e o céu da boca.',

    subtitle6: '5. Escolha o melhor momento para o bebê',
    text6: 'Na hora de comer, o bebê não deve estar cansado, com sono, irritado, com fome demais ou, ao contrário, muito saciado.',

    text7: 'Seguindo as dicas acima, temos certeza que a introdução alimentar do seu filho, se tornará mais leve e tranquila, esperamos te-lo ajudado!',
  },


  {
    id: 2,
    type: 'type2',
    title: 'Alimentos que podem causar alergia',
    description: 'Veja alguns alimentos que costumam causar alergias alimentares em crianças.',
    image: require('../img/dica2.png'),
    text1: 'A alergia alimentar é uma reação anormal do nosso organismo a alguma proteína presente na comida. O problema ocorre quando o corpo identifica como uma ameaça, substâncias que, na verdade, não causam doenças, iniciando uma resposta imune para combatê-las. Os responsáveis devem ficar de olho nas suas crianças, se houver algum dos sintomas mais comuns da alergia alimentar: que são as reações epidérmicas, como inchaços, coceiras e urticária, dores abdominais e vômito, caso aconteça a criança deve ser levada ao médico especialista.',
    text2: 'Os principais alimentos que podem causar alergia são:',
    text3: 'Leite: o leite de vaca é um dos maiores responsáveis pelos casos de alergia alimentar em crianças durante a primeira infância. A reação pode acontecer após a segunda exposição ao leite ou tardiamente.',
    text4: 'Ovo: a albumina, presente na clara, é a proteína do ovo com maior potencial alergênico.',
    text5: 'Trigo, aveia e centeio: esses cereais também apresentam elevados índices de alergia alimentar em crianças. O glúten é a principal proteína causadora da reação alérgica.',
    text6: 'Frutos do mar: caranguejo, camarão e lagosta são geralmente os que provocam reações alérgicas mais severas.',
    text7: 'Aditivos alimentares: conhecidos como corantes e conservantes são muito utilizados em vários tipos de alimentos e bebidas, como cervejas, vinhos e comidas congeladas em geral.',
  },


  {
    id: 3,
    type: 'type3',
    title: 'Seletividade alimentar e o espectro autista',
    description: 'A seletividade alimentar é comum em pessoas no espectro autista, muitas vezes ligada a sensibilidades que afetam a alimentação.',
    image: require('../img/dica3.png'),
    text1: 'Muito se fala da seletividade alimentar quanto o assunto é autismo porque, sem dúvida, este é um problema muito comum em pessoas dentro do espectro. Muitos dos diagnosticados – mas não todos – no TEA apresentam dificuldades com a rigidez e mesmice e isso pode refletir em suas preferências alimentares. No entanto, essas coisas também podem ocorrer com pessoas com outros tipos de desordem. ',
    text2: 'Se a sua criança autista está passando por este problema, é muito provável que você precise intervir. No entanto, antes de iniciar qualquer tipo de controle, é preciso descartar as condições médicas que podem estar provocando isso. Afinal, a seletividade alimentar da qual estamos falando está ligada a problemas emocionais ou sensoriais.',
    text3: 'Algumas das condições de saúde que podem levar a uma seletividade das refeições, incluem:',

    subtitle1: '•Refluxo gastroesofágico.',
    subtitle2: '•Alergias e/ou intolerâncias a alguns ingredientes.',
    subtitle3: '•Constipação crônica.',
    subtitle4: '•Alterações no paladar devido ao uso de alguma substância.',

    text4: 'Quando excluídas estas possibilidades, aí sim você pode tratar a seletividade alimentar do ponto de vista comportamental.',
    text5: 'Para tratar qualquer caso de seletividade alimentar, seja de um autista ou de qualquer outra criança, antes de tudo é preciso entender o histórico alimentar detalhado. E isto pode ser feito pelos pais, cuidadores e terapeutas envolvidos.',
    text6: 'Busque entender como foram as experiências da criança desde a amamentação e a relação com a mamadeira, passando pela transição para a comida diluída e depois as reações aos alimentos texturizados',
    text7: 'Utilize também do NHAC, para que auxilie o seu filho da melhor maneira, assim o aplicativo irá conduzir e ajudá-lo a lidar com tal problema.',
  },


  {
    id: 4,
    type: 'type4',
    title: 'Meu filho não quer comer, o que eu faço?',
    description: 'Quando seu filho não quer comer, é importante entender as possíveis causas e buscar estratégias. Tornando as refeições mais atraentes e tranquilas.',
    image: require('../img/dica4.png'),
    text1: 'Primeiramente, mantenha a calma! Estamos aqui para auxiliá-lo nisso! Abaixo será descrito 10 dicas de como ajudá-lo:',
    text2: '1. Fazer do horário da refeição um momento tranquilo e de prazer.',
    text3: '2. Variar os alimentos e procurar oferecer preparações saborosas.',
    text4: '3. Colocar diversos alimentos no prato para proporcionar mais opções.',
    text5: '4. Montar um prato com apresentação atraente para que a criança se sinta motivada a comer.',
    text6: '5. Oferecer a comida da criança no mesmo horário da refeição da família.',
    text7: '6. Na hora de ofertar a comida, conversar com a criança e manter tranquilidade, não deixando transparecer preocupação.',
    text8: '7. Não obrigar a criança a comer e não insistir para que ela raspe o prato. Parar de alimentá-la quando perceber que ela está satisfeita',
    text9: '8. Não oferecer recompensas, como doce, brinquedo, televisão, para fazer com que a criança coma mais.',
    text10: '9. Se houver rejeição frequente de determinados alimentos, não deixar de oferecê-los: apresente-os de forma diferente.',
    text11: '10. Se a criança recusar a refeição, não a substituir por lanches/merendas ou algum alimento preferido pela criança. O ideal é esperar um tempo e, se perceber que a criança está com fome, preparar um novo prato com a comida que foi oferecida na refeição recusada; ou então esperar o próximo horário de refeição',
  },


  {
    id: 5,
    type: 'type5',
    title: 'Onde buscar apoio para lidar com a seletividade alimentar?',
    description: 'Quando o prato se torna um campo de batalha, saber onde buscar apoio pode transformar refeições desafiadoras em momentos de descoberta e conexão.',
    image: require('../img/dica5.png'),
    text1: 'O tratamento para a seletividade alimentar deve ser multidisciplinar, podendo envolver profissionais como psicólogo, fonoaudiólogo, terapeuta ocupacional e nutricionista. Isso é importante porque existem questões comportamentais e sensoriais relacionadas ao problema. ',
    text2: 'É preciso ter um médico envolvido nesse tratamento, porque envolve questões de saúde, de vida, a criança precisa muitas vezes fazer tratamentos precisa cuidar da parte orgânica, para ter certeza sobre a hidratação e sobre a quantidade de vitaminas que ela está recebendo ou não.',
    text3: 'A equipe multidisciplinar é essencial para o tratamento, pois dessa forma conseguimos trabalhar diversas demandas que a criança necessita em conjunto, pois apenas profissionais especializados em suas determinadas áreas têm conhecimento e [juntos] podem trazer melhores resultados e evolução.',
  },

  {
    id: 6,
    type: 'type6',
    title: 'Como entreter a criança no momento da alimentação?',
    description: 'Transforme a hora de comer em um momento divertido e prazeroso para o seu pequeno explorador!',
    image: require('../img/dica6.png'),
    text1: 'A infância, mais do que qualquer fase da vida, é responsável pela formação do paladar e, por esse motivo, o maior desafio de papais e mamães é adotar uma boa educação alimentar para seus filhos.',
    subtitle1: '1. Chame seu filho para ser um mini chefe!',
    text2: 'A participação na preparação dos pratos – do início ao fim – é um grande estímulo para as crianças. Leve seu filho ao mercado para que ele toque, sinta o aroma e conheça variados tipos de ingredientes. A curiosidade vai levar à participação por conta própria e ele rapidamente vai ter vontade de experimentar outros alimentos',

    subtitle2: '2. Faça pratos coloridos',
    text3: 'Prepare receitas coloridas, incluindo o máximo de cor e contraste no prato possível.',

    subtitle3: '3. Faça pratos divertidos',
    text4: 'A disposição em que colocamos a comida no prato pode ser a chave para a criança se alimentar bem. De vez em quando, saia do básico e use os alimentos para montar paisagens, personagens, etc., isso incentiva o seu filho a experimentar e saborear os ingredientes.',

    subtitle4: '4. Utilize de joguinhos educativos no momento da alimentação',
    text5: 'Vale a pena apostar em jogos no lanchinho da tarde ou mesmo no almoço. Dá para montar quadrinho de ponto, dá para brincar de pirâmide alimentar, dentre outros joguinhos lúdicos que podem ser encontrados na internet.',

    subtitle5: '5. Mantenha a mesa cheia e completa de alimentos',
    text6: 'Além de tornar o almoço mais animado por ter mais pessoas juntas, ver um amigo ou familiar consumindo algum alimento diferente pode ser um ótimo incentivo para os pequenos quererem experimentar.',
  },
  {
    id: 7,
    type: 'type7',
    title: 'Erros comuns na introdução alimentar e como evitá-los',
    description: 'Descubra os deslizes mais comuns na introdução alimentar e como guiar seu bebê rumo a uma alimentação saudável desde o início.',
    image: require('../img/dica7.png'),

    subtitle1: '1. Bater a comida no liquidificador ou passar na peneira ',
    text1: 'Segundo especialistas, essa prática é incorreta, pois não estimula os movimentos de mastigação da criança, pois ao visualizar as diferentes texturas e sabores dos alimentos, o bebê vai ter novas experiências e um interesse maior pela comida. O correto é que o alimento deve ser amassado ou cortado em pedacinhos (o chamado método BLW, do inglês "Baby-led Weaning", ou desmame guiado pelo bebê).',

    subtitle2: '2. Oferecer alimentos processados e doces  ',
    text2: 'O ideal é que os pais ofereçam apenas refeições com alimentos dos seguintes grupos: proteína animal, leguminosas, tubérculos e cereais, legumes, verduras e frutas. Por isso, é importante evitar papinhas artificiais, embutidos, frituras e alimentos com sal. Os doces também devem ser evitados até os dois anos de idade.',

    subtitle3: '3. Deixar a criança sentar sem postura',
    text3: 'A criança ou bebê deve estar bem posicionada na hora de comer, de preferência na cadeirinha de alimentação. Isso porque, a partir dos seis meses, eles já têm a capacidade motora de sustentar o tronco e de aproximar com as mãos os alimentos até a linha média da boca.',

    subtitle4: '4. Estimular a criança com aparelhos eletrônicos',
    text4: 'A hora de comer deve ser prazerosa, os pais não devem usar de aparelhos eletrônicos para estimular a criança, como celulares, tablets ou televisão, por exemplo. O ideal é manter um disciplinado e tranquilo.',

    subtitle5: '5. Distrair a criança durante as refeições',
    text5: 'A criança precisa ter atenção plena ao que está comendo, pois isso a ajuda a desenvolver uma relação saudável com a comida.',
  },
  {
    id: 8,
    type: 'type8',
    title: 'O que bebê de 6 meses pode comer na Introdução alimentar?',
    description: 'Seu bebê está pronto para descobrir novos sabores! Saiba quais alimentos podem fazer parte desse primeiro contato com o mundo da comida.',
    image: require('../img/dica8.png'),
    text1: 'Para começar a Introdução Alimentar do seu bebê é importante saber quais alimentos oferecer para o ele sem colocar a segurança e saúde dele em risco:',
    subtitle1: 'O que bebê de 6 meses pode comer:',
    text2: 'Os alimentos mais fáceis para essa fase de introdução da alimentação do bebê são:',

    subtitle2: '● Brócolis;',
    subtitle3: '● Cenoura;',
    subtitle4: '● Batata;',
    subtitle5: '● Couve-flor;',
    subtitle6: '● Milho na espiga;',
    subtitle7: '● Abobrinha;',
    subtitle8: '● Banana;',
    subtitle9: '● Abacate;',
    subtitle10: '● Mamão;',
    subtitle11: '● Melancia;',
    subtitle12: '● Manga.',

    text3: 'Estes são os alimentos mais fáceis de adequar corte, textura e que normalmente possuem mais aceitabilidade pelos bebês, mas todos os outros alimentos, como: frutas, verduras e grãos, nos mais diversos sabores e texturas, também podem e devem ser oferecidos à criança. Dessa forma, ela terá seu paladar ampliado e fará novas experiências.',
  },
  {
    id: 9,
    type: 'type9',
    title: 'Introdução alimentar: Como lidar com a recusa',
    description: 'Não desanime diante das caretas! Aprenda estratégias para superar a recusa alimentar e tornar cada refeição um momento de conquista',
    image: require('../img/dica9.png'),
    text1: 'Os bebês ou as crianças recusam a comida por vários motivos: podem estar cansados, distraídos, doentes ou simplesmente satisfeitos. A partir de um ano de idade, o apetite também costuma diminuir, até porque a velocidade de ganho de peso diminui. O importante é que os pais saibam que, sempre que tiver fome, o bebê irá pedir por comida. Se ele tocar na colher ou afastá-la da boca, provavelmente quer dizer que já comeu o suficiente. Quando novos alimentos entram na dieta, o bebê também tende a recusá-los. Esse período de adaptação é comum e pais e cuidadores precisam ter paciência para insistir, apresentando o alimento de diferentes formas. Algumas dicas são:',

    text2: '● Mudar a forma como os alimentos são apresentados pode ajudar;',
    text3: '● Faça suas refeições no mesmo horário em que oferece a comida ao filho. Ver os pais comerem pode estimular a criança;',
    text4: '● Respeite os horários das refeições e acostume seu filho a comer nos lugares apropriados para isso;',
    text5: '● Elogie quando o bebê estiver comendo, mesmo que pouco;',
    text6: '● Se o seu filho recusar a comida, não o force. Por mais frustrante que seja, tente acalmá-lo e, depois de um tempo, ofereça outra vez;',
    text7: '● Seu bebê ou criança pode comer devagar, então seja paciente;',
    text8: '● Usar comida como recompensa não é recomendado. Prefira recompensá-lo com uma ida ao parque ou brincadeira;',
    text9: '● Explique sobre as cores dos alimentos, sua consistência (se são macios, duros etc.), como são gostosos e importantes para a saúde;',
    text10: '● Se você conhece outros bebês ou crianças que se alimentem bem, tente marcar para que façam uma refeição juntos. Seu filho poderá seguir o bom exemplo;',
    text11: '● Tenha em mente que o gosto muda. Em um dia, seu bebê pode adorar mandioquinha. No outro, pode jogar a mandioquinha para o alto.',
 
  },
  {
    id: 10,
    type: 'type10',
    title: 'Alimentos não recomendados antes de 2 anos',
    description: 'Nem tudo é permitido no prato dos pequenos: conheça os alimentos que devem ficar fora do menu antes dos 2 anos de idade.',
    image: require('../img/dica10.png'),
    subtitle1: 'Alimentos que não são recomendados antes dos 2 anos de idade:',

    text1: '● Tipos de açúcar: branco, cristal, demerara, mascavo e açúcar de coco;',
    text2: '● Mel, melado, rapadura, caldo de cana e agave;',
    text3: '● Glicose, sacarose, maltodextrina, dextrose, frutose e xarope de glicose, milho, guaraná e malte;',
    text4: '● Adoçantes artificiais;',
    text5: '● Preparações com açúcar: bolo, biscoito, iogurte e sucos adoçados;',
    text6: '● Refrigerante e sucos prontos;',
    text7: '● Chocolate e achocolatado;',
    text8: '● Cereais matinais com açúcar;',
    text9: '● Doces em geral: balas, pirulitos, picolé, sorvete, entre outros.',

    subtitle2: 'É importante que os pais estejam atentos aos rótulos dos produtos!',
    text10: 'Depois dos dois anos, a criança está liberada para comer açúcar, porém com moderação, pois o açúcar, neste período influencia a formação do paladar que, posteriormente, ficará viciado e terá dificuldade em aceitar alimentos saudáveis.',

  },

];


export default function DicasInicio({ navigation }) {

    const route = useRoute();
    const isFocused = useIsFocused();
    const [searchText, setSearchText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDica, setSelectedDica] = useState(null);

    const [fontsLoaded] = useFonts({
        SunBorn: require('../fonts/QuickDelight.otf'),
    });

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

    useEffect(() => {
        if (isFocused) {
            setSearchText('');
        }
    }, [isFocused]);

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filteredDicas = dicas.filter(dica => 
        normalizeText(dica.title).includes(normalizeText(searchText)) || 
        normalizeText(dica.description).includes(normalizeText(searchText))
    );

    const handleDicaPress = (dica) => {
        setSelectedDica(dica);
        setModalVisible(true);
    };

    const clearSearchText = () => {
        setSearchText('');
    };
    
    const closeModal = () => {
        setModalVisible(false);
        setSelectedDica(null);
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
                <ImageBackground style={{ width: width, height: height+25 }} source={require('../img/fundoDicasInstrucoes.png')}>
                    <View style={{ backgroundColor: '#388388', shadowColor: "black", shadowOffset: { width: 1, height: 10 }, shadowOpacity: 0.38, shadowRadius: 4, height: 148, width: width, borderBottomEndRadius: 55, borderBottomStartRadius: 55, zIndex: 1000, elevation: 4 }}>
                        
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

                        <Image source={require('../img/tituloDicasInstrucoes.png')} style={{ width: 160, height: 75, top: -20, left: (width - 180) / 2 }} />
                        <TouchableOpacity onPress={Voltar} style={{top: -80, left: 35, width: 30, height: 34 }}>
                            <Image source={require('../img/voltarDesafios.png')} style={{ width: 26, height: 30, top:2, left:2  }} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{ color: 'white', marginTop: 60, top: -10,marginLeft: 28, marginRight: 160, fontFamily: 'QuickDelight', fontSize: fontSize, textAlign: 'left' }}> Nesta página você irá encontrar dicas para adicionar na sua rotina. </Text>
                        <Image source={require('../img/detalhe1Dicas.png')} style={{ width: 185, height: 140, marginTop: -110, marginLeft: 235 }} />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 30 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#388388', borderRadius: 21.5, padding: 10, width: 291, height: 43, top: 20 }}>
                            <TextInput
                                style={{ color: 'white', flex: 1 }}
                                placeholder=""
                                placeholderTextColor="white"
                                onChangeText={text => setSearchText(text)}
                                value={searchText}
                                selectionColor="white" 
                            />
                            {searchText ? (
                                <TouchableOpacity onPress={clearSearchText}>
                                    <Image source={require('../img/x.png')} style={{ width: 15, height: 15, right: 10 }} />
                                </TouchableOpacity>
                            ) : (
                                <Image source={require('../img/lupa.png')} style={{ width: 24, height: 24, right: 10 }} />
                            )}
                        </View>
                    </View>
                    <ScrollView style={{ marginTop: '11%', marginBottom: 25, backgroundColor:'white' }}>
                        {filteredDicas.map(dica => (
                            <TouchableOpacity key={dica.id} onPress={() => handleDicaPress(dica)}>
                                <View style={{ backgroundColor: '#FFFFFF', shadowColor: "#000000", shadowOffset: { width: 1, height: 5 }, shadowOpacity: 0.4, shadowRadius: 4, elevation: 3,height: 120, width: 325, borderRadius: 40, marginTop: 10, alignSelf: 'center', padding: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                                    <Text style={{ textAlign: "center", fontFamily: 'QuickDelight', fontSize: fontSize-4, marginBottom: 5 }}>{dica.title}</Text>
                                    <Text style={{ textAlign: "left", fontFamily: 'QuickDelight', fontSize: fontSize-7, color: '#757575' }}>{dica.description}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {selectedDica && (
                        <>
                            {selectedDica.type === 'type1' && <Modal1 visible={modalVisible} onClose={closeModal} dica={selectedDica} />}
                            {selectedDica.type === 'type2' && <Modal2 visible={modalVisible} onClose={closeModal} dica={selectedDica} />}
                            {selectedDica.type === 'type3' && <Modal3 visible={modalVisible} onClose={closeModal} dica={selectedDica} />}
                            {selectedDica.type === 'type4' && <Modal4 visible={modalVisible} onClose={closeModal} dica={selectedDica} />}
                            {selectedDica.type === 'type5' && <Modal5 visible={modalVisible} onClose={closeModal} dica={selectedDica} />}

                            {selectedDica.type === 'type6' && <Modal6 visible={modalVisible} onClose={closeModal} dica={selectedDica} />}
                            {selectedDica.type === 'type7' && <Modal7 visible={modalVisible} onClose={closeModal} dica={selectedDica} />}
                            {selectedDica.type === 'type8' && <Modal8 visible={modalVisible} onClose={closeModal} dica={selectedDica} />}
                            {selectedDica.type === 'type9' && <Modal9 visible={modalVisible} onClose={closeModal} dica={selectedDica} />}
                            {selectedDica.type === 'type10' && <Modal10 visible={modalVisible} onClose={closeModal} dica={selectedDica} />}
                        </>
                    )}

                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    imagemPersonagem: {
        width: 70,
        height: 70,
        zIndex: 100
      },
      containerPersonagem: {
        zIndex: 100,
      }
});