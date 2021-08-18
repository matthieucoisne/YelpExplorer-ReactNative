import { useQuery } from "@apollo/client";
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
import { businessListQuery } from "../../data/graphql/BusinessListQuery";

const BusinessRow = ({ business }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("ROFLCOPTER", `${business.name}`);
      }}
    >
      <View style={styles.listItem}>
        <Text>{business.name}</Text>
        <Image style={styles.photo} source={{ uri: business.photos[0] }} />
      </View>
    </TouchableOpacity>
  );
};

const BusinessListView = () => {
  const { data, loading } = useQuery(businessListQuery, {
    variables: {
      term: "Sushi",
      location: "Montreal",
      sortBy: "price",
      limit: 20,
    },
  });

  return (
    <SafeAreaView style={styles.screen}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          horizontal={false}
          showsHorizontalScrollIndicator={true}
          data={data.search.business}
          renderItem={({ item }) => {
            return <BusinessRow business={item} />;
          }}
          keyExtractor={(business) => {
            business.id;
          }}
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
