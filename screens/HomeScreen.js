import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://api-v2.hopcrm.com/api/mobile/infos/volumetrie")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" style={{alignItems:"center"}} />;
  } else {
    function Cards( prop ) {
      return (
        <TouchableOpacity  onPress={() => navigation.navigate("Contacts")}>
      <Card style={styles.card}>
        <ImageBackground
          source={{ uri: "https://images.pexels.com/photos/326333/pexels-photo-326333.jpeg" }}
          imageStyle={{ borderRadius: 10,padding:10,height:150, }}
        >
          <Card.Content>
            <Title style={{textAlign:"center",textAlignVertical:"center",textTransform:"uppercase",position:"relative",top:"150%",color:"white",fontSize:16}}>{prop.item}</Title>
          </Card.Content>
        </ImageBackground>
      </Card>
      </TouchableOpacity>)
    };
    return (
      <ScrollView>
        <View style={styles.container}>
          {Object.keys(data).map((menu) => (
           
            <Cards item={menu} key={menu} />
          ))}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },
  card: {
    width: 200,
    height:150, // Adjust the width as needed to fit two columns
    aspectRatio: 1,
    borderRadius: 10,
    marginVertical: 5,
    textAlign: 'center',
  },
});
export default HomeScreen;
