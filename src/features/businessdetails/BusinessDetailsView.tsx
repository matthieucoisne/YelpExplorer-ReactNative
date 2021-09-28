import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export const BusinessDetailsView: React.FC = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text>BusinessDetailsView</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
