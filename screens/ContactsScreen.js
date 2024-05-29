import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Chip } from "react-native-paper";

function ContactsScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api-v2.hopcrm.com/api/mobile/contacts?page=3")
      .then((response) => response.json())
      .then((json) => setContacts(json.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const [selectedLetter, setSelectedLetter] = useState("");

  const sortedContacts = contacts.sort((a, b) => a.nom.localeCompare(b.nom));

  const groupedContacts = sortedContacts.reduce((acc, contact) => {
    const firstLetter = contact.nom.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {});

  const flatListRef = useRef(null);

  const scrollToSection = (section) => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: Object.keys(groupedContacts).indexOf(section),
    });
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#00ff00"
        style={{ alignItems: "center" }}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={Object.keys(groupedContacts)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.header}>{item}</Text>
              {groupedContacts[item].map((contact, index) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("ContactDetails")}
                  key={index}
                >
                  <View style={styles.contactItem}>
                    <Image
                      source={{
                        uri: "https://randomuser.me/api/portraits/men/32.jpg",
                      }}
                      style={styles.avatar}
                    />
                    <View style={{ flexDirection: "column" }}>
                      <Text style={{ fontSize: 16, color: "black" }}>
                        {contact.nom ? contact.nom : "Entreprise"}
                      </Text>
                      <Text style={{ fontSize: 12, color: "gray" }}>
                        {contact.entreprise}
                      </Text>
                    </View>
                    <View style={styles.statusBadge}>
      <Text style={styles.statusText}>client</Text>
    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
          contentContainerStyle={{ flexGrow: 1 }}
        />
        <View style={styles.sideIndex}>
          {Object.keys(groupedContacts).map((letter) => (
            <TouchableOpacity
              key={letter}
              onPress={() => scrollToSection(letter)}
            >
              <Text style={styles.sideIndexLetter}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "lightgray",
    padding: 5,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  sideIndex: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
    position: "fixed",
    right: 0,
  },
  sideIndexLetter: {
    fontSize: 16,
    marginVertical: 5,
  },
  statusBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'green',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ContactsScreen;
