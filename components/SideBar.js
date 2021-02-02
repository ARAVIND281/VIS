import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ToastAndroid
} from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import { SafeAreaView } from "react-navigation";
import firebase from "firebase";
import db from "../config";
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
export default class SideBar extends Component {

  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      name: '',
      grade: '',
      section: '',
    }
  }

  getUserDetails = () => {
    db.collection("students")
      .where("email_id", "==", this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            name: doc.data().name,
            grade: doc.data().grade,
            section: doc.data().section,
          });
        });
      });
  }

  componentDidMount() {
    this.getUserDetails()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1338BF",
          }}
        >
          {this.state.name.length <= 17 ? (
            <Text
              style={{
                fontWeight: "bold",
                fontSize: RFValue(20),
                color: "#fff",
                padding: RFValue(10),
              }}
            >
              {this.state.name}
            </Text>
          ) : (
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: RFValue(15),
                  color: "#fff",
                  padding: RFValue(10),
                }}
              >
                {this.state.name}
              </Text>
            )
          }
          <Text
            style={{
              fontWeight: "bold",
              fontSize: RFValue(15),
              color: "#fff",
              padding: RFValue(10),
            }}
          >
            {this.state.grade} {this.state.section}
          </Text>

        </View>
        <View style={{ flex: 0.7 }}>
          <ScrollView>
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItems {...this.props} />
            </SafeAreaView>
          </ScrollView>
        </View>
        <View style={{ flex: 0.1 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              height: "100%",
            }}
            onPress={() => {
              firebase.auth().signOut();
              this.props.navigation.navigate("LoginScreen");
              ToastAndroid.showWithGravityAndOffset(
                "Sign out Successfully",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              )
            }}
          >
            <Icon
              name="sign-out-alt"
              type="font-awesome-5"
              size={RFValue(35)}
              iconStyle={{ paddingLeft: RFValue(10) }}
            />

            <Text
              style={{
                fontSize: RFValue(15),
                fontWeight: "bold",
                marginLeft: RFValue(30),
              }}
            >
              Log Out
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerItemsContainer: {
    flex: 0.8,
  },
  logOutContainer: {
    flex: 0.2,
    justifyContent: "flex-end",
    paddingBottom: 30,
    flexDirection: "row",
  },
  logOutButton: {
    height: 30,
    width: "85%",
    justifyContent: "center",
    padding: 10,
  },
  imageContainer: {
    flex: 0.75,
    width: "40%",
    height: "20%",
    marginLeft: 20,
    marginTop: 30,
    borderRadius: 40,
  },
  logOutText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});