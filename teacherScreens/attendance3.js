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
import { Icon, Input, Header, Avatar, ListItem, Overlay } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase'
import db from '../config';

export default class attendance3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: firebase.auth().currentUser.email,
            classId: this.props.navigation.getParam("details")["classId"],
            name: '',
            contact: '',
            id: '',
            docId: '',
            attendance: [],
            absent: false,
            studentId: '',
            studentName: '',
            studentGrade: ''
        }
    }

    attendance = () => {
        var attendance = db.collection(this.state.classId)
            .where('present', '==', true)
            .onSnapshot((snapshot) => {
                var attendance = snapshot.docs.map((doc) => doc.data())
                this.setState({
                    attendance: attendance
                });
            })
    }

    keyExtractor = (index) => index.toString()

    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                bottomDivider
                title={item.name}
                subtitle={'Grade: ' + item.grade + ' ' + item.section}
                leftAvatar={
                    <Avatar rounded source={{ uri: item.imageurl }} size={RFValue(50)} />
                }
                rightElement={
                    <Icon
                        Icon name='ellipsis-v' type='font-awesome-5'
                        color='#000'
                        solid={false}
                        size={RFValue(25)}
                        onPress={() => {
                            this.setState({
                                absent: true,
                                studentId: item.user_id,
                                studentName: item.name,
                                studentGrade: item.grade + ' ' + item.section
                            })
                        }}
                    />
                }
            />
        )
    }

    getUserDetails = () => {
        db.collection("teacher")
            .where("email_id", "==", this.state.userid)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        name: doc.data().name,
                        contact: doc.data().contact,
                        id: doc.data().id,
                        docId: doc.id,
                    });
                });
            });
    }

    componentDidMount() {
        this.getUserDetails();
        this.attendance();
    }

    render() {
        if (this.state.attendance.length == 0) {
            return (
                <View style={{ flex: 1 }}>
                    <View>
                        <Header
                            leftComponent={<Icon name='arrow-alt-circle-left' type='font-awesome-5' color='#fff' solid={false} size={RFValue(40)} onPress={() => this.props.navigation.goBack()} />}
                            centerComponent={{ text: 'Attendance', style: { color: '#fabf10', fontSize: 20, fontWeight: "bold", } }}
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
                        <Text style={{ fontSize: RFValue(23) }}>No one Attended the class</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
                    <Overlay
                        visible={this.state.absent}
                        onBackdropPress={() => {
                            this.setState({
                                absent: false,
                                studentId: '',
                                studentName: '',
                                studentGrade: ''
                            })
                        }}
                        overlayStyle={{ width: '80%', marginTop: RFValue(20), marginBottom: RFValue(20) }}
                    >
                        <View>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: RFValue(22),
                                fontWeight: 'bold',
                                color: "#FD6A02"
                            }}>
                                {this.state.studentName}</Text>
                            <Text style={{ textAlign: 'center', fontSize: RFValue(15) }}>
                                {this.state.studentGrade}</Text>
                            <View style={{ alignItems: 'center', marginTop: RFValue(30) }}>
                                <TouchableOpacity
                                    style={{
                                        alignItems: 'center', backgroundColor: 'green', width: '50%',
                                        borderRadius: RFValue(100),
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 8,
                                        },
                                        shadowOpacity: 0.44,
                                        shadowRadius: 10.32,
                                        elevation: 16,
                                        height: RFValue(20)
                                    }}
                                    onPress={() => {
                                        db.collection(this.state.classId)
                                            .doc(this.state.studentId)
                                            .update({
                                                present: false
                                            })
                                        this.setState({
                                            absent: false,
                                            studentId: '',
                                            studentName: '',
                                            studentGrade: ''
                                        })
                                    }}>
                                    <Text style={{ fontWeight: 'bold' }}>Mark As Absent</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Overlay>
                    <View>
                        <Header
                            leftComponent={<Icon name='arrow-alt-circle-left' type='font-awesome-5' color='#fff' solid={false} size={RFValue(40)} onPress={() => this.props.navigation.goBack()} />}
                            centerComponent={{ text: 'Attendance', style: { color: '#fabf10', fontSize: 20, fontWeight: "bold", } }}
                            rightComponent={<Image
                                source={require('../assets/logo.png')}
                                style={{ width: '92%', height: '100%' }}
                            />}
                            backgroundColor="#1338BF"
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: RFValue(15) }}>Number of Students Attended Class {this.state.attendance.length}</Text>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.attendance}
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