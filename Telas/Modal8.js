import React from 'react';
import { Modal, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from './Styles'; 

const Modal8 = ({ visible, onClose, dica }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.overlay}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Image source={require('../img/det1Dicas.png')} style={styles.backgroundImage1} />
        <Image source={require('../img/det2Dicas.png')} style={styles.backgroundImage2} />
        <View style={styles.contentView}>
          <ScrollView>
            <Text style={{fontSize: 24, fontFamily: 'QuickDelight', textAlign: 'center', marginBottom: 20 }}>{dica.title}</Text>
            <Image source={dica.image} style={{ width: 296, height: 171, borderRadius: 35 }} />
            <Text style={{fontSize: 18, fontFamily: 'QuickDelight', textAlign: 'justify', marginTop: 15}}>{dica.text1}</Text>
            <Text style={{fontSize: 20, fontFamily: 'QuickDelight', textAlign: 'justify', marginTop: 15}}>{dica.subtitle1}</Text>
            <Text style={{fontSize: 18, fontFamily: 'QuickDelight', textAlign: 'justify', marginTop: 10}}>{dica.text2}</Text>

            <Text style={{fontSize: 19, fontFamily: 'QuickDelight', textAlign: 'justify', marginTop: 15}}>{dica.subtitle2}</Text>
            <Text style={{fontSize: 19, fontFamily: 'QuickDelight', textAlign: 'justify', marginTop: 5}}>{dica.subtitle3}</Text>
            <Text style={{fontSize: 19, fontFamily: 'QuickDelight', textAlign: 'justify', marginTop: 5}}>{dica.subtitle4}</Text>
            <Text style={{fontSize: 19, fontFamily: 'QuickDelight', textAlign: 'justify', marginTop: 5}}>{dica.subtitle5}</Text>
            <Text style={{fontSize: 19, fontFamily: 'QuickDelight', textAlign: 'justify', marginTop: 5}}>{dica.subtitle6}</Text>
            <Text style={{fontSize: 19, fontFamily: 'QuickDelight', textAlign: 'justify', marginTop: 5}}>{dica.subtitle7}</Text>
            <Text style={{fontSize: 19, fontFamily: 'QuickDelight', textAlign: 'justify', marginTop: 5}}>{dica.subtitle8}</Text>
            <Text style={{fontSize: 19, fontFamily: 'QuickDelight', textAlign: 'justify', marginTop: 5}}>{dica.subtitle9}</Text>
            <Text style={{fontSize: 19, fontFamily: 'QuickDelight', textAlign: 'justify', marginTop: 5}}>{dica.subtitle10}</Text>
            <Text style={{fontSize: 19, fontFamily: 'QuickDelight', textAlign: 'justify', marginTop: 5}}>{dica.subtitle11}</Text>
            <Text style={{fontSize: 19, fontFamily: 'QuickDelight', textAlign: 'justify', marginTop: 5}}>{dica.subtitle12}</Text>

            <Text style={{fontSize: 18, fontFamily: 'QuickDelight', textAlign: 'justify', marginTop: 10}}>{dica.text3}</Text>
          </ScrollView>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={onClose}
          >
            <Text style={styles.textStyle}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </View>
  </Modal>
);

export default Modal8;