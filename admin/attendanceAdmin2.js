import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ScrollView,
    Alert,
    Image,
    FlatList
} from 'react-native';
import { Icon, Input, Header, Avatar, ListItem } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase'
import db from '../config';

export default class attendanceAdmin2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: "",
            userid: firebase.auth().currentUser.email,
            name: "",
            docId: "",
            state: '',
            id: '',
            classes: [],
            grade: '',
            link: '',
            time: null,
            textData: this.props.navigation.getParam("details")["textData"],
        }
    }

    getClasses = async (textData) => {
        var studentsRef = await db.collection('classes')
            .where('end', '==', true)
            .where('textData', '==', this.state.textData)
            .orderBy('grade', 'desc')
            .onSnapshot((snapshot) => {
                var classes = snapshot.docs.map((doc) => doc.data())
                this.setState({
                    classes: classes
                });
            })
    }

    keyExtractor = (index) => index.toString()

    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                bottomDivider
                title={'Grade ' + item.grade}
                subtitle={'Subject: ' + item.subject + '\nDate: ' + item.refDate + '\nTeacher Name: ' + item.teacherName}
                rightElement={
                    <TouchableOpacity
                        style={[styles.start, { backgroundColor: 'lightgreen' }]}
                        onPress={() => {
                            this.props.navigation.navigate("attendanceAdmin3", { "details": item })
                        }
                        }
                    >
                        <Image
                            source={require('../assets/attendance.jpg')}
                            style={{ height: RFValue(50), width: RFValue(50) }}
                        />
                    </TouchableOpacity>
                }
            />
        )
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
                    this.getClasses();
                });
            });
    }

    componentDidMount() {
        this.getUserDetails();
    }

    render() {
        if (this.state.classes.length == 0) {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
                    <View>
                        <Header
                            leftComponent={<Icon name='arrow-alt-circle-left' type='font-awesome-5' color='#fff' solid={false} size={RFValue(40)} onPress={() => this.props.navigation.goBack()} />}
                            centerComponent={{ text: 'CLASSES', style: { color: '#fabf10', fontSize: 20, fontWeight: "bold", } }}
                            rightComponent={<Image
                                source={require('../assets/logo.png')}
                                style={{ width: '92%', height: '100%' }}
                            />}
                            backgroundColor="#1338BF"
                        />
                    </View>
                    <View style={{
                        flex: 0.88,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image
                            source={require('../assets/Notification.png')} />
                        <Text style={{ fontSize: RFValue(23) }}>No Class Found</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
                    <View>
                        <Header
                            leftComponent={<Icon name='arrow-alt-circle-left' type='font-awesome-5' color='#fff' solid={false} size={RFValue(40)} onPress={() => this.props.navigation.goBack()} />}
                            centerComponent={{ text: 'CLASSES', style: { color: '#fabf10', fontSize: 20, fontWeight: "bold", } }}
                            rightComponent={<Image
                                source={require('../assets/logo.png')}
                                style={{ width: '92%', height: '100%' }}
                            />}
                            backgroundColor="#1338BF"
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.classes}
                            renderItem={this.renderItem}
                        />
                    </View>
                </View>
            );
        }
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