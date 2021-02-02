import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView,
    Modal,
    FlatList
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import MyHeader from "../components/MyHeader";
import { Avatar, Icon, Overlay, ListItem } from "react-native-elements"
import db from "../config";
import firebase from "firebase";
import TextTicker from 'react-native-text-ticker'

export default class Home extends Component {
    constructor() {
        super();
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
        this.state = {
            time: date,
            starWeek: [],
            time: time,
            change: false,
            starWeekid: null,
            starWeek: [],
            userid: firebase.auth().currentUser.email,
            name: '',
            grade: '',
            section: '',
            contact: '',
            achievementText: '',
            ccaannouncements: '',
            ccaannouncementVisible: false,
            messageVisible: false,
            announcements: [],
            subtopic: null,
            topic: null,
            announcementVisible: false,
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
                        messageVisible: doc.data().messageVisible,
                    });
                    this.getstarofWeek(doc.data().grade)
                    if (doc.data().messageVisible == true) {
                        this.setState({
                            message: doc.data().message,
                            submessage: doc.data().submessage,
                            messageTopic: doc.data().messageTopic,
                        })
                    }
                    this.readQue(doc.data().grade)
                });
            });
    }

    readQue = (grade) => {
        var today = new Date()
        db.collection("test")
            .where(grade, "==", true)
            .where("date", "==", today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate())
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        topic: doc.data().topic,
                        subtopic: doc.data().subtopic
                    });
                });
            });
    }

    getstarofWeek = (grade) => {
        var d = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
        var dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        var lastWeek = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
        this.starWeek = db.collection('students')
            .where('grade', '==', grade)
            .where('lastWeek', '==', lastWeek)
            .orderBy('weekScore', 'desc')
            .limit(1)
            .onSnapshot((snapshot) => {
                snapshot.forEach((doce) => {
                    this.setState({
                        starWeekid: doce.data().email_id
                    })
                })
                var starWeek = snapshot.docs.map((doc) => doc.data())
                this.setState({
                    starWeek: starWeek
                })
            })
    }

    ccagetAnnouncement = () => {
        this.announcementRef = db.collection('ccaAnnouncement')
            .where('lastDate', '>=', new Date().getDate() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear())
            .orderBy('lastDate', 'asc')
            .limit(1)
            .onSnapshot((snapshot) => {
                var ccaannouncement = snapshot.docs.map((doc) => doc.data())
                this.setState({
                    ccaannouncements: ccaannouncement
                });
            })
    }

    keyExtractor3 = (index) => index.toString()

    renderItem3 = ({ item, i, index }) => {
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
                    <Text>{item.mainScore} Points</Text>
                }
                containerStyle={{ backgroundColor: '#FFFEE0' }}
                leftAvatar={
                    <Avatar rounded source={{ uri: item.imageurl }} size={RFValue(50)}
                        title={item.name}
                    />
                }
                leftElement={
                    <Text>{index + 1}</Text>
                }
                bottomDivider
            />
        )
    }

    keyExtractor = (index) => index.toString()

    renderItem = ({ item, i, index }) => {
        return (
            <View>
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
                        <Text>{item.weekScore} Points</Text>
                    }
                    containerStyle={{ backgroundColor: '#FFFEE0' }}
                    leftAvatar={
                        <Avatar rounded source={{ uri: item.imageurl }} size={RFValue(50)}
                            title={item.name}
                        />
                    }
                    leftElement={
                        <Text style={{ fontSize: RFValue(20), fontWeight: 'bold' }}>{index + 1}</Text>
                    }
                    bottomDivider
                />

            </View>
        )
    }

    keyExtractor1 = (index) => index.toString()

    renderItem1 = ({ item, i }) => {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFEFE5', alignContent: 'center', marginLeft: RFValue(10), marginRight: RFValue(10), marginTop: RFValue(10) }}>
                <Text
                    style={{ fontSize: RFValue(15), fontWeight: 'bold', paddingLeft: RFValue(18), backgroundColor: 'gold' }}
                >
                    Latest CCA Announcement
                        </Text>
                <Text
                    style={{ fontSize: RFValue(18), fontWeight: 'bold', paddingLeft: RFValue(10) }}
                >{'Topic: ' + item.announcementTopic}</Text>

                <Text
                    style={{ paddingLeft: RFValue(25) }}>
                    {'Last Date: ' + item.lastDate + '\ndate: ' + item.refDate + '\ntime: ' + item.time}
                </Text>

                <View style={{ alignItems: 'flex-end', justifyContent: 'center', marginTop: RFValue(2) }}>
                    <TouchableOpacity
                        style={[styles.button2, { alignItems: 'center', justifyContent: 'center', marginRight: RFValue(15), width: "65%" }]}
                        onPress={() => {
                            this.setState({
                                ccatextTeacherstate: item.teacherstate,
                                ccatextTeacherName: item.teacherName,
                                ccatextTopic: item.announcementTopic,
                                ccatextDetails: item.announcementDetails,
                                ccaannouncementVisible: true,
                                ccatextLastDate: item.lastDate,
                            })
                        }}
                    >
                        <Text style={styles.buttonText2}>View Announcement</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'flex-start', justifyContent: 'center', marginTop: RFValue(-50) }}>
                    <TouchableOpacity style={styles.add1}
                        onPress={() => {
                            this.props.navigation.navigate('ccaAnnouncementst')
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

    keyExtractor2 = (index) => index.toString()

    renderItem2 = ({ item, i }) => {
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
                        <Text style={styles.buttonText2}>View Announcement</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'flex-start', justifyContent: 'center', marginTop: RFValue(-50) }}>
                    <TouchableOpacity style={styles.add1}
                        onPress={() => {
                            this.props.navigation.navigate('AnnouncementSt')
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
        this.getAchievement();
        this.getAnnouncement();
        this.ccagetAnnouncement();
    }

    render() {
        return (
            <ScrollView>
                <Overlay
                    isVisible={this.state.messageVisible}
                    overlayStyle={{ width: '90%', marginTop: RFValue(20), marginBottom: RFValue(20) }}
                    onBackdropPress={() => {
                        this.setState({
                            messageVisible: false,
                        })
                        db.collection('students')
                            .doc(this.state.userid)
                            .update({
                                messageVisible: false
                            })
                    }}
                >
                    <ScrollView>
                        <View style={{ marginTop: RFValue(15), }}>
                            <View style={styles.signupView}>
                                <Text style={styles.signupText}>{this.state.messageTopic}</Text>
                            </View>
                            <View style={{ marginTop: RFValue(20) }}>
                                <Text style={{ textAlign: 'center', marginLeft: RFValue(5), marginRight: RFValue(5) }}>
                                    {this.state.submessage + '\n' + this.state.message} </Text>
                            </View>
                        </View>
                    </ScrollView>
                </Overlay>
                <Overlay
                    isVisible={this.state.ccaannouncementVisible}
                    overlayStyle={{ width: '90%', marginTop: RFValue(20), marginBottom: RFValue(20) }}
                    onBackdropPress={() => {
                        this.setState({
                            ccaannouncementVisible: false
                        })
                    }}>
                    <ScrollView>
                        <View style={{ marginTop: RFValue(15), }}>
                            <View style={styles.signupView}>
                                <Text style={styles.signupText}> {this.state.ccatextTopic}</Text>
                            </View>
                            <View style={{ marginTop: RFValue(20) }}>
                                <Text style={{ textAlign: 'center', marginLeft: RFValue(5), marginRight: RFValue(5), marginBottom: RFValue(10) }}>{this.state.ccatextDetails}</Text>
                                <Text style={{ textAlign: 'left', marginTop: RFValue(5) }}>Last Date: {this.state.ccatextLastDate}</Text>
                            </View>
                            <View>
                                <Text style={{ textAlign: 'left', marginTop: RFValue(10) }}>Regards,</Text>
                                <Text style={{ textAlign: 'left', marginTop: RFValue(3), marginLeft: RFValue(5) }}>{this.state.ccatextTeacherName},</Text>
                                <Text style={{ textAlign: 'left', marginLeft: RFValue(5) }}>VIS Team</Text>
                            </View>
                        </View>
                    </ScrollView>
                </Overlay>
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
                <View style={styles.container}>
                    <MyHeader title="Dashboard" navigation={this.props.navigation} />
                    <View style={{ flex: 0.04, backgroundColor: 'red' }}>
                        <TextTicker
                            shouldAnimateTreshold={40}
                            bounce={false}
                            style={{ height: RFValue(24), fontSize: RFValue(15), color: '#fff', fontWeight: 'bold' }}
                        >
                            {this.state.achievementText}
                        </TextTicker>
                    </View>
                    <View style={{ flex: 0.3, backgroundColor: '#FFEFE5', alignContent: 'center', marginLeft: RFValue(10), marginRight: RFValue(10), marginTop: RFValue(10) }}>
                        <Text
                            style={{ fontSize: RFValue(18), fontWeight: 'bold', paddingLeft: RFValue(10) }}
                        >QUIZ TOPIC</Text>
                        <Text
                            style={{ fontSize: RFValue(15), fontWeight: 'bold', paddingLeft: RFValue(18) }}
                        >
                            {this.state.topic}
                        </Text>
                        <Text
                            style={{ paddingLeft: RFValue(25) }}>
                            {this.state.subtopic}
                        </Text>
                        <Text
                            style={{ paddingLeft: RFValue(25) }}>
                        </Text>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: RFValue(15) }}>
                            <TouchableOpacity
                                style={[styles.button, { alignItems: 'center', justifyContent: 'center' }]}
                                onPress={() => {
                                    this.props.navigation.navigate("Quize")
                                }}
                            >
                                <Text style={[styles.buttonText, { fontWeight: 'bold' }]}>START QUIZ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 0.25, backgroundColor: '#FFFEE0', alignContent: 'center', marginLeft: RFValue(10), marginRight: RFValue(10), marginTop: RFValue(10) }}>
                        <View style={{ justifyContent: 'space-between' }}>
                            <Text style={{ marginLeft: RFValue(10), marginTop: RFValue(5), fontSize: RFValue(18), fontWeight: 'bold' }}>
                                Star of the week </Text>
                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={this.state.starWeek}
                                renderItem={this.renderItem}
                            />
                            {this.state.starWeek.length == 0 ? (
                                <View style={{ marginTop: RFValue(15), marginBottom: RFValue(15) }}><Text style={{ textAlign: 'center', fontSize: RFValue(20) }}>Weekly Leaderboard is sleeping</Text></View>
                            ) : (
                                    <View></View>
                                )

                            }
                        </View>
                    </View>
                    <View style={{ flex: 0.26 }}>
                        <FlatList
                            keyExtractor={this.keyExtractor1}
                            data={this.state.ccaannouncements}
                            renderItem={this.renderItem1}
                        />
                    </View>
                    <View style={{ flex: 0.26 }}>
                        <FlatList
                            keyExtractor={this.keyExtractor2}
                            data={this.state.announcements}
                            renderItem={this.renderItem2}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E5F7FE",
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
        color: "#fabf10",
        fontWeight: "200",
        fontSize: RFValue(20),
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
    buttonText2: {
        fontSize: RFValue(18),
        fontWeight: "bold",
        color: "#fff",
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
});