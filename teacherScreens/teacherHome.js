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
    ToastAndroid
} from "react-native";
import { Input, Icon, ListItem, Overlay } from "react-native-elements";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import TextTicker from 'react-native-text-ticker'

export default class teacherHome extends Component {

    constructor() {
        super();
        this.state = {
            contact: "",
            userid: firebase.auth().currentUser.email,
            name: "",
            docId: "",
            class_teacher_section: '',
            class_teacher_grade: '',
            id: '',
            isAnnouncementModalVisible: false,
            announcementDetails: '',
            announcementTopic: '',
            announcementVisible: false,
            textDetails: '',
            textTopic: '',
            teacherstate: '',
            textTeacherName: '',
            textTeacherstate: '',
            announcements: [],
            subject: '',
            infoTopic: '',
            infoDetails: '',
            infoVisible: false,
            classTopper: [],
            achievementText: ''
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
                    });
                });
            });
    }

    getUserDetails = () => {
        db.collection("teacher")
            .where("email_id", "==", this.state.userid)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        name: doc.data().name,
                        class_teacher_grade: doc.data().class_teacher_grade,
                        class_teacher_section: doc.data().class_teacher_section,
                        contact: doc.data().contact,
                        id: doc.data().id,
                        docId: doc.id,
                        teacherstate: doc.data().state,
                        subject: doc.data().subject,

                    });
                    this.getInfo(doc.data().subject)
                    this.topperofMonth();
                });
            });
    }

    topperofMonth = () => {
        db.collection('students')
            .where('grade', '==', this.state.class_teacher_grade)
            .where('section', '==', this.state.class_teacher_section)
            .where('lastMonth', '==', (new Date().getMonth() + 1))
            .orderBy('monthScore', 'desc')
            .limit(3)
            .onSnapshot((snapshot) => {
                var classTopper = snapshot.docs.map((doc) => doc.data())
                this.setState({
                    classTopper: classTopper
                })
            })
    }

    getInfo = (subject) => {
        db.collection('hodinfo')
            .where("subject", "==", subject)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        infoTopic: doc.data().infoTopic,
                        infoDetails: doc.data().infoDetails
                    });
                });
            });
    }

    getAnnouncement = () => {
        this.announcementRef = db.collection('announcement')
            .orderBy('date', 'desc')
            .limit(1)
            .onSnapshot((snapshot) => {
                var announcement = snapshot.docs.map((doc) => doc.data())
                this.setState({
                    announcements: announcement
                });
            })
    }

    keyExtractor = (index) => index.toString()

    renderItem = ({ item, i }) => {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFEFE5', alignContent: 'center', marginLeft: RFValue(10), marginRight: RFValue(10), marginTop: RFValue(10) }}>
                <Text
                    style={{ fontSize: RFValue(15), fontWeight: 'bold', paddingLeft: RFValue(18), backgroundColor: 'gold' }}
                >
                    Latest Announcement
                        </Text>
                <Text
                    style={{ fontSize: RFValue(18), fontWeight: 'bold', paddingLeft: RFValue(10) }}
                >{'Topic: ' + item.announcementTopic}</Text>

                <Text
                    style={{ paddingLeft: RFValue(25) }}>
                    {'date: ' + item.refDate + '\ntime: ' + item.time}
                </Text>

                <View style={{ alignItems: 'flex-end', justifyContent: 'center', marginTop: RFValue(2) }}>
                    <TouchableOpacity
                        style={[styles.button2, { alignItems: 'center', justifyContent: 'center', marginRight: RFValue(15), width: "65%" }]}
                        onPress={() => {
                            this.setState({
                                textTeacherstate: item.teacherstate,
                                textTeacherName: item.teacherName,
                                textTopic: item.announcementTopic,
                                textDetails: item.announcementDetails,
                                announcementVisible: true
                            })
                        }}
                    >
                        <Text style={styles.buttonText}>View Announcement</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'flex-start', justifyContent: 'center', marginTop: RFValue(-50) }}>
                    <TouchableOpacity style={styles.add1}
                        onPress={() => {
                            this.props.navigation.navigate('Announcements')
                        }}
                    >
                        <Image
                            source={require('../assets/announcements.png')}
                            style={{ height: RFValue(45), width: RFValue(45) }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    componentDidMount() {
        this.getUserDetails();
        this.getAnnouncement();
        this.getAchievement();
    }

    keyExtractor1 = (index) => index.toString()

    renderItem1 = ({ item, i, index }) => {
        return (
            <ListItem
                key={i}
                title={
                    <Text
                        style={{
                            fontSize: RFValue(20)
                        }}
                    >{item.name}</Text>
                }
                subtitle={
                    <Text>{item.grade} {item.section}</Text>
                }
                rightElement={
                    <Text>{item.monthScore} Points</Text>
                }
                containerStyle={{ backgroundColor: '#FFFEE0' }}
                leftElement={
                    <Text style={{ fontSize: RFValue(20), fontWeight: 'bold' }} >{index + 1}</Text>
                }
                bottomDivider
            />
        )
    }

    announcementsView = () => {
        return (
            <View style={{ flex: 1, backgroundColor: '#E5F7FE' }}>
                <Overlay
                    isVisible={this.state.announcementVisible}
                    overlayStyle={{ width: '90%', marginTop: RFValue(20), marginBottom: RFValue(20) }}
                    onBackdropPress={() => {
                        this.setState({
                            announcementVisible: false
                        })
                    }}>
                    <ScrollView>
                        <View style={{ marginTop: RFValue(15), }}>
                            <View style={styles.signupView}>
                                <Text style={styles.signupText}> {this.state.textTopic}</Text>
                            </View>
                            <View style={{ marginTop: RFValue(20) }}>
                                <Text style={{ textAlign: 'center', marginLeft: RFValue(5), marginRight: RFValue(5), marginBottom: RFValue(10) }}>{this.state.textDetails}</Text>
                            </View>
                            <View>
                                <Text style={{ textAlign: 'left', marginTop: RFValue(10) }}>Regards,</Text>
                                <Text style={{ textAlign: 'left', marginTop: RFValue(3), marginLeft: RFValue(5) }}>{this.state.textTeacherName},</Text>
                                <Text style={{ textAlign: 'left', marginLeft: RFValue(5) }}>VIS {this.state.textTeacherstate}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </Overlay>
                <Overlay
                    isVisible={this.state.infoVisible}
                    overlayStyle={{ width: '90%', marginTop: RFValue(20), marginBottom: RFValue(20) }}
                    onBackdropPress={() => {
                        this.setState({
                            infoVisible: false
                        })
                    }}>
                    <ScrollView>
                        <View style={{ marginTop: RFValue(15), }}>
                            <View style={styles.signupView}>
                                <Text style={styles.signupText}> {this.state.infoTopic}</Text>
                            </View>
                            <View style={{ marginTop: RFValue(20) }}>
                                <Text style={{ textAlign: 'center', marginLeft: RFValue(5), marginRight: RFValue(5), marginBottom: RFValue(10) }}>{this.state.infoDetails}</Text>
                            </View>
                            <View>
                                <Text style={{ textAlign: 'left', marginTop: RFValue(10) }}>Regards,</Text>
                                <Text style={{ textAlign: 'left', marginTop: RFValue(3), marginLeft: RFValue(5) }}>{this.state.subject} HOD,</Text>
                            </View>
                        </View>
                    </ScrollView>
                </Overlay>
                <View>
                    <MyHeader title="Dashboard" navigation={this.props.navigation} />
                </View>
                <View style={{ flex: 0.04, backgroundColor: 'red' }}>
                    <TextTicker
                        shouldAnimateTreshold={40}
                        bounce={false}
                        style={{ height: RFValue(24), fontSize: RFValue(15), color: '#fff', fontWeight: 'bold' }}
                    >
                        {this.state.achievementText}
                    </TextTicker>
                </View>
                <View style={{ flex: 0.26 }}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.announcements}
                        renderItem={this.renderItem}
                    />
                </View>
                <View style={{ flex: 0.2, alignContent: 'center', marginLeft: RFValue(10), marginRight: RFValue(10), marginTop: RFValue(20), backgroundColor: '#6666FF' }}>
                    <Text
                        style={{ fontSize: RFValue(15), fontWeight: 'bold', paddingLeft: RFValue(18), backgroundColor: '#D7EFF4' }}
                    >
                        Information from HOD
                        </Text>
                    <Text
                        style={{ fontSize: RFValue(18), fontWeight: 'bold', paddingLeft: RFValue(10) }}
                    >{'Topic: ' + this.state.infoTopic}</Text>

                    <View style={{ alignItems: 'flex-end', justifyContent: 'center', marginTop: RFValue(10) }}>
                        <TouchableOpacity
                            style={[styles.button2, { alignItems: 'center', justifyContent: 'center', marginRight: RFValue(15) }]}
                            onPress={() => {
                                this.setState({
                                    infoVisible: true
                                })
                            }}
                        >
                            <Text style={styles.buttonText}>View Information</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 0.372, alignContent: 'center', marginLeft: RFValue(10), marginRight: RFValue(10), marginTop: RFValue(20), backgroundColor: '#FFFEE0' }}>
                    <Text
                        style={{ fontSize: RFValue(15), fontWeight: 'bold', paddingLeft: RFValue(18), backgroundColor: '#50C878' }}
                    >
                        Class Topper of Month
                        </Text>
                    <FlatList
                        keyExtractor={this.keyExtractor1}
                        data={this.state.classTopper}
                        renderItem={this.renderItem1}
                    />
                    {this.state.classTopper.length == 0 ? (
                        <View style={{ marginTop: RFValue(15), marginBottom: RFValue(15) }}><Text style={{ textAlign: 'center', fontSize: RFValue(20) }}>None of the your students attended the daily Quiz.</Text></View>
                    ) : (
                            <View></View>
                        )

                    }
                </View>
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                {this.announcementsView()}
            </ScrollView>
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
        width: "80%",
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
        borderRadius: RFValue(5),
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        justifyContent: "center",
        alignItems: "center",
        height: RFValue(35),
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
    button2: {
        width: "60%",
        height: RFValue(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(50),
        backgroundColor: "#FD6A02",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
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
        fontSize: RFValue(18),
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
        width: RFValue(50),
        height: RFValue(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(100),
        backgroundColor: "#FD6A02",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
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
    formTextInput: {
        width: "75%",
        height: RFValue(45),
        borderWidth: 1,
        padding: 10,
    },
});