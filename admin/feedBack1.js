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
    Linking
} from "react-native";
import { Input, Icon, ListItem, Avatar } from "react-native-elements";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

export default class feedBack1 extends Component {

    constructor() {
        super();
        this.state = {
            contact: "",
            userid: firebase.auth().currentUser.email,
            name: "",
            docId: "",
            id: '',
            feedBack: [],
            state: ''
        };
    }

    getFeedBack = () => {
        db.collection('parentFeedback')
            .orderBy('read', 'desc')
            .orderBy('date', 'desc')
            .orderBy('studentName','asc')
            .onSnapshot((snapshot) => {
                var feedBack = snapshot.docs.map((doc) => doc.data())
                this.setState({
                    feedBack: feedBack
                });
            })
    }

    keyExtractor = (index) => index.toString()

    renderItem = ({ item, i }) => {
        if (item.read == 'unread') {
            return (
                <ListItem
                    key={i}
                    bottomDivider
                    title={item.studentName + '(' + item.studentGrade + ')'}
                    subtitle={'Problem in ' + item.Problem}
                    rightElement={
                        <TouchableOpacity
                            style={[styles.start, { backgroundColor: 'lightgreen' }]}
                            onPress={() => {
                                this.props.navigation.navigate("feedBack2", { "details": item })
                            }
                            }
                        >
                            <Icon name="arrow-alt-circle-right" type="font-awesome-5" solid={true} size={RFValue(35)} />
                        </TouchableOpacity>
                    }
                />
            )
        }
        if (item.read == 'read') {
            return (
                <ListItem
                    key={i}
                    bottomDivider
                    title={item.studentName + '(' + item.studentGrade + ')'}
                    subtitle={'Problem in ' + item.Problem}
                    rightElement={
                        <TouchableOpacity
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                height: RFValue(60),
                                paddingLeft: RFValue(5),
                                paddingRight: RFValue(5)
                            }}
                            onPress={() => {
                                this.props.navigation.navigate("feedBack2", { "details": item })
                            }
                            }
                        >
                            <Icon name="arrow-alt-circle-right" type="font-awesome-5" solid={true} size={RFValue(35)} />
                        </TouchableOpacity>
                    }
                />
            )
        }
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
                    this.getFeedBack();
                });
            });
    }

    componentDidMount() {
        this.getUserDetails();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
                <View>
                    <MyHeader title="Feed Back" navigation={this.props.navigation} />
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.feedBack}
                        renderItem={this.renderItem}
                    />
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
    start: {
        borderRadius: RFValue(15),
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        justifyContent: "center",
        alignItems: "center",
        height: RFValue(60),
        paddingLeft: RFValue(5),
        paddingRight: RFValue(5)
    },
    registerButtonText: {
        fontSize: RFValue(23),
        fontWeight: "bold",
        color: "#fff",
    },
    label1: {
        fontSize: RFValue(18),
        color: "#a901ff",
        fontWeight: 'bold',
        marginLeft: RFValue(50)
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
        marginTop: RFValue(35),
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
    signupView: {
        flex: 0.05,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupText: {
        fontSize: RFValue(20),
        fontWeight: "bold",
        color: "#32867d"
    }
});