import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ScrollView,
    Alert,
    ImageBackground
} from 'react-native';
import { Icon, Input, ListItem, Avatar } from 'react-native-elements';
import MyHeader from "../components/MyHeader";
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase'
import db from '../config';
import { GiftedChat, Actions, Day, } from 'react-native-gifted-chat';
import * as ImagePicker from "expo-image-picker";

export default class ChatTeacher extends Component {
    uid = '';
    messagesRef = null;
    constructor(props) {
        super(props);
        this.state = {
            userid: firebase.auth().currentUser.email,
            docId: '',
            messages: [],
            name: '',
            grade: '',
            section: '',
            docId: '',
            id: ''
        }
    }

    getUserDetails = () => {
        db.collection("teacher")
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
                        image: ''
                    });
                    this.loadMessages('teacherChat', (message) => {
                        this.setState((previousState) => {
                            return {
                                messages: GiftedChat.append(previousState.messages, message),
                            };
                        });
                    });
                });
            });
    }

    fetchImage = (imageName) => {
        var storageRef = firebase
            .storage()
            .ref()
            .child("user_profiles/" + imageName);

        storageRef
            .getDownloadURL()
            .then((url) => {
                this.setState({ image: url });
            })
            .catch((error) => {
                this.setState({ image: "https://firebasestorage.googleapis.com/v0/b/inbo-chat-a81c7.appspot.com/o/user_profiles%2F0c3b3adb1a7530892e55ef36d3be6cb8.png?alt=media&token=7818f4b2-e6cf-4342-8666-424c4636a430" });
            });
    }

    componentDidMount() {
        this.getUserDetails();
        this.fetchImage(this.state.userid);
    }


    loadMessages = (where, callback) => {
        this.messagesRef = firebase.database().ref(where);
        this.messagesRef.off();
        const onReceive = (data) => {
            const message = data.val();
            callback({
                _id: data.key,
                text: message.text,
                createdAt: new Date(message.createdAt),
                user: {
                    _id: message.user._id,
                    name: message.user.name,
                    avatar: message.user.avatar
                },
            });
        };
        this.messagesRef.limitToLast(900000).on('child_added', onReceive);
    };

    renderDay(props) {
        return <Day {...props} textStyle={{ color: '#000', fontWeight: 'bold', fontSize: RFValue(14) }} />
    }

    sendMessage(message) {
        for (let i = 0; i < message.length; i++) {
            this.messagesRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
            });
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
                <ImageBackground source={require('../assets/bg.png')} style={styles.image}>
                    <View>
                        <MyHeader title='Talk with Teachers' navigation={this.props.navigation} />
                    </View>
                    <GiftedChat
                        messages={this.state.messages}
                        onSend={(message) => {
                            this.sendMessage(message);
                        }}
                        user={{
                            _id: this.state.userid,
                            name: this.state.name,
                            avatar: this.state.image
                        }}
                        scrollToBottom
                        alwaysShowSend={true}
                        renderUsernameOnMessage={true}
                        scrollToBottomComponent={() => (
                            <Icon name='arrow-down' type='font-awesome-5' />
                        )}
                        isTyping={true}
                        isLoadingEarlier={true}
                        timeTextStyle={{ left: { color: 'green' }, right: { color: 'yellow' } }}
                        isTyping={true}
                        infiniteScroll
                        renderActions={this.renderActions}
                        showAvatarForEveryMessage={true}
                        renderDay={this.renderDay}
                    />
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    add1: {
        width: RFValue(65),
        height: RFValue(65),
        marginTop: RFValue(20),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(100),
        backgroundColor: "#a901ff",
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
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        shadowOpacity: 0.3,

    },
})