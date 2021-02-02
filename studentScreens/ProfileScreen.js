import React, { Component } from "react";
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    ToastAndroid
} from "react-native";
import { Input, Icon, Avatar } from "react-native-elements";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import * as ImagePicker from "expo-image-picker";
import DatePicker from 'react-native-datepicker'

export default class ProfileScreen extends Component {
    constructor() {
        super();
        this.state = {
            contact: "",
            docId: "",
            userid: firebase.auth().currentUser.email,
            image: '#',
            name: "",
            section: '',
            grade: '',
            id: '',
            newPassword: '',
            password: '',
            date: ''
        };
    }

    resetnewPassword = (newPassword, password, user) => {
        var navigation = this.props.navigation
        var user = firebase.auth().currentUser;
        if (newPassword === password) {
            user.updatePassword(newPassword).then(function () {
                ToastAndroid.showWithGravityAndOffset(
                    "Password updated Successfully",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                ),
                    db.collection('students')
                        .doc(firebase.auth().currentUser.email)
                        .update({
                            mainPassword: newPassword
                        }),
                    firebase.auth().signOut(),
                    navigation.navigate("LoginScreen");
            }).catch(function (error) {
                var errorMessage = error.message;
                Alert.alert(
                    "",
                    errorMessage,
                    [
                        { text: "OK" }
                    ]
                )
            });
        } else {
            Alert.alert("password doesn't match\nCheck your password.")
        }
    }

    profileUpdate = (url) => {
        db.collection("students")
            .doc(this.state.userid)
            .update({
                imageurl: url
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
                        id: doc.data().id,
                        docId: doc.id,
                        date: doc.data().dob,
                    });
                });
            });
    }

    selectPicture = async () => {
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!cancelled) {
            this.uploadImage(uri, this.state.userid);
        }
    };

    uploadImage = async (uri, imageName) => {
        var response = await fetch(uri);
        var blob = await response.blob();

        var ref = firebase
            .storage()
            .ref()
            .child("user_profiles/" + imageName);

        return ref.put(blob).then((response) => {
            this.fetchImage(imageName);
        });
    };

    fetchImage = (imageName) => {
        var storageRef = firebase
            .storage()
            .ref()
            .child("user_profiles/" + imageName);

        storageRef
            .getDownloadURL()
            .then((url) => {
                this.setState({ image: url }),
                    this.profileUpdate(url)
            })
            .catch((error) => {
                this.setState({ image: "https://firebasestorage.googleapis.com/v0/b/inbo-chat-a81c7.appspot.com/o/user_profiles%2F0c3b3adb1a7530892e55ef36d3be6cb8.png?alt=media&token=7818f4b2-e6cf-4342-8666-424c4636a430" });
            });
    };

    componentDidMount() {
        this.getUserDetails();
        this.fetchImage(this.state.userid);
    }

    render() {
        return (
            <View style={{ flex: 1.12, backgroundColor: '#fff5dc' }}>
                <ScrollView>
                    <View>
                        <MyHeader title="Profile" navigation={this.props.navigation} />
                    </View>
                    <View style={{ flex: 0.35 }}>
                        <View
                            style={{
                                flex: 0.3,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 20
                            }}
                        >

                            <Avatar
                                rounded
                                source={{
                                    uri: this.state.image,
                                }}
                                size={RFValue(200)}
                                onPress={() => this.selectPicture()}
                                title={this.state.name}
                                showEditButton
                            />


                            <View style={{ marginTop: -30, alignItems: 'flex-end', marginLeft: RFValue(133) }}>
                                <Icon name='camera-retro' type='font-awesome-5' color="#fabf10" solid={true} />
                            </View>

                            <Text
                                style={{
                                    fontWeight: "300",
                                    fontSize: RFValue(20),
                                    color: "#000",
                                    padding: RFValue(10),
                                }}
                            >
                                {this.state.name}
                            </Text>
                        </View>
                    </View>


                    <View style={styles.formContainer}>
                        <View
                            style={{
                                flex: 0.65,
                            }}
                        >
                            <Text style={styles.label}>Name </Text>
                            <Text style={styles.label1}>{this.state.name}</Text>
                            <Text style={styles.label}>Contact </Text>
                            <Text style={styles.label1}>{this.state.contact}</Text>
                            <Text style={styles.label}>Grade </Text>
                            <Text style={styles.label1}>{this.state.grade}</Text>
                            <Text style={styles.label}>Section </Text>
                            <Text style={styles.label1}>{this.state.section}</Text>
                            <Text style={styles.label}>USER ID </Text>
                            <Text style={styles.label1}>{this.state.userid}</Text>
                            <Text style={styles.label}>PASS ID </Text>
                            <Text style={styles.label1}>{this.state.id}</Text>
                            <Text style={styles.label}>Date of Birth </Text>
                            <DatePicker
                                style={{ width: 200, marginLeft: RFValue(30) }}
                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                format="DD-MM-YYYY"
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
                                onDateChange={(date) => {
                                    this.setState({ date: date })
                                    db.collection('students')
                                        .doc(this.state.userid)
                                        .update({
                                            dob: date
                                        })
                                }}
                            />
                            <View style={{ marginTop: RFValue(15), alignItems: 'center' }}>
                                <Text style={styles.label}>Reset Password </Text>
                                <Input
                                    style={styles.loginBox}
                                    placeholder={'Password'}
                                    secureTextEntry={true}
                                    onChangeText={(text) => {
                                        this.setState({
                                            password: text,
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
                                <TouchableOpacity
                                    style={styles.registerButton}
                                    onPress={() => {
                                        this.resetnewPassword(this.state.newPassword, this.state.password, firebase.auth().currentUser.email)
                                    }}>
                                    <Text style={styles.registerButtonText}>Reset Password</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FDDDE6"
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
        color: "#FD6A02",
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
});