import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Colors from '../constants/Colors';

export default function Middle({ userDataProfile }) {
  // Function to convert base64 to URI
  const base64ToUri = (base64) => `data:image/jpeg;base64,${base64}`;

  return (
    <View style={styles.main}>
      <View style={styles.imageContainer}>
        {/* Check if userDataProfile.image is available */}
        {userDataProfile?.image ? (
          <Image style={styles.image} source={{ uri: base64ToUri(userDataProfile.avatarImage) }} />
        ) : (
          <Image style={styles.image} source={require('../assets/user.jpg')} />
        )}
        <Text />
        <Text />
        <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
          {userDataProfile?.nickname || 'blank'}
        </Text>
        <Text style={{ fontSize: 16, color: Colors.darkGray, fontWeight: '500' }}>
          {userDataProfile?.email || 'blank'}
        </Text>
      </View>

      <View style={styles.middleSectionTextContainer}>
        <View style={styles.middleSectionText}>
          <Text style={styles.toptext}>Description:</Text>
          <Text />
          <Text style={styles.bottomtext}>
            {userDataProfile ? userDataProfile.description : 'blank'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    marginTop: 30,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginBottom: 5,
  },
  middleSectionTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  middleSectionText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  toptext: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
  },
  bottomtext: {
    fontSize: 16,
    color: Colors.darkGray,
    fontWeight: '700',
  },
});
