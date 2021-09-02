import React from 'react';
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {BusinessUiModel} from './BusinessUiModel';
import {useBusinessList} from './useBusinessList';

const BusinessRow = ({business}: {business: BusinessUiModel}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(`${business.name} clicked!`);
      }}
    >
      <View style={styles.listItem}>
        <Text>{business.name}</Text>
        <Image style={styles.photo} source={{uri: business.photo}} />
      </View>
    </TouchableOpacity>
  );
};

const BusinessListView = () => {
  const {isLoading, businesses} = useBusinessList('Sushi', 'Montreal', 'price', 20);

  return (
    <SafeAreaView style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          horizontal={false}
          showsHorizontalScrollIndicator={true}
          data={businesses}
          renderItem={({item}) => {
            return <BusinessRow business={item} />;
          }}
          keyExtractor={(business: BusinessUiModel) => business.id}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#333',
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  photo: {
    width: 200,
    height: 200,
  },
});

export default BusinessListView;
