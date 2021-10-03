import React from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Rows, Table } from 'react-native-table-component';
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
      <BusinessInfo business={business} />
      <BusinessHours hours={business.hours} />
      <BusinessReviews reviews={business.reviews} />
    </>
  );
};

const BusinessInfo = ({ business }: { business: BusinessDetailsUiModel }) => {
  return (
    <>
      <Image style={styles.businessPhoto} source={{ uri: business.photoUrl }} />
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
    </>
  );
};

const BusinessHours = ({ hours }: { hours: string[][] }) => {
  return (
    <View>
      <Text style={styles.sectionName}>Opening Hours</Text>
      <Table style={styles.openingHours}>
        <Rows data={hours} textStyle={styles.text} widthArr={[90, 200]} />
      </Table>
    </View>
  );
};

const BusinessReviews = ({ reviews }: { reviews: ReviewUiModel[] }) => {
  if (reviews.length > 0) {
    return <Text style={styles.sectionName}>Latest Reviews</Text>;
    // Reviews will be displayed with the <FlatList>
  } else {
    return <></>;
  }
};

const Review = ({ review }: { review: ReviewUiModel }) => {
  return (
    <>
      <View style={styles.reviewCard}>
        <View style={styles.reviewUser}>
          {/* TODO: add fallback image */}
          <Image style={styles.reviewUserImage} source={{ uri: review.user.photoUrl }} />
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
  },
  businessDetails: {
    flexDirection: 'column',
    height: 120,
    marginHorizontal: 8,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  businessName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    marginVertical: 8,
  },
  openingHours: {
    marginTop: 2,
    marginHorizontal: 8,
  },
  sectionName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
    marginTop: 16,
    marginHorizontal: 8,
  },
  reviewCard: {
    flexDirection: 'column',
    backgroundColor: '#444',
    borderRadius: 4,
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
  },
  reviewUserName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFF',
  },
  reviewUserAndRating: {
    justifyContent: 'space-evenly',
    marginLeft: 8,
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
    fontSize: 13,
    color: '#FFF',
  },
});
