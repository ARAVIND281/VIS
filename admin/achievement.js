import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView,
    ToastAndroid
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import db from "../config";
import firebase from "firebase";
import { Icon, Input } from "react-native-elements"
import MyHeader from "../components/MyHeader";

export default class achievement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            achievementText: '',
            name: '',
            state: '',
            contact: '',
            id: '',
            docId: '',
            achievementTextChange: ''
        };
    }

    getAchievement = () => {
        db.collection('achievement')
            .orderBy('time', 'desc')
            .limit(1)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        achievementText: doc.data().achievementText,
                        achievementTextChange: doc.data().achievementText,
                    });
                });
            });
    }

    updateAchievement = async () => {
        db.collection('achievement')
            .add({
                time: firebase.firestore.FieldValue.serverTimestamp(),
                name: this.state.name,
                state: this.state.state,
                contact: this.state.contact,
                achievementText: this.state.achievementTextChange,
            })
        return ToastAndroid.showWithGravityAndOffset(
            "Successfully updated achievement",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    }

    getUserDetails = () => {
        db.collection("admin")
            .where("email_id", "==", this.state.userId)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        name: doc.data().name,
                        state: doc.data().state,
                        contact: doc.data().contact,
                        id: doc.data().id,
                        docId: doc.id,
                    });
                });
            });
    }

    componentDidMount() {
        this.getAchievement()
        this.getUserDetails()
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
                <View>
                    <MyHeader title="Achievement" navigation={this.props.navigation} />
                </View>
                <View>
                    <Text style={styles.label}>Previous Achievement</Text>
                    <Text style={styles.label1}>{this.state.achievementText}</Text>
                    <Text style={styles.label}>Update Achievement</Text>
                    <Input
                        style={styles.loginBox}
                        placeholder={'Update Achievement'}
                        onChangeText={(text) => {
                            this.setState({
                                achievementTextChange: text,
                            });
                        }}
                        leftIcon={
                            <Icon
                                name="id-badge"
                                size={RFValue(35)}
                                color="#fabf10"
                                type="font-awesome-5"
                            />
                        }
                        value={this.state.achievementTextChange}
                        style={[styles.formTextInput, { height: RFValue(200) }]}
                        multiline
                    />
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity
                            style={styles.button1}
                            onPress={() => {
                                this.updateAchievement();
                            }}
                        >
                            <Text style={styles.buttonText}>UPDATE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E5F7FE"
    },
    formContainer: {
        flex: 0.88,
        justifyContent: 'center',
    },
    label: {
        fontSize: RFValue(15),
        color: "#717D7E",
        fontWeight: 'bold',
        padding: RFValue(10),
        marginLeft: RFValue(20)
    },
    label1: {
        fontSize: RFValue(18),
        color: "#FD6A02",
        fontWeight: 'bold',
        marginLeft: RFValue(50)
    },
    button1: {
        width: "75%",
        height: RFValue(60),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(50),
        backgroundColor: "#32867d",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: RFValue(35),
        alignItems: "center"
    },
    buttonView: {
        flex: 0.22,
        alignItems: "center",
        marginTop: RFValue(150),
    },
    buttonView1: {
        flex: 0.22,
        alignItems: "center",
        marginTop: RFValue(50),
    },
    buttonText: {
        fontSize: RFValue(23),
        fontWeight: "bold",
        color: "#fff",
    },
    cancelButtonText: {
        fontSize: RFValue(20),
        fontWeight: 'bold',
        color: "#32867d",
        marginTop: RFValue(10),
        textAlign: 'center'
    },
    scrollview: {
        flex: 1,
        backgroundColor: "#fff"
    },
    firstNameModal: {
        flex: 0.5,
        height: 150
    },
    logo: {
        justifyContent: "center",
        alignItems: "center",
        padding: RFValue(10),
        height: RFValue(280)
    },
    loginBox: {
        width: "80%",
        height: RFValue(50),
        borderWidth: 1.5,
        borderColor: "#ffffff",
        fontSize: RFValue(20),
        paddingLeft: RFValue(10),
    },
    formTextInput: {
        width: "75%",
        height: RFValue(45),
        borderWidth: 1,
        padding: 10,
    },
});