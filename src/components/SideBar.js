import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Image,
  ImageBackground
} from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import { SafeAreaView } from "react-navigation";
import { Icon } from "react-native-elements";

export default class SideBar extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.2, backgroundColor: "#DAFED9" }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#11102E",
              borderBottomRightRadius: 65
            }}
          />
        </View>
        <View style={{ flex: 0.7, backgroundColor: "#100F2D", borderBottomRightRadius: 65 }}>

          <View style={{
            flex: 1,
            borderTopLeftRadius: 65,
            backgroundColor: "#DAFED9",
            borderBottomRightRadius: 65
          }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={{
                marginTop: 50,
                alignItems: "center",
              }} >
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>ARAVIND</Text>
                <Text style={{
                  fontSize: 15,
                }}>aravind@inbo.com</Text>
              </View>
              <Image
                source={require('../image/image.png')}
                style={{ height: 80, width: 80, backgroundColor: "#ffffff", borderRadius: 100, position: 'absolute', top: -40 }}
              />
            </View>
            <ScrollView>
              <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <DrawerItems {...this.props} />
              </SafeAreaView>
              <View style={{
                height: 50,
                flexDirection: "row",
                paddingLeft: 38,
                alignItems: "center",
                marginTop: 10
              }} >
                <TouchableOpacity style={{                  
                  flexDirection: "row",            
                  alignItems: "center",                  
                }}
                onPress={() => this.props.navigation.navigate("LoginScreen")}
                >
                  <Icon
                    reverse
                    name="sign-out-alt"
                    type="font-awesome-5"
                    color='#000000'
                    size={18}
                  />
                  <Text style={{
                    marginLeft: 10,
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={{ flex: 0.15, backgroundColor: "#794FBD" }}>
          <ImageBackground source={require('../image/drawer.png')} style={styles.image}>
          </ImageBackground>
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
    borderRadius: 40
  },
  logOutText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: "105%",
    marginBottom: -15
  },
  top: {
    height: 50,
    flexDirection: "row",
    paddingLeft: 40,
    alignItems: "center",
  },
});