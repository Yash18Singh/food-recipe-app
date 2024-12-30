// CachedImage.js

import React from 'react';
import FastImage from 'react-native-fast-image';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

// The CachedImage component that uses FastImage internally
const CachedImage = ({ uri, style, resizeMode = 'contain', fallbackSource, ...props }) => {
  return (
    <View style={[styles.container, style]}>
      <FastImage
        style={styles.image}
        source={{
          uri,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode[resizeMode]}
        defaultSource={fallbackSource} // Placeholder if the image is not loaded yet
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CachedImage;
