import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';

const SafeAreaScreen = ({children, style}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default SafeAreaScreen;
