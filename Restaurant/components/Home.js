import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";

export default function HomePage({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://apipool.azurewebsites.net/api/restaurants")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const restaurantItem = (({ item }) => (
<TouchableWithoutFeedback
  onPress={() => {
    navigation.navigate("RestaurantDetail", { id: item.restaurantId });
  }}
>
      <View style={styles.itemRow} key={item.id}>
        <Image style={styles.image} source={{uri: item.logoUrl}} />
        <Text style={styles.restaurantName}>
          {item.restaurantName}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  ));
  
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.main}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => {return index.toString();}}
            renderItem={restaurantItem}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: 30,
    paddingBottom: 30,
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: { 
    marginRight: 10, 
    marginBottom: 10,
    width: 90,
    height: 90,
   },
  restaurantName: { fontSize: 20 },
  itemRow: { flexDirection: "row", marginLeft: 10 },
  main: {
    flex: 0.9,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
