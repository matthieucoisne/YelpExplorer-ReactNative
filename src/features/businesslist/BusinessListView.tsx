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
import { BusinessDetailsScreenProp } from '../../App';
import { BusinessUiModel } from './BusinessUiModel';
import { useBusinessList } from './useBusinessList';

export const BusinessListView: React.FC = () => {
  const { state } = useBusinessList('Sushi', 'Montreal', 'price', 20);

  return (
    <SafeAreaView style={styles.screen}>
      {state.isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          horizontal={false}
          showsHorizontalScrollIndicator={true}
          data={state.businesses}
          renderItem={({ item }) => {
            return <BusinessRow business={item} />;
          }}
          keyExtractor={(business: BusinessUiModel) => business.id}
        />
      )}
    </SafeAreaView>
  );
};

const BusinessRow = ({ business }: { business: BusinessUiModel }) => {
  const navigation = useNavigation<BusinessDetailsScreenProp>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('BusinessDetails', {
          businessId: business.id,
        });
      }}
    >
      <View style={styles.card}>
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    height: 100,
    borderRadius: 8,
    backgroundColor: '#AAA',
    marginHorizontal: 4,
    marginVertical: 2,
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
