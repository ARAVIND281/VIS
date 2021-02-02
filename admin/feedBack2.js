import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ScrollView,
    Alert,
    Linking,
    Image
} from 'react-native';
import { Icon, Input, Header, Avatar } from 'react-native-elements';
import MyHeader from "../components/MyHeader";
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase'
import db from '../config';
import { GiftedChat, Actions, Day, } from 'react-native-gifted-chat';
import * as ImagePicker from "expo-image-picker";

export default class ClassUpdate2 extends Component {
    uid = '';
    messagesRef = null;
    constructor(props) {
        super(props);
        this.state = {
            contact: "",
            userid: firebase.auth().currentUser.email,
            name: "",
            docId: "",
            id: '',
            feedBack: [],
            state: '',
            feedBackState: this.props.navigation.getParam("details")["Problem"],
            studentName: this.props.navigation.getParam("details")["studentName"],
            studentGrade: this.props.navigation.getParam("details")["studentGrade"],
            feedBacksubject: this.props.navigation.getParam("details")["subject"],
            feedBackhwproblem: this.props.navigation.getParam("details")["hwproblem"],
            studentContact: this.props.navigation.getParam("details")["studentContact"],
            feedBackTeacherName: this.props.navigation.getParam("details")["TeacherName"],
            homeWorkDescription: this.props.navigation.getParam("details")["Description"],
            FeedBack_id: this.props.navigation.getParam("details")["FeedBack_id"],
            otherSubject: this.props.navigation.getParam("details")["subject"],
            otherdescription: this.props.navigation.getParam("details")["description"],
            FeedBack_id: this.props.navigation.getParam("details")["FeedBack_id"],
        }
    }

    changeToRead = async () => {
        await db.collection("parentFeedback")
            .where('FeedBack_id', '==', this.state.FeedBack_id)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach(async (doc) => {
                    await db.collection("parentFeedback")
                        .doc(doc.id)
                        .update({
                            read: "read"
                        })
                });
            });
    }

    getUserDetails = () => {
        db.collection("admin")
            .where("email_id", "==", this.state.userid)
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
        this.getUserDetails();
        this.changeToRead()
    }

    render() {
        if (this.state.feedBackState == 'academic/teaching') {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
                    <View>
                        <Header
                            leftComponent={<Icon name='arrow-alt-circle-left' type='font-awesome-5' color='#fff' solid={false} size={RFValue(40)} onPress={() => this.props.navigation.goBack()} />}
                            centerComponent={{ text: 'Feed Back', style: { color: '#fabf10', fontSize: 20, fontWeight: "bold", } }}
                            rightComponent={<Image
                                source={require('../assets/logo.png')}
                                style={{ width: '92%', height: '100%' }}
                            />}
                            backgroundColor="#1338BF"
                        />
                    </View>
                    <ScrollView>
                        <View>
                            <Text style={{
                                fontSize: RFValue(18),
                                fontWeight: 'bold',
                                padding: RFValue(10),
                                marginLeft: RFValue(20),
                                color: "red",
                                textAlign: 'center'
                            }}>Feed Back from {this.state.studentName}'s({this.state.studentGrade}) Parent</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Feed Back Topic</Text>
                            <Text style={styles.label1}>{this.state.feedBackState}</Text>
                            <Text style={styles.label}>Subject</Text>
                            <Text style={styles.label1}>{this.state.feedBacksubject}</Text>
                            <Text style={styles.label}>Teacher Name</Text>
                            <Text style={styles.label1}>{this.state.feedBackTeacherName}</Text>
                            <Text style={styles.label}>Problem Description</Text>
                            <Text style={styles.label1}>{this.state.homeWorkDescription}</Text>
                        </View>
                        <View style={{ alignItems: "center", marginTop: RFValue(50) }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    Linking.openURL(`tel:${this.state.studentContact}`)
                                }}
                            >
                                <Text style={[styles.buttonText, { fontWeight: 'bold' }]}>Call Student</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </View>
            );
        }
        if (this.state.feedBackState == 'academic/HomeWork') {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
                    <View>
                        <Header
                            leftComponent={<Icon name='arrow-alt-circle-left' type='font-awesome-5' color='#fff' solid={false} size={RFValue(40)} onPress={() => this.props.navigation.goBack()} />}
                            centerComponent={{ text: 'Feed Back', style: { color: '#fabf10', fontSize: 20, fontWeight: "bold", } }}
                            rightComponent={<Image
                                source={require('../assets/logo.png')}
                                style={{ width: '92%', height: '100%' }}
                            />}
                            backgroundColor="#1338BF"
                        />
                    </View>
                    <ScrollView>
                        <View>
                            <Text style={{
                                fontSize: RFValue(18),
                                fontWeight: 'bold',
                                padding: RFValue(10),
                                marginLeft: RFValue(20),
                                color: "red",
                                textAlign: 'center'
                            }}>Feed Back from {this.state.studentName}'s({this.state.studentGrade}) Parent</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Feed Back Topic</Text>
                            <Text style={styles.label1}>{this.state.feedBackState}</Text>
                            <Text style={styles.label}>Subject</Text>
                            <Text style={styles.label1}>{this.state.feedBacksubject}</Text>
                            <Text style={styles.label}>Problem</Text>
                            <Text style={styles.label1}>{this.state.feedBackhwproblem}</Text>
                        </View>
                        <View style={{ alignItems: "center", marginTop: RFValue(50) }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    Linking.openURL(`tel:${this.state.studentContact}`)
                                }}
                            >
                                <Text style={[styles.buttonText, { fontWeight: 'bold' }]}>Call Student</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            );
        }
        if (this.state.feedBackState == 'academic/other') {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
                    <View>
                        <Header
                            leftComponent={<Icon name='arrow-alt-circle-left' type='font-awesome-5' color='#fff' solid={false} size={RFValue(40)} onPress={() => this.props.navigation.goBack()} />}
                            centerComponent={{ text: 'Feed Back', style: { color: '#fabf10', fontSize: 20, fontWeight: "bold", } }}
                            rightComponent={<Image
                                source={require('../assets/logo.png')}
                                style={{ width: '92%', height: '100%' }}
                            />}
                            backgroundColor="#1338BF"
                        />
                    </View>
                    <ScrollView>
                        <View>
                            <Text style={{
                                fontSize: RFValue(18),
                                fontWeight: 'bold',
                                padding: RFValue(10),
                                marginLeft: RFValue(20),
                                color: "red",
                                textAlign: 'center'
                            }}>Feed Back from {this.state.studentName}'s({this.state.studentGrade}) Parent</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Feed Back Topic</Text>
                            <Text style={styles.label1}>{this.state.feedBackState}</Text>
                            <Text style={styles.label}>Feed Back Subject</Text>
                            <Text style={styles.label1}>{this.state.otherSubject}</Text>
                            <Text style={styles.label}>Problem Description</Text>
                            <Text style={styles.label1}>{this.state.otherdescription}</Text>
                        </View>
                        <View style={{ alignItems: "center", marginTop: RFValue(50) }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    Linking.openURL(`tel:${this.state.studentContact}`)
                                }}
                            >
                                <Text style={[styles.buttonText, { fontWeight: 'bold' }]}>Call Student</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
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
})