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
import DatePicker from "react-native-datepicker";

export default class ccaAnnouncement extends Component {
    constructor() {
        var date = new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate()
        var date1 = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()
        super();
        this.state = {
            contact: "",
            userid: firebase.auth().currentUser.email,
            name: "",
            docId: "",
            class_teacher_section: '',
            class_teacher_grade: '',
            id: '',
            refDate: date1,
            announcements: [],
            isAnnouncementModalVisible: false,
            announcementDetails: '',
            announcementTopic: '',
            announcementVisible: false,
            textDetails: '',
            textTopic: '',
            teacherstate: '',
            textTeacherName: '',
            textTeacherstate: '',
            date: null,
            minDate: (new Date().getDate() + 1) + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear(),
            maxDate: "31-01-2022",
            textLastDate: '',
        };
    }

    getAnnouncement = () => {
        this.announcementRef = db.collection('ccaAnnouncement')
            .where('lastDate', '>=', new Date().getDate() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear())
            .orderBy('lastDate', 'asc')
            .onSnapshot((snapshot) => {
                var announcement = snapshot.docs.map((doc) => doc.data())
                this.setState({
                    announcements: announcement
                });
            })
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
                    });
                });
            });
    }
    createUniqueId() {
        return Math.random().toString(36).substring(7);
    }

    addAnnouncement = () => {
        var randomRequestId = this.createUniqueId();
        db.collection('ccaAnnouncement')
            .add({
                announcementId: randomRequestId,
                announcementTopic: this.state.announcementTopic,
                announcementDetails: this.state.announcementDetails,
                refDate: new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
                date: firebase.firestore.FieldValue.serverTimestamp(),
                teacherName: this.state.name,
                teacherId: this.state.userid,
                time: new Date().getHours() + ':' + new Date().getMinutes(),
                teacherstate: this.state.teacherstate,
                lastDate: this.state.date
            })
        ToastAndroid.showWithGravityAndOffset(
            "Announcement Added Successfully",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
        this.setState({
            isAnnouncementModalVisible: false
        })
    }

    keyExtractor = (index) => index.toString()

    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                bottomDivider
                title={'Topic: ' + item.announcementTopic}
                subtitle={'Last Date: ' + item.lastDate + '\nAnnouncement date: ' + item.refDate + '\nAnnouncement time: ' + item.time}
                rightElement={
                    <TouchableOpacity
                        //style={[styles.start, { backgroundColor: item.color }]}
                        onPress={() => {
                            this.setState({
                                textTeacherstate: item.teacherstate,
                                textTeacherName: item.teacherName,
                                textTopic: item.announcementTopic,
                                textDetails: item.announcementDetails,
                                announcementVisible: true,
                                textLastDate: item.lastDate,
                            })
                        }}
                    >
                        <Icon
                            name="torah"
                            size={RFValue(35)}
                            color="#FC46AA"
                            type="font-awesome-5"
                        />
                    </TouchableOpacity>
                }
            />
        )
    }

    addAnnouncementModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.isAnnouncementModalVisible}
            >
                <ScrollView style={styles.scrollview}>
                    <View style={styles.signupView}>
                        <Text style={styles.signupText}> Add Announcement </Text>
                    </View>
                    <Text style={styles.label}>Announcement  Topic</Text>
                    <Input
                        style={styles.loginBox}
                        placeholder={'Announcement Topic'}
                        onChangeText={(text) => {
                            this.setState({
                                announcementTopic: text,
                            });
                        }}
                        leftIcon={
                            <Icon
                                name="bullhorn"
                                size={RFValue(35)}
                                color="#fabf10"
                                type="font-awesome-5"
                            />
                        }
                    />
                    <Text style={styles.label}>Announcement Details</Text>
                    <Input
                        style={[styles.formTextInput, { height: RFValue(200) }]}
                        containerStyle={{ marginTop: RFValue(30), marginLeft: 10 }}
                        multiline
                        placeholder={"Announcement Details"}
                        onChangeText={(text) => {
                            this.setState({
                                announcementDetails: text,
                            });
                        }}
                        leftIcon={
                            <Icon
                                name="scroll"
                                size={RFValue(35)}
                                color="#fabf10"
                                type="font-awesome-5"
                            />
                        }
                    />
                    <Text style={styles.label}>Last Date</Text>
                    <DatePicker
                        style={{ width: 200, marginLeft: 10 }}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        minDate={this.state.minDate}
                        maxDate={this.state.maxDate}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={() => {
                                if (this.state.announcementDetails.length != '' && this.state.announcementTopic.length != '') {
                                    if (this.state.date != null) {
                                        this.addAnnouncement()
                                    }
                                    else {
                                        ToastAndroid.showWithGravityAndOffset(
                                            "Please Add Last Date or go to Announcement screen and add Announcement",
                                            ToastAndroid.LONG,
                                            ToastAndroid.BOTTOM,
                                            25,
                                            50
                                        );
                                    }
                                } else {
                                    ToastAndroid.showWithGravityAndOffset(
                                        "Please Enter Announcement Details or Announcement Topic",
                                        ToastAndroid.LONG,
                                        ToastAndroid.BOTTOM,
                                        25,
                                        50
                                    );
                                }
                            }}>
                            <Text style={styles.registerButtonText}>Add Announcement</Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.cancelButtonText}
                            onPress={() => {
                                this.setState({ isAnnouncementModalVisible: false })
                            }}
                        >
                            Cancel</Text>
                    </View>
                </ScrollView>
            </Modal>
        );
    }

    componentDidMount() {
        this.getUserDetails();
        this.getAnnouncement();
    }

    render() {
        if (this.state.announcements.length === 0) {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
                    {this.addAnnouncementModal()}
                    <View style={{ flex: 0.12 }}>
                        <MyHeader title="CCA Announcement" navigation={this.props.navigation} />
                    </View>
                    <View style={{
                        flex: 0.88,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: RFValue(300),
                    }}>
                        <Image
                            source={require('../assets/Notification.png')} />
                        <Text style={{ fontSize: RFValue(23) }}>No CCA Announcement Found</Text>
                    </View>
                    <View style={{ marginTop: RFValue(300) }}>
                        <TouchableOpacity style={styles.add1}
                            onPress={() => {
                                this.setState({
                                    isAnnouncementModalVisible: true
                                })
                            }}
                        >
                            <Image
                                source={require('../assets/announcements.png')}
                                style={{ height: RFValue(50), width: RFValue(50) }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
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
                                    <Text style={{ textAlign: 'left', marginTop: RFValue(5) }}>Last Date: {this.state.textLastDate}</Text>
                                </View>
                                <View>
                                    <Text style={{ textAlign: 'left', marginTop: RFValue(10) }}>Regards,</Text>
                                    <Text style={{ textAlign: 'left', marginTop: RFValue(3), marginLeft: RFValue(5) }}>{this.state.textTeacherName},</Text>
                                    <Text style={{ textAlign: 'left', marginLeft: RFValue(5) }}>VIS Team</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </Overlay>
                    <View style={{ flex: 0.12 }}>
                        <MyHeader title="CCA Announcement" navigation={this.props.navigation} />
                    </View>
                    <View style={{ flex: 0.88, marginTop: RFValue(10) }}>
                        {this.addAnnouncementModal()}
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.announcements}
                            renderItem={this.renderItem}
                        />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.add1}
                            onPress={() => {
                                this.setState({
                                    isAnnouncementModalVisible: true
                                })
                            }}
                        >
                            <Image
                                source={require('../assets/announcements.png')}
                                style={{ height: RFValue(50), width: RFValue(50) }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )
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