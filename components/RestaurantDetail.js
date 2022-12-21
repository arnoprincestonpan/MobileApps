import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";

export default function RestaurantDetail({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [restaurantData, setRestaurantData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const { id } = route.params;

  let url = `https://apipool.azurewebsites.net/api/restaurants/${id}`;
  let url2 = `https://apipool.azurewebsites.net/api/restaurants/${id}/menu`;

  useEffect(() => {
    Promise.all([
      fetch(url),
      fetch(url2),
    ])
      .then(([res1, res2]) =>
        Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        setRestaurantData(data1);
        setMenuData(data2);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const menuItem = (({ item }) => (
    <TouchableWithoutFeedback>
      <View>
        <Text style={styles.hLine}></Text>
        <View style={styles.itemRow} key={item.id}>
          <Image style={styles.menuimage} source={{ uri: item.pictureUrl }} />
          <Text>
            {item.name}
            {"\n"}
            {item.price}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  ));

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttontext}>&lt;&lt; Go back</Text>
      </TouchableOpacity>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Image
            style={styles.storyimage}
            source={{ uri: restaurantData.logoUrl }}
          />
          <Text style={styles.title}>
            {restaurantData.foodType}
          </Text>
          <Text style={styles.address}>
            {restaurantData.street}
            {"\n"}
            {restaurantData.city}
            {"\n"}
            {restaurantData.province + ", " + restaurantData.postalCode}
            {"\n"}
            {restaurantData.phone}
            {"\n"}
          </Text>
          <FlatList
            data={menuData}
            keyExtractor={(item, index) => { return index.toString(); }}
            renderItem={menuItem}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 1,
  },
  button: {
    padding: 20,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  buttontext: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#009688",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  storyimage: {
    height: 80,
    width: 80,
    alignSelf: "center",
  },
  menuimage: {
    height: 50,
    width: 50,
    alignSelf: "center",
    marginBottom: 20,
    marginRight: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  address: {
    fontSize: 18,
    padding: 20,
  },
  menuitem: {
    margin: 10,
  },
  itemRow: { flexDirection: "row", marginLeft: 10 },
  hLine: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
  },
});
