import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Switch, SegmentedButtons } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import BottomBar from "./components/Bottombar";
const Tab = createBottomTabNavigator();
function ContactDetailsScreen() {
  const [name, setName] = useState("John Doe");
  const [phone, setPhone] = useState("123-456-7890");
  const [email, setEmail] = useState("johndoe@example.com");

  
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [value, setValue] = React.useState('client');
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(
      "https://api-v2.hopcrm.com/api/mobile/contacts/afa7aa56c0e6da93ec3f6663484957c2"
    )
      .then((response) => response.json())
      .then((json) => setContact(json.contact))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={contact.nom}
        placeholder="Nom"
      />
      <TextInput
        style={styles.input}
        value={contact.prenom}
        placeholder="Prenom"
      />
      <View style={{ flexDirection: "row",alignItems:"center" }}>
        <TextInput
          style={styles.smallInput}
          value={contact.e_mail}
          placeholder="Email"
        />
         <Icon name="email" size={30} color="green" />
        <View >
        <Text style={{fontSize:10}}>Option Mail</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
      </View>
      <View style={{ flexDirection: "row",alignItems:"center" }}>
        <TextInput
          style={styles.smallInput}
          value={contact.telephone_mobile}
          placeholder="telephone mobile"
        />
        <Icon name="phone" size={30} color="green" />
        <View >
        <Text style={{fontSize:10,marginBottom:5}}>Option SMS</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
      </View>
      <View style={{ flexDirection: "row",alignItems:"center" }}>
        <TextInput
          style={styles.smallInput}
          value={contact.telephone_fixe}
          placeholder="telephone fixe"
        />
        <Icon name="phone" size={30} color="green" />
      </View>
      <Text style={{textAlign:"center"}}>Status</Text>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'prospect',
            label: 'Prospect',
          },
          {
            value: 'client',
            label: 'Client',
          },
          { value: 'partenaire', label: 'Partenaire' },
        ]}
      />
      <BottomBar/>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"flex-start",
    marginTop:25
    
    
  },
  input: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderColor: "lightgray",
    marginBottom: 60,
    paddingHorizontal: 10,
    marginLeft:10
  },
  smallInput: {
    width: "70%",
    height: 50,
    borderWidth: 1,
    borderColor: "lightgray",
    marginBottom: 30,
    paddingHorizontal: 10,
    marginLeft:5
  },
});
export default ContactDetailsScreen;
