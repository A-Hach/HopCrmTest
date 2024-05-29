import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Appbar,
  Avatar,
  Menu,
  Title,
  Caption,
  Searchbar,
} from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { StyleSheet, View, ActivityIndicator } from "react-native";
function CustomNavigationBar({ navigation, route, options, back }) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [data, setData] = useState([]);
  const title = getHeaderTitle(options, route.name);
  const [loading, setLoading] = useState(true);

  if (title === "Home") {
    useEffect(() => {
      fetch("https://api-v2.hopcrm.com/api/mobile/sessions/infos")
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
    if (loading) {
      return (
        <LinearGradient
          colors={["#2d9aa8", "#2c768c", "#2b5c77"]}
          style={styles.linearGradient}
        >
          <Appbar.Header style={styles.appBar} statusBarHeight={30}>
            <ActivityIndicator
              size="large"
              color="#00ff00"
              style={{ alignItems: "center" }}
            />
          </Appbar.Header>
        </LinearGradient>
      );
    } else {
      return (
        <LinearGradient
          colors={["#2d9aa8", "#2c768c", "#2b5c77"]}
          style={styles.linearGradient}
        >
          <Appbar.Header style={styles.appBar} statusBarHeight={30}>
            <Avatar.Image
              size={50}
              source={{
                uri: "https://randomuser.me/api/portraits/men/32.jpg",
              }}
            />
            <View style={styles.titleContainer}>
              <Title style={styles.title}>Bonjour {data.user.nom}</Title>
              <Caption style={styles.subtitle}>{data.client.nom}</Caption>
            </View>
            <View style={styles.menus}>
              <Appbar.Action icon="bell-outline" color="white" />
              <Menu
                style={styles.menu}
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <Appbar.Action icon="menu" color="white" onPress={openMenu} />
                }
              >
                <Menu.Item
                  onPress={() => {
                    navigation.navigate("Home");
                    closeMenu();
                  }}
                  title="Home"
                />
                <Menu.Item
                  onPress={() => {
                    navigation.navigate("Contacts");
                    closeMenu();
                  }}
                  title="Contacts"
                />
                <Menu.Item
                  onPress={() => {
                    navigation.navigate("ContactDetails");
                    closeMenu();
                  }}
                  title="Contact details"
                />
              </Menu>
            </View>
          </Appbar.Header>
        </LinearGradient>
      );
    }
  } else if (title == "Contacts") {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [searching, setSearching] = React.useState("magnify");
    const onChangeSearch = (query) => setSearchQuery(query);
    const onFocus = () => setSearching("eraser-variant");
    const onDismiss = () => setSearching("magnify");
    return (
      <LinearGradient
        colors={["#2d9aa8", "#2c768c", "#2b5c77"]}
        style={styles.linearGradient}
      >
        <Appbar.Header style={styles.appBar} statusBarHeight={30}>
          <Searchbar
            placeholder="Rechercher"
            onChangeText={onChangeSearch}
            onFocus={onFocus}
            value={searchQuery}
            iconColor="white"
            style={styles.searchBar}
          />
          <View style={styles.searchBarIcon}>
            <Appbar.Action icon={searching} color="white" />
          </View>
          <View style={styles.menus}>
            <Appbar.Action icon="bell-outline" color="white" />
            <Menu
              style={styles.menu}
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Appbar.Action icon="menu" color="white" onPress={openMenu} />
              }
            >
              <Menu.Item
                onPress={() => {
                  navigation.navigate("Home");
                  closeMenu();
                }}
                title="Home"
              />
              <Menu.Item
                onPress={() => {
                  navigation.navigate("Contacts");
                  closeMenu();
                }}
                title="Contacts"
              />
              <Menu.Item
                onPress={() => {
                  navigation.navigate("ContactDetails");
                  closeMenu();
                }}
                title="Contact details"
              />
            </Menu>
          </View>
        </Appbar.Header>
      </LinearGradient>
    );
  } else {
    useEffect(() => {
      fetch(
        "https://api-v2.hopcrm.com/api/mobile/contacts/afa7aa56c0e6da93ec3f6663484957c2"
      )
        .then((response) => response.json())
        .then((json) => setData(json.contact))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
    if (loading) {
      return (
        <LinearGradient
          colors={["#2d9aa8", "#2c768c", "#2b5c77"]}
          style={styles.linearGradient}
        >
          <Appbar.Header style={styles.appBar} statusBarHeight={30}>
            <ActivityIndicator
              size="large"
              color="#00ff00"
              style={{ alignItems: "center" }}
            />
          </Appbar.Header>
        </LinearGradient>
      );
    } else {
      return (
        <LinearGradient
          colors={["#2d9aa8", "#2c768c", "#2b5c77"]}
          style={styles.linearGradient}
        >
          <Appbar.Header style={styles.appBar} statusBarHeight={100}>
            <View style={styles.column}>
              <View style={styles.firstRow}>
                <Appbar.BackAction
                  onPress={navigation.goBack}
                  size={20}
                  color="white"
                />
                <Appbar.Content title="Contacts" color="white" />
                <Caption style={styles.modi}>modifier</Caption>
              </View>
              <View style={styles.secondRow}>
                <Avatar.Image
                  size={50}
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/32.jpg",
                  }}
                />
                <View style={styles.titleContainer}>
                  <Title style={styles.title}>
                    {data.nom} {data.prenom}
                  </Title>
                  <Caption style={styles.subtitle}>
                    HOP ONLINE - {data.e_mail} - +212626448{" "}
                  </Caption>
                </View>
                <View style={styles.menus}>
                  <Appbar.Action icon="email-newsletter" color="white" />
                  <Menu
                    style={styles.menu}
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon="phone" color="white" />}
                  >
                    <Menu.Item
                      onPress={() => {
                        navigation.navigate("Home");
                        closeMenu();
                      }}
                      title="Home"
                    />
                    <Menu.Item
                      onPress={() => {
                        navigation.navigate("Contacts");
                        closeMenu();
                      }}
                      title="Contacts"
                    />
                    <Menu.Item
                      onPress={() => {
                        navigation.navigate("ContactDetails");
                        closeMenu();
                      }}
                      title="Contact details"
                    />
                  </Menu>
                </View>
              </View>
            </View>
          </Appbar.Header>
        </LinearGradient>
      );
    }
  }
}
const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "transparent",
    marginLeft: 5,
  },
  titleContainer: {
    marginLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 10,
    color: "white",
  },
  menus: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "0",
    position: "absolute",
    right: 0,
  },
  searchBar: {
    width: "75%",
    height: "80%",
    borderRadius: 50,
    justifyContent: "center",
    backgroundColor: "white",
  },
  menu: {
    marginTop: "20%",
  },
  searchBarIcon: {
    borderRadius: 50,
    backgroundColor: "lightblue",
    marginLeft: "-14%",
  },
  firstRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  secondRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    //marginTop:150,
  },
  column: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 55,
  },
  modi: {
    fontSize: 16,
    color: "white",
    flexDirection: "row",
    alignItems: "center",
  },
});
export default CustomNavigationBar;
