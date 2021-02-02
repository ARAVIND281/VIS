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
    Picker
} from "react-native";
import { Input, Icon, ListItem, Avatar } from "react-native-elements";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

export default class createClass extends Component {
    constructor() {
        var date = new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate()
        var date1 = new Date().getDate() + ':' + (new Date().getMonth() + 1) + ':' + new Date().getFullYear()
        super();
        this.state = {
            contact: "",
            userid: firebase.auth().currentUser.email,
            name: "",
            docId: "",
            class_teacher_section: '',
            class_teacher_grade: '',
            id: '',
            classes: [],
            isClassModalVisible: false,
            topic: 'Topic',
            subject: 'Subject',
            grade: '',
            link: '',
            time: null,
            classDate: date,
            refDate: date1
        };
    }

    addClass = () => {
        var classId = Math.random().toString(36).substring(7)
        db.collection('classes')
            .doc(classId)
            .set({
                teacherName: this.state.name,
                teacherId: this.state.userid,
                subject: this.state.subject,
                topic: this.state.topic,
                grade: this.state.grade,
                link: this.state.link,
                start: false,
                stateText: 'Start Class',
                time: this.state.time,
                isShow: true,
                classId: classId,
                color: '#FB7A27',
                end: false,
                orderTime: firebase.firestore.FieldValue.serverTimestamp(),
                stColor: '#f7a673',
                stStart: true,
                classDate: 'null',
                refDate: 'null',
                textData: new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
            })
        db.collection('date')
            .doc(new Date().getDate() + ':' + (new Date().getMonth() + 1) + ':' + new Date().getFullYear())
            .set({
                textData: new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
                date: new Date().getDate() + ':' + (new Date().getMonth() + 1) + ':' + new Date().getFullYear(),
                classDate: new Date().getFullYear() + '' + (new Date().getMonth() + 1) + new Date().getDate(),
            })
        this.setState({
            isClassModalVisible: false
        })
    }

    getClasses = () => {
        this.studentsRef = db.collection('classes')
            .where('teacherId', '==', this.state.userid)
            .where('isShow', '==', true)
            .onSnapshot((snapshot) => {
                var classes = snapshot.docs.map((doc) => doc.data())
                this.setState({
                    classes: classes
                });
            })
    }

    stateClass = (link, doc) => {
        Linking.openURL(link);
        db.collection("classes")
            .doc(doc)
            .update({
                stateText: "End Class",
                color: 'red',
                start: true,
                stColor: '#FB7A27',
                stStart: false,
                classDate: new Date().getFullYear() + '' + (new Date().getMonth() + 1) + new Date().getDate(),
                refDate: new Date().getDate() + ':' + (new Date().getMonth() + 1) + ':' + new Date().getFullYear()
            })
    }

    endClass = (doc) => {
        db.collection("classes")
            .doc(doc)
            .update({
                isShow: false,
                end: true,
                orderTime: firebase.firestore.FieldValue.serverTimestamp(),
            })
    }

    keyExtractor = (index) => index.toString()

    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                bottomDivider
                title={'Grade ' + item.grade}
                subtitle={'Topic: ' + item.topic + '\ntime: ' + item.time}
                rightElement={
                    <TouchableOpacity
                        style={[styles.start, { backgroundColor: item.color }]}
                        onPress={() => {
                            item.stateText === 'Start Class'
                                ? this.stateClass(item.link, item.classId)
                                : this.endClass(item.classId)
                        }
                        }
                    >
                        <Text>
                            {item.stateText}
                        </Text>
                    </TouchableOpacity>
                }
            />
        )
    }

    addClassModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.isClassModalVisible}
            >
                <ScrollView style={styles.scrollview}>
                    <View style={styles.signupView}>
                        <Text style={styles.signupText}> CREATE CLASS </Text>
                    </View>
                    <Text style={styles.label}>Subject </Text>
                    <Input
                        style={styles.loginBox}
                        placeholder={'Subject'}
                        onChangeText={(text) => {
                            this.setState({
                                subject: text,
                            });
                        }}
                        leftIcon={
                            <Icon
                                name="chalkboard-teacher"
                                size={RFValue(35)}
                                color="#fabf10"
                                type="font-awesome-5"
                            />
                        }
                    />
                    <Text style={styles.label}>Topic </Text>
                    <Input
                        style={styles.loginBox}
                        placeholder={'Topic'}
                        onChangeText={(text) => {
                            this.setState({
                                topic: text,
                            });
                        }}
                        leftIcon={
                            <Icon
                                name="book-open"
                                size={RFValue(35)}
                                color="#fabf10"
                                type="font-awesome-5"
                            />
                        }
                    />
                    <Text style={styles.label}>Grade </Text>
                    <View style={styles.Picker}>
                        <Picker
                            selectedValue={this.state.grade}
                            style={{ height: RFValue(50), width: RFValue(250) }}
                            onValueChange={(itemValue, itemIndex) => { this.setState({ grade: itemValue }) }}
                        >
                            <Picker.Item label="SELECT GRADE" value="SELECT GRADE" />
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                            <Picker.Item label="7" value="7" />
                            <Picker.Item label="8" value="8" />
                            <Picker.Item label="9" value="9" />
                            <Picker.Item label="10" value="10" />
                            <Picker.Item label="11" value="11" />
                            <Picker.Item label="12" value="12" />
                        </Picker>
                    </View>
                    <Text style={styles.label}>Time </Text>
                    <Input
                        style={styles.loginBox}
                        placeholder={'Time'}
                        onChangeText={(text) => {
                            this.setState({
                                time: text,
                            });
                        }}
                        leftIcon={
                            <Icon
                                name="clock"
                                size={RFValue(35)}
                                color="#fabf10"
                                type="font-awesome-5"
                            />
                        }
                    />
                    <Text style={styles.label}>Link </Text>
                    <Input
                        style={styles.loginBox}
                        placeholder={'past the link'}
                        onChangeText={(text) => {
                            this.setState({
                                link: text,
                            });
                        }}
                        leftIcon={
                            <Icon
                                name="link"
                                size={RFValue(35)}
                                color="#fabf10"
                                type="font-awesome-5"
                            />
                        }
                    />
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={() => {
                                this.state.grade.length == 0
                                    ? Alert.alert('Enter Grade')
                                    : this.addClass()
                            }}>
                            <Text style={styles.registerButtonText}>ADD CLASS</Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.cancelButtonText}
                            onPress={() => {
                                this.setState({ isClassModalVisible: false })
                            }}
                        >
                            Cancel</Text>
                    </View>
                </ScrollView>
            </Modal>
        );
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
                });
            });
    }

    componentDidMount() {
        this.getUserDetails();
        this.getClasses();
    }

    render() {
        if (this.state.classes.length === 0) {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
                    {this.addClassModal()}
                    <View style={{ flex: 0.12 }}>
                        <MyHeader title="CLASSES" navigation={this.props.navigation} />
                    </View>
                    <View style={{
                        flex: 0.88,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: RFValue(300),
                    }}>
                        <Image
                            source={require('../assets/Notification.png')} />
                        <Text style={{ fontSize: RFValue(23) }}>No Classes Found</Text>
                    </View>
                    <View style={{ marginTop: RFValue(300) }}>
                        <TouchableOpacity style={styles.add1}
                            onPress={() => {
                                this.setState({
                                    isClassModalVisible: true
                                })
                            }}
                        >
                            <Image
                                source={require('../assets/class.png')}
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
                    {this.addClassModal()}
                    <MyHeader title="CLASSES" navigation={this.props.navigation} />
                    <View style={{ flex: 1 }}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.classes}
                            renderItem={this.renderItem}
                        />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.add1}
                            onPress={() => {
                                this.setState({
                                    isClassModalVisible: true
                                })
                            }}
                        >
                            <Image
                                source={require('../assets/class.png')}
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
    Picker: {
        backgroundColor: '#fabf10',
        marginTop: RFValue(10),
        height: RFValue(50),
        width: RFValue(250),
        borderRadius: RFValue(10),
        marginLeft: RFValue(20)
    }
});