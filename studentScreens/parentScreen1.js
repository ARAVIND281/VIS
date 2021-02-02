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
    Picker,
    Vibration,
    ToastAndroid,
    Linking
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import MyHeader from "../components/MyHeader";
import { Header, Icon, ButtonGroup, Input, Overlay, Button } from "react-native-elements"
import db from "../config";
import firebase from "firebase";

export default class parentScreen1 extends Component {

    constructor() {
        super();
        this.state = {
            contact: "",
            docId: "",
            userid: firebase.auth().currentUser.email,
            name: "",
            section: '',
            grade: '',
            id: '',
            selectedIndex1: null,
            problem1: null,
            academicProblem1: null,
            description: "",
            subject: "",
            password: null,
            visible: false,
            visible2: false,
            oldPassword: '',
            newPassword: '',
            newPassword1: '',
            facilityProblem1: null,
            academicProblem2: null,
            academicTeachingVisible: false,
            hwProblem1: null,
            hwProblem2: "",
        };
    }

    createUniqueId() {
        return Math.random().toString(36).substring(7);
    }

    sendReport = () => {
        var randomRequestId = this.createUniqueId();

        if (this.state.view == 'academic/teaching') {
            db.collection('parentFeedback')
                .add({
                    Problem: 'academic/teaching',
                    subject: this.state.academicProblem2,
                    TeacherName: this.state.subject,
                    Description: this.state.description,
                    studentName: this.state.name,
                    studentGrade: this.state.grade + ' ' + this.state.section,
                    studentContact: this.state.contact,
                    read: 'unread',
                    refDate: new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
                    date: firebase.firestore.FieldValue.serverTimestamp(),
                    FeedBack_id: randomRequestId,
                })
        }
        if (this.state.view == 'academic/HomeWork') {
            db.collection('parentFeedback')
                .add({
                    Problem: 'academic/HomeWork',
                    subject: this.state.hwProblem1,
                    hwproblem: this.state.hwProblem2,
                    studentName: this.state.name,
                    studentGrade: this.state.grade + ' ' + this.state.section,
                    studentContact: this.state.contact,
                    read: 'unread',
                    refDate: new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
                    date: firebase.firestore.FieldValue.serverTimestamp(),
                    FeedBack_id: randomRequestId,
                })
        }
        if (this.state.view == 'academic/other') {
            db.collection('parentFeedback')
                .add({
                    Problem: 'academic/other',
                    subject: this.state.subject,
                    description: this.state.description,
                    studentName: this.state.name,
                    studentGrade: this.state.grade + ' ' + this.state.section,
                    studentContact: this.state.contact,
                    read: 'unread',
                    refDate: new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
                    date: firebase.firestore.FieldValue.serverTimestamp(),
                    FeedBack_id: randomRequestId,
                })
        }

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
                        id: doc.data().id,
                        docId: doc.id,
                        password: doc.data().password,
                    });
                });
            });
    }

    componentDidMount() {
        this.getUserDetails();
    }

    updateIndex1 = (selectedIndex1) => {
        this.setState({ selectedIndex1 })
        if (selectedIndex1 == 0) {
            this.setState({
                problem1: 'Academic',
            })
        }
        if (selectedIndex1 == 1) {
            this.setState({
                problem1: 'Facility',
            })
        }
    }
    academicProblem1 = () => {
        if (this.state.academicProblem1 == 'Teaching') {
            return (
                <View style={{ marginLeft: RFValue(20) }}>
                    <View style={styles.Picker}>
                        <Picker
                            selectedValue={this.state.academicProblem2}
                            style={{ height: RFValue(50), width: RFValue(250) }}
                            onValueChange={(itemValue, itemIndex) => { this.setState({ academicProblem2: itemValue }) }}
                        >
                            <Picker.Item label="SELECT SUBJECT" value="SELECT PROBLEM" />
                            <Picker.Item label="Science" value="Science" />
                            <Picker.Item label="Maths" value="Maths" />
                            <Picker.Item label="SST" value="SST" />
                            <Picker.Item label="English" value="English" />
                            <Picker.Item label="2L" value="2L" />
                            <Picker.Item label="CS" value="CS" />
                        </Picker>
                    </View>
                    {this.state.academicProblem2 == null ? (
                        <View></View>
                    ) : (
                            <View>
                                <View style={{ marginLeft: RFValue(20) }}>
                                    <Input
                                        style={styles.formTextInput}
                                        label={"Teacher Name"}
                                        placeholder={"Teacher Name"}
                                        containerStyle={{ marginTop: RFValue(30) }}
                                        onChangeText={(text) => this.setState({
                                            subject: text
                                        })}
                                    />
                                    <Input
                                        style={styles.formTextInput}
                                        multiline
                                        label={"Description"}
                                        placeholder={"Description"}
                                        containerStyle={{ marginTop: RFValue(30) }}
                                        onChangeText={(text) => this.setState({
                                            description: text
                                        })}
                                    />
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.registerButton} onPress={() => {
                                        this.setState({
                                            academicTeachingVisible: true,
                                            view: 'academic/teaching'
                                        })
                                    }}>
                                        <Text style={styles.registerButtonText}>SUBMIT</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )

                    }
                </View>
            );
        }
        if (this.state.academicProblem1 == 'Home Work') {
            return (
                <View style={{ marginLeft: RFValue(20) }}>
                    <View style={styles.Picker}>
                        <Picker
                            selectedValue={this.state.hwProblem1}
                            style={{ height: RFValue(50), width: RFValue(250) }}
                            onValueChange={(itemValue, itemIndex) => { this.setState({ hwProblem1: itemValue }) }}
                        >
                            <Picker.Item label="SELECT SUBJECT" value="SELECT SUBJECT" />
                            <Picker.Item label="Science" value="Science" />
                            <Picker.Item label="Maths" value="Maths" />
                            <Picker.Item label="SST" value="SST" />
                            <Picker.Item label="English" value="English" />
                            <Picker.Item label="2L" value="2L" />
                            <Picker.Item label="CS" value="CS" />
                        </Picker>
                    </View>
                    {this.state.hwProblem1 == null ? (<View></View>)
                        : (
                            <View style={{ marginLeft: RFValue(20) }}>
                                <View style={styles.Picker}>
                                    <Picker
                                        selectedValue={this.state.hwProblem2}
                                        style={{ height: RFValue(50), width: RFValue(250) }}
                                        onValueChange={(itemValue, itemIndex) => { this.setState({ hwProblem2: itemValue }) }}
                                    >
                                        <Picker.Item label="SELECT PROBLEM" value="SELECT PROBLEM" />
                                        <Picker.Item label="Lot of H/W" value="Lot of H/W" />
                                        <Picker.Item label="Not completing H/W" value="Not completing H/W" />
                                        <Picker.Item label="Not Correcting Homework" value="Not Correcting Homework" />
                                    </Picker>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.registerButton} onPress={() => {
                                        this.setState({
                                            academicTeachingVisible: true,
                                            view: 'academic/HomeWork'
                                        })
                                    }}>
                                        <Text style={styles.registerButtonText}>SUBMIT</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                </View>
            );
        }
        if (this.state.academicProblem1 == 'Other') {
            return (
                <View>
                    <Input
                        style={styles.formTextInput}
                        label={"Subject"}
                        placeholder={"Subject"}
                        containerStyle={{ marginTop: RFValue(30) }}
                        onChangeText={(text) => this.setState({
                            subject: text
                        })}
                        value={this.state.subject}
                    />

                    <Input
                        style={[styles.formTextInput, { height: RFValue(200) }]}
                        multiline
                        numberOfLines={8}
                        label={"Description"}
                        placeholder={"Description"}
                        onChangeText={(text) => {
                            this.setState({
                                description: text,
                            });
                        }}
                        value={this.state.description}
                    />
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={styles.registerButton} onPress={() => {
                            this.setState({
                                academicTeachingVisible: true,
                                view: 'academic/other'
                            })
                        }}>
                            <Text style={styles.registerButtonText}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
    problem1 = () => {
        if (this.state.problem1 == 'Academic') {
            return (
                <ScrollView>
                    <View style={styles.Picker}>
                        <Picker
                            selectedValue={this.state.academicProblem1}
                            style={{ height: RFValue(50), width: RFValue(250) }}
                            onValueChange={(itemValue, itemIndex) => { this.setState({ academicProblem1: itemValue }) }}
                        >
                            <Picker.Item label="SELECT PROBLEM" value="SELECT PROBLEM" />
                            <Picker.Item label="Teaching" value="Teaching" />
                            <Picker.Item label="Home Work" value="Home Work" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                    </View>
                    <View>
                        {this.academicProblem1()}
                    </View>
                </ScrollView>
            );
        }
        if (this.state.problem1 == 'Facility') {
            return (
                <ScrollView>
                    <View style={styles.Picker}>
                        <Picker
                            selectedValue={this.state.facilityProblem1}
                            style={{ height: RFValue(50), width: RFValue(250) }}
                            onValueChange={(itemValue, itemIndex) => { this.setState({ facilityProblem1: itemValue }) }}
                        >
                            <Picker.Item label="SELECT PROBLEM" value="SELECT PROBLEM" />
                            <Picker.Item label="Transport" value="Transport" />
                            <Picker.Item label="Food" value="Food" />
                        </Picker>
                    </View>
                    <View style={{ alignItems: 'flex-start', marginLeft: RFValue(40), marginTop: RFValue(20), fontSize: RFValue(15) }}>
                        <Text>Due COVID-19 lockdown the Facility are not working so you can't Report Problem in Facility</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: RFValue(50) }}>
                        <Button
                            title="Reset    "
                            type="outline"
                            buttonStyle={{ width: '40%' }}
                            titleStyle={{ textAlign: 'center' }}
                            onPress={() => {
                                this.setState({
                                    problem1: null,
                                    selectedIndex1: null
                                })
                            }}
                        />
                    </View>
                </ScrollView>
            );
        }
        if (this.state.problem1 == null) {
            return (
                <ScrollView>
                    <View style={{ alignItems: 'center', marginTop: RFValue(20) }}>
                        <TouchableOpacity
                            style={{ backgroundColor: 'red', borderRadius: RFValue(10) }}
                            onPress={() => {
                                this.setState({
                                    visible: true
                                })
                            }}>
                            <Text style={{ fontSize: RFValue(20), marginLeft: RFValue(10), fontWeight: 'bold', marginRight: RFValue(10) }}>Parent Password Reset</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            );
        }
    }

    render() {
        return (
            <View style={{ flex: 1.12, backgroundColor: '#ffefff' }}>
                <ScrollView>
                    <View>
                        <Header
                            leftComponent={<Icon name='sign-out-alt' type='font-awesome-5' color='#fff' solid={false} size={RFValue(40)} onPress={() => {
                                this.props.navigation.navigate("parentScreen")
                                ToastAndroid.showWithGravityAndOffset(
                                    "Sign out Successfully",
                                    ToastAndroid.LONG,
                                    ToastAndroid.BOTTOM,
                                    25,
                                    50
                                );
                            }} />}
                            centerComponent={{ text: 'Parent Corner', style: { color: '#fff', fontSize: 20, fontWeight: "bold", } }}
                            rightComponent={<Image
                                source={require('../assets/logo.png')}
                                style={{ width: '92%', height: '100%' }}
                            />}
                            backgroundColor="#1338BF"
                        />
                    </View>
                    <View style={{ flex: 0.08 }}>
                        <Text style={{ fontSize: RFValue(17), marginLeft: RFValue(10), fontWeight: 'bold' }}>Report a Problem</Text>
                        <ButtonGroup
                            onPress={this.updateIndex1}
                            selectedIndex={this.state.selectedIndex1}
                            buttons={['Academic', 'Facility']}
                            containerStyle={{ height: RFValue(50), borderRadius: RFValue(10) }}
                        />
                    </View>
                    <View style={{ flex: 0.8 }}>
                        {this.problem1()}
                        <Overlay
                            isVisible={this.state.visible}
                            overlayStyle={{ width: '80%', marginTop: RFValue(20), marginBottom: RFValue(20) }}
                            onBackdropPress={() => {
                                this.setState({
                                    visible: false
                                })
                            }}>
                            <View style={{ marginTop: RFValue(15), alignItems: 'center' }}>
                                <Text style={styles.label}>Reset Password </Text>
                                <View style={{ marginTop: RFValue(20) }}></View>
                                <Input
                                    style={styles.loginBox}
                                    placeholder={'Old Password'}
                                    secureTextEntry={true}
                                    onChangeText={(text) => {
                                        this.setState({
                                            oldPassword: text,
                                        });
                                    }}
                                    leftIcon={
                                        <Icon
                                            name="key"
                                            size={RFValue(35)}
                                            color="#fabf10"
                                            type="font-awesome-5"
                                        />
                                    }
                                />
                                <TouchableOpacity
                                    style={styles.registerButton}
                                    onPress={() => {
                                        if (this.state.oldPassword == this.state.password) {
                                            this.setState({
                                                visible: false,
                                                visible2: true
                                            })
                                        }
                                        if (this.state.oldPassword.length == 0) {
                                            Alert.alert(
                                                "Invalid password",
                                                "Please Enter Passward",
                                                [
                                                    {
                                                        text: "Forgot Password",
                                                        onPress: () => {
                                                            Alert.alert(
                                                                "Forgot Password",
                                                                "For Recovery Password Call School",
                                                                [
                                                                    {
                                                                        text: "Call",
                                                                        onPress: () => { Linking.openURL(`tel:${9384507030}`) },
                                                                    },
                                                                    {
                                                                        text: "Cancel",
                                                                    },
                                                                ])
                                                        }
                                                    },
                                                    { text: "OK" }
                                                ],
                                            );
                                            Vibration.vibrate()
                                        }
                                        if (this.state.oldPassword != this.state.password) {
                                            Alert.alert(
                                                "Invalid password",
                                                "Please Enter valid Passward",
                                                [
                                                    {
                                                        text: "Forgot Password",
                                                        onPress: () => {
                                                            Alert.alert(
                                                                "Forgot Password",
                                                                "For Recovery Password Call School",
                                                                [
                                                                    {
                                                                        text: "Call",
                                                                        onPress: () => { Linking.openURL(`tel:${9384507030}`) },
                                                                    },
                                                                    {
                                                                        text: "Cancel",
                                                                    },
                                                                ])
                                                        }
                                                    },
                                                    { text: "OK" }
                                                ],
                                            );
                                            Vibration.vibrate()
                                        }
                                    }}>
                                    <Text style={styles.registerButtonText}>NEXT</Text>
                                </TouchableOpacity>
                            </View>
                        </Overlay>

                        <Overlay
                            isVisible={this.state.visible2}
                            overlayStyle={{ width: '80%', marginTop: RFValue(20), marginBottom: RFValue(20) }}
                            onBackdropPress={() => {
                                this.setState({
                                    visible2: false
                                })
                            }}>
                            <View style={{ marginTop: RFValue(15), alignItems: 'center' }}>
                                <Text style={styles.label}>Reset Password </Text>
                                <Input
                                    style={styles.loginBox}
                                    placeholder={'Password'}
                                    secureTextEntry={true}
                                    onChangeText={(text) => {
                                        this.setState({
                                            newPassword: text,
                                        });
                                    }}
                                    leftIcon={
                                        <Icon
                                            name="user-lock"
                                            size={RFValue(35)}
                                            color="#fabf10"
                                            type="font-awesome-5"
                                        />
                                    }
                                />
                                <Input
                                    style={styles.loginBox}
                                    placeholder={'Confrim Password'}
                                    secureTextEntry={true}
                                    onChangeText={(text) => {
                                        this.setState({
                                            newPassword1: text,
                                        });
                                    }}
                                    leftIcon={
                                        <Icon
                                            name="user-lock"
                                            size={RFValue(35)}
                                            color="#fabf10"
                                            type="font-awesome-5"
                                        />
                                    }
                                />
                                <TouchableOpacity
                                    style={styles.registerButton}
                                    onPress={() => {
                                        if (this.state.newPassword.length == 0) {
                                            Alert.alert(
                                                "Invalid New Password",
                                                "Please Enter Passward",
                                                [
                                                    {
                                                        text: "Ok",
                                                    },
                                                ])
                                            Vibration.vibrate()
                                        }
                                        if (this.state.newPassword != this.state.newPassword1) {
                                            Alert.alert(
                                                "Invalid New Password",
                                                "password doesn't match\nCheck your password.",
                                                [
                                                    {
                                                        text: "Ok",
                                                    },
                                                ])
                                            Vibration.vibrate()
                                        }
                                        if (this.state.newPassword == this.state.newPassword1) {
                                            db.collection('students')
                                                .doc(this.state.userid)
                                                .update({
                                                    password: this.state.newPassword
                                                })
                                            ToastAndroid.showWithGravityAndOffset(
                                                "Password updated Successfully",
                                                ToastAndroid.LONG,
                                                ToastAndroid.BOTTOM,
                                                25,
                                                50
                                            );

                                            this.setState({
                                                visible2: false,
                                                oldPassword: '',
                                                newPassword1: '',
                                                newPassword: ''
                                            })
                                            this.props.navigation.navigate("parentScreen")
                                        }
                                    }}>
                                    <Text style={styles.registerButtonText}>Reset Password</Text>
                                </TouchableOpacity>
                            </View>
                        </Overlay>
                    </View>
                    <Overlay
                        isVisible={this.state.academicTeachingVisible}
                        overlayStyle={{ width: '80%', marginTop: RFValue(20), marginBottom: RFValue(20) }}
                    >
                        <View>
                            <Text>Are you will to submit the Report will send to administrator</Text>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity style={styles.registerButton} onPress={() => {
                                    this.sendReport();
                                    ToastAndroid.showWithGravityAndOffset(
                                        "Successfully Problem Reported",
                                        ToastAndroid.LONG,
                                        ToastAndroid.BOTTOM,
                                        25,
                                        50
                                    );
                                    this.setState({
                                        academicTeachingVisible: false,
                                        selectedIndex1: null,
                                        problem1: null,
                                        academicProblem1: null,
                                        description: null,
                                        subject: null,
                                        facilityProblem1: null,
                                        academicProblem2: null,
                                    })
                                }}>
                                    <Text style={styles.registerButtonText}>SUBMIT</Text>
                                </TouchableOpacity>
                                <Text
                                    style={styles.cancelButtonText}
                                    onPress={() => {
                                        this.setState({
                                            academicTeachingVisible: false,
                                            selectedIndex1: null,
                                            problem1: null,
                                            academicProblem1: null,
                                            description: null,
                                            subject: null,
                                            facilityProblem1: null,
                                            academicProblem2: null,
                                        })
                                    }}
                                >
                                    Cancel</Text>
                            </View>
                        </View>
                    </Overlay>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Picker: {
        backgroundColor: '#fff',
        marginTop: RFValue(10),
        height: RFValue(50),
        width: RFValue(250),
        borderRadius: RFValue(10),
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
        fontSize: RFValue(20),
        fontWeight: "bold",
        color: "#fff",
    },
    label: {
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
    cancelButtonText: {
        fontSize: RFValue(20),
        fontWeight: 'bold',
        color: "#32867d",
        marginTop: RFValue(10)
    },
})