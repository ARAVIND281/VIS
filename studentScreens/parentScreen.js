import React, { Component } from "react";
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView,
    FlatList,
    Linking,
    Vibration
} from "react-native";
import { Input, Icon, ListItem, Avatar } from "react-native-elements";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

export default class parentScreen extends Component {
    constructor() {
        super();
        this.state = {
            contact: "",
            docId: "",
            userid: firebase.auth().currentUser.email,
            name: "",
            section: '',
            grade: '',
            id: '',
            newPassword: '',
            password: null,
            textPassword: ''
        }
    }

    getUserDetails = () => {
        db.collection("students")
            .where("email_id", "==", this.state.userid)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        name: doc.data().name,
                        grade: doc.data().grade,
                        section: doc.data().section,
                        contact: doc.data().contact,
                        id: doc.data().id,
                        docId: doc.id,
                        password: doc.data().password,
                    });
                    this.updatePassword(doc.data().password)
                });
            });
    }

    updatePassword = (password) => {
        if (password === undefined) {
            db.collection("students")
                .doc(this.state.userid)
                .update({
                    password: this.state.contact
                })
        }
    }

    componentDidMount() {
        this.getUserDetails();
    }

    login = () => {
        if (this.state.textPassword.length == 0) {
            Alert.alert(
                "Invalid password",
                "Please Enter Passward",
                [
                    {
                        text: "Forgot Password",
                        onPress: () => {
                            Alert.alert(
                                "Forgot Password",
                                "For Recovery Password Call School",
                                [
                                    {
                                        text: "Call",
                                        onPress: () => { Linking.openURL(`tel:${9384507030}`) },
                                    },
                                    {
                                        text: "Cancel",
                                    },
                                ])
                        }
                    },
                    { text: "OK" }
                ],
            );
            Vibration.vibrate()
        }
        if (this.state.textPassword != this.state.password) {
            Alert.alert(
                "Invalid password",
                "Please Enter valid Passward",
                [
                    {
                        text: "Forgot Password",
                        onPress: () => {
                            Alert.alert(
                                "Forgot Password",
                                "For Recovery Password Call School",
                                [
                                    {
                                        text: "Call",
                                        onPress: () => { Linking.openURL(`tel:${+919384507030}`) },
                                    },
                                    {
                                        text: "Cancel",
                                    },
                                ])
                        }
                    },
                    { text: "OK" }
                ],
            );
            Vibration.vibrate()
        }
        if (this.state.textPassword == this.state.password) {
            this.props.navigation.navigate("parentScreen1")
            this.setState({
                textPassword: ''
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <MyHeader title="Parent Login" navigation={this.props.navigation} />
                    </View>
                    <View
                        style={{ flex: 0.25 }}
                    >
                        <View style={{ flex: 0.15 }} />
                        <View style={styles.logo}>
                            <Image
                                source={require('../assets/logo.png')}
                                style={styles.santaImage}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 0.45, marginTop: 20 }}>

                        <View style={styles.TextInput}>
                            <Input
                                style={[styles.loginBox, { marginTop: RFValue(15) }]}
                                secureTextEntry={true}
                                placeholder="Enter Parent Password"
                                placeholderTextColor="#fabf10"
                                leftIcon={
                                    <Icon
                                        name='user-lock'
                                        size={RFValue(30)}
                                        color='black'
                                        type="font-awesome-5"
                                    />
                                }
                                onChangeText={(text) => {
                                    this.setState({
                                        textPassword: text,
                                    });
                                }}
                                value={this.state.textPassword}
                            />
                        </View>
                        <View style={{ flex: 0.5, alignItems: "center", marginTop: 20 }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    this.login();
                                }}
                            >
                                <Text style={styles.buttonText}>Parent Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1.12,
        backgroundColor: "#E5F7FE",
    },
    loginBox: {
        width: "80%",
        height: RFValue(50),
        borderWidth: 1.5,
        borderColor: "#ffffff",
        fontSize: RFValue(20),
        paddingLeft: RFValue(10),
    },
    button: {
        width: "80%",
        height: RFValue(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(25),
        backgroundColor: "#ffff",
        shadowColor: "#000",
        marginBottom: RFValue(10),
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10.32,
        elevation: 16,
    },
    buttonText: {
        color: "#32867d",
        fontWeight: "200",
        fontSize: RFValue(20),
    },
    label: {
        fontSize: RFValue(17),
        color: "#717D7E",
        fontWeight: 'bold',
        paddingLeft: RFValue(10),
        marginLeft: RFValue(20)
    },
    registerButton: {
        width: "75%",
        height: RFValue(50),
        marginTop: RFValue(20),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(3),
        backgroundColor: "#32867d",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: RFValue(10),
    },
    registerButtonText: {
        fontSize: RFValue(23),
        fontWeight: "bold",
        color: "#fff",
    },
    cancelButtonText: {
        fontSize: RFValue(20),
        fontWeight: 'bold',
        color: "#32867d",
        marginTop: RFValue(10)
    },
    scrollview: {
        flex: 1,
        backgroundColor: "#fff"
    },
    signupView: {
        flex: 0.05,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupText: {
        fontSize: RFValue(20),
        fontWeight: "bold",
        color: "#32867d"
    },
    logo: {
        justifyContent: "center",
        alignItems: "center",
        padding: RFValue(10),
        height: RFValue(250),
        marginTop: RFValue(20)
    },
    santaImage: {
        width: "70%",
        height: "100%",
        resizeMode: "stretch"
    },
    TextInput: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center"
    }
});