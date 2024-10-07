import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './Styles'; 

const Modal5 = ({ visible, onClose, dica }) => (
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
          <Text style={{fontSize: 24, fontFamily: 'QuickDelight', textAlign: 'center', marginBottom: 20 }}>{dica.title}</Text>
          <Image source={dica.image} style={{ width: 296, height: 171, borderRadius: 35 }} />
          <Text style={{fontSize: 17, fontFamily: 'QuickDelight', textAlign: 'justify', marginTop: 15}}>{dica.text1}</Text>
          <Text style={{fontSize: 17, fontFamily: 'QuickDelight', textAlign: 'justify', marginTop: 10}}>{dica.text2}</Text>
          <Text style={{fontSize: 17, fontFamily: 'QuickDelight', textAlign: 'justify', marginTop: 15}}>{dica.text3}</Text>
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

export default Modal5;