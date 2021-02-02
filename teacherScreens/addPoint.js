import React, { Component } from "react";
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    FlatList,
    Image
} from "react-native";
import { Input, Icon, ListItem, Avatar, Overlay, ButtonGroup } from "react-native-elements";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

export default class ChatClassStudent1 extends Component {

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
            students: [],
            pointVisible: false,
            selectedUserid: '',
            selectedName: '',
            points: null,
            message: '',
        };
    }

    keyExtractor = (index) => index.toString()

    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                title={
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                selectedName: item.name,
                                selectedUserid: item.email_id,
                                pointVisible: true,
                                selectedPoint: item.mainScore
                            })
                        }}
                    >
                        <Text
                            style={{
                                fontSize: RFValue(20)
                            }}
                        >{item.name}</Text>
                    </TouchableOpacity>}
                //titleStyle={{ color: 'black', fontWeight: 'bold' }}
                rightElement={
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                selectedName: item.name,
                                selectedUserid: item.email_id,
                                pointVisible: true,
                                selectedPoint: item.mainScore
                            })
                        }}
                    >
                        <Icon name="gifts" type="font-awesome-5" solid={true} size={RFValue(35)} />
                    </TouchableOpacity>
                }
                leftAvatar={
                    <Avatar rounded source={{ uri: item.imageurl }} size={RFValue(50)} />
                }
                bottomDivider
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
                        class_teacher_grade: doc.data().class_teacher_grade,
                        class_teacher_section: doc.data().class_teacher_section,
                        contact: doc.data().contact,
                        id: doc.data().id,
                        docId: doc.id,
                    });
                    this.getClassStudents()
                });
            });
    }

    componentDidMount() {
        this.getUserDetails()
    }

    getClassStudents = () => {
        var grade = this.state.class_teacher_grade
        var section = this.state.class_teacher_section
        this.studentsRef = db.collection('students')
            .where("grade", "==", grade)
            .where("section", "==", section)
            .orderBy("first", "desc")
            .orderBy("name", "asc")
            .onSnapshot((snapshot) => {
                var students = snapshot.docs.map((doc) => doc.data())
                this.setState({
                    students: students
                });
            })
    }

    updateIndex1 = (selectedIndex1) => {
        this.setState({ selectedIndex1 })
        if (selectedIndex1 == 0) {
            this.setState({
                points: 5
            })
        }
        if (selectedIndex1 == 1) {
            this.setState({
                points: 10,
            })
        }
        if (selectedIndex1 == 2) {
            this.setState({
                points: 20,
            })
        }
    }

    render() {
        if (this.state.students.length == 0) {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
                    <View style={{ flex: 0.12 }}>
                        <MyHeader title="Add Point" navigation={this.props.navigation} />
                    </View>
                    <View style={{
                        flex: 0.88,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image
                            source={require('../assets/Notification.png')} />
                        <Text style={{ fontSize: RFValue(23) }}>Hope! Your not class Teacher</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
                    <Overlay
                        isVisible={this.state.pointVisible}
                        overlayStyle={{ width: '90%', marginTop: RFValue(20), marginBottom: RFValue(20) }}
                        onBackdropPress={() => {
                            this.setState({
                                pointVisible: false,
                                points: null,
                                selectedIndex1: null
                            })
                        }}
                    >
                        <ScrollView>
                            <View style={{ marginTop: RFValue(15), }}>
                                <View style={styles.signupView}>
                                    <Text style={styles.signupText}>Gift To {this.state.selectedName}</Text>
                                </View>
                                <View style={{ marginTop: RFValue(20) }}>
                                    <Text style={styles.label}>Points </Text>
                                    <ButtonGroup
                                        onPress={this.updateIndex1}
                                        selectedIndex={this.state.selectedIndex1}
                                        buttons={[5, 10, 20]}
                                        containerStyle={{ height: RFValue(50), borderRadius: RFValue(10) }}
                                    />
                                    <Text style={styles.label}>Message to {this.state.selectedName} </Text>
                                    <Input
                                        style={styles.loginBox}
                                        placeholder={'Message'}
                                        multiline={true}
                                        onChangeText={(text) => {
                                            this.setState({
                                                message: text
                                            });
                                        }}
                                        leftIcon={
                                            <Icon
                                                name="address-card"
                                                size={RFValue(35)}
                                                color="#fabf10"
                                                type="font-awesome-5"
                                            />
                                        }
                                        value={this.state.section}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.cancelButtonText}
                                    onPress={() => {
                                        db.collection('students')
                                            .doc(this.state.selectedUserid)
                                            .update({
                                                mainScore: this.state.selectedPoint + this.state.points,
                                                messageVisible: true,
                                                message: 'Message from classTeacher :- \n' + this.state.message,
                                                submessage: 'Your class Teacher have added ' + this.state.points + ' points in Shining Star LeaderBoard',
                                                pointAdded: this.state.points,
                                                messageTopic: 'Gift from class Teacher',
                                            })
                                        this.setState({
                                            pointVisible: false,
                                            points: null,
                                            selectedIndex1: null,
                                            message: null
                                        })
                                    }}
                                >SEND</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </Overlay>
                    <MyHeader title="Add Point" navigation={this.props.navigation} />
                    <View style={{ flex: 1 }}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.students}
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