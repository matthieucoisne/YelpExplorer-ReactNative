import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { BusinessUiModel, useBusinessList } from "./useBusinessList";

const BusinessRow = ({ business }: { business: BusinessUiModel }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(`${business.name} clicked!`);
      }}
    >
      <View style={styles.listItem}>
        <Text>{business.name}</Text>
        <Image style={styles.photo} source={{ uri: business.photo }} />
      </View>
    </TouchableOpacity>
  );
};

const BusinessListView = () => {
  const { isLoading, businessList } = useBusinessList(
    "Sushi",
    "Montreal",
    "price",
    20
  );

  return (
    <SafeAreaView style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          horizontal={false}
          showsHorizontalScrollIndicator={true}
          data={businessList}
          renderItem={({ item }) => {
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
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#333",
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  photo: {
    width: 200,
    height: 200,
  },
});

export default BusinessListView;
