import React from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BusinessDetailsRouteProp } from '../../../../App';
import { BusinessDetailsUiModel, ReviewUiModel } from './BusinessDetailsUiModel';
import { useBusinessDetails } from './useBusinessDetails';

export const BusinessDetailsScreen = ({ route }: { route: BusinessDetailsRouteProp }) => {
  const { businessId } = route.params;
  const { state } = useBusinessDetails(businessId);

  return (
    <SafeAreaView style={styles.screen}>
      {state.isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <FlatList
          ListHeaderComponent={<BusinessDetails business={state.business!} />}
          data={state.business!.reviews}
          keyExtractor={review => review.id}
          renderItem={({ item }) => {
            return <Review review={item} />;
          }}
        />
      )}
    </SafeAreaView>
  );
};

const BusinessDetails = ({ business }: { business: BusinessDetailsUiModel }) => {
  return (
    <>
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
      {/* TODO: {business.reviews.length > 0 ? <Text>Latest Reviews</Text> : undefined} */}
    </>
  );
};

const Review = ({ review }: { review: ReviewUiModel }) => {
  return (
    <>
      <View style={styles.reviewCard}>
        <View style={styles.reviewUser}>
          {/* TODO: add fallback image */}
          <Image style={styles.reviewUserImage} source={{ uri: review.user.imageUrl }} />
          <View style={styles.reviewUserAndRating}>
            <Text style={styles.reviewUserName}>{review.user.name}</Text>
            <View style={styles.ratingAndDate}>
              <Image style={styles.ratingImage} source={review.ratingImage} />
              <Text style={styles.text}>{review.timeCreated}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  businessPhoto: {
    height: 200,
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
  reviewCard: {
    flexDirection: 'column',
    borderRadius: 4,
    backgroundColor: '#AAA',
    marginHorizontal: 4,
    marginVertical: 2,
    padding: 8,
  },
  reviewUser: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewUserImage: {
    width: 44,
    height: 44,
    marginRight: 8,
  },
  reviewUserName: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  reviewUserAndRating: {
    justifyContent: 'space-evenly',
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
