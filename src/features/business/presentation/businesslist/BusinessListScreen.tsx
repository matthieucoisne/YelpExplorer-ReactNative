import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BusinessDetailsNavigationProp } from '../../../../App';
import { BusinessListUiModel } from './BusinessListUiModel';
import { useBusinessList } from './useBusinessList';

export const BusinessListScreen = () => {
  const { state } = useBusinessList('Sushi', 'Montreal', 'price', 20);

  return (
    <SafeAreaView style={styles.screen}>
      {state.isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <FlatList
          data={state.businesses}
          keyExtractor={business => business.id}
          renderItem={({ item }) => {
            return <Business business={item} />;
          }}
        />
      )}
    </SafeAreaView>
  );
};

const Business = ({ business }: { business: BusinessListUiModel }) => {
  const navigation = useNavigation<BusinessDetailsNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('BusinessDetails', {
          businessId: business.id,
        });
      }}
    >
      <View style={styles.businessCard}>
        <Image style={styles.businessPhoto} source={{ uri: business.imageUrl }} />
        <View style={styles.businessDetails}>
          <Text style={styles.businessName}>{business.name}</Text>
          <View style={styles.ratingAndDate}>
            <Image style={styles.ratingImage} source={business.ratingImage} />
            <Text style={styles.text}>{business.reviewCount}</Text>
          </View>
          <Text style={styles.text}>{business.priceAndCategories}</Text>
          <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>
            {business.address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  businessCard: {
    flexDirection: 'row',
    height: 100,
    borderRadius: 8,
    backgroundColor: '#AAA',
    marginHorizontal: 4,
    marginVertical: 2,
  },
  businessPhoto: {
    width: 100,
    height: 100,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  businessDetails: {
    flexDirection: 'column',
    height: 100,
    marginHorizontal: 8,
    paddingTop: 2,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  businessName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  ratingAndDate: {
    flexDirection: 'row',
  },
  ratingImage: {
    width: 82,
    height: 14,
    marginRight: 8,
  },
  text: {
    fontSize: 12,
  },
});
