import React from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BusinessDetailsUiModel } from './BusinessDetailsUiModel';
import { useBusinessDetails } from './useBusinessDetails';

export const BusinessDetailsView = ({ businessId }: { businessId: string }) => {
  const { state } = useBusinessDetails(businessId);

  return (
    <SafeAreaView style={styles.screen}>
      {state.isLoading ? <ActivityIndicator size="large" /> : <BusinessDetails business={state.business!} />}
    </SafeAreaView>
  );
};

const BusinessDetails = ({ business }: { business: BusinessDetailsUiModel }) => {
  return (
    <>
      <Image style={styles.photo} source={{ uri: business.imageUrl }} />
      <View style={styles.info}>
        <Text style={styles.title}>{business.name}</Text>
        <View style={styles.rating}>
          <Image style={styles.ratingImage} source={business.ratingImage} />
          <Text style={styles.text}>{business.reviewCount}</Text>
        </View>
        <Text style={styles.text}>{business.priceAndCategories}</Text>
        <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>
          {business.address}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  photo: {
    width: 100,
    height: 100,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  info: {
    flexDirection: 'column',
    height: 100,
    marginHorizontal: 8,
    paddingTop: 2,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
  },
  rating: {
    flexDirection: 'row',
  },
  ratingImage: {
    width: 82,
    height: 14,
    marginRight: 8,
  },
});
