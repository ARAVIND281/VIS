import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    ToastAndroid
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import { Input } from "react-native-elements";
import MyHeader from "../components/MyHeader";

export default class TalkToAo extends Component {
    constructor() {
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            subject: "",
            description: "",
            IsBookRequestActive: "",
            docId: "",
            name: "",
            contact: "",
            section: '',
            grade: ''
        };
    }

    createUniqueId() {
        return Math.random().toString(36).substring(7);
    }

    addFeedBack = (subject, description) => {
        var userId = this.state.userId;
        var randomRequestId = this.createUniqueId();

        db.collection("ao").add({
            user_id: userId,
            subject: subject,
            description: description,
            FeedBack_id: randomRequestId,
            name: this.state.name,
            contact: this.state.contact,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            state: 'unread',
        });

        return ToastAndroid.showWithGravityAndOffset(
            "FeedBack Send Successfully Your FeedBack ID is" + randomRequestId,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };

    getUserDetails = () => {
        db.collection("students")
            .where("email_id", "==", this.state.userId)
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    var data = doc.data();
                    this.setState({
                        name: data.name,
                        contact: data.contact,
                        docId: doc.id,
                        grade: doc.grade,
                        section: doc.section,
                    });
                });
            });
    };

    componentDidMount() {
        this.getUserDetails();
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View>
                        <MyHeader title="FeedBack" navigation={this.props.navigation} />
                    </View>
                    <View style={{ flex: 0.9 }}>
                        <Text style={styles.label}>
                            I am Savitha administrator of VIS.
                        {this.state.name} is the heart of our school and we care deeply for you.
                        Please raise any critical, unresolved issues, to me.
                        Your feedback will be 100% anonymous and acted upon promptly.
                    </Text>
                        <Input
                            style={styles.formTextInput}
                            label={"Subject"}
                            placeholder={"Subject"}
                            containerStyle={{ marginTop: RFValue(60) }}
                            onChangeText={(text) => this.setState({
                                subject: text
                            })}
                            value={this.state.subject}
                        />

                        <View style={{ alignItems: "center" }}>
                            <Input
                                style={[styles.formTextInput, { height: RFValue(200) }]}
                                containerStyle={{ marginTop: RFValue(30) }}
                                multiline
                                numberOfLines={8}
                                label={"Description"}
                                placeholder={"Description"}
                                onChangeText={(text) => {
                                    this.setState({
                                        description: text,
                                    });
                                }}
                                value={this.state.description}
                            />
                            <TouchableOpacity
                                style={[styles.button, { marginTop: RFValue(30) }]}
                                onPress={() => {
                                    this.addFeedBack(
                                        this.state.subject,
                                        this.state.description
                                    );
                                }}
                            >
                                <Text style={styles.requestbuttontxt}>Send FeedBack</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    formTextInput: {
        width: "75%",
        height: RFValue(45),
        borderWidth: 1,
        padding: 10,
    },
    buttontxt: {
        fontSize: RFValue(18),
        fontWeight: "bold",
        color: "#fff",
    },
    touchableopacity: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        width: "90%",
    },
    requestbuttontxt: {
        fontSize: RFValue(20),
        fontWeight: "bold",
        color: "#fff",
    },
    button: {
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
    },
    label: {
        fontSize: RFValue(15),
        color: "#717D7E",
        fontWeight: 'bold',
        padding: RFValue(10),
        marginLeft: RFValue(20)
    },
});