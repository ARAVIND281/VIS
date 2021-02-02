import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    Modal,
    Vibration,
    Linking
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { Icon, Input, Overlay } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import DatePicker from 'react-native-datepicker'

export default class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            emailId: '',
            name: '',
            grade: '',
            section: '',
            contact: '',
            password: '',
            confirmPassword: '',
            user_id: '',
            isModalVisible: false,
            loding: false,
            dob: '',
            checkName: '',
            checkGrade: '',
            checkSection: '',
            checkdob: '',
            checkContact: '',
            checkPassId: '',
            verificationModalVisible: false,
            overlay2Visible: false,
            verificationEmail: '',
            checkName2: '',
            checkGrade2: '',
            checkSection2: '',
            checkdob2: '',
            checkContact2: '',
            checkPassId2: '',
            checkPass: '',
            PermissionGranted: true,
            PermissionText: 'Please update the App',
            headText: 'login error',
        };
    }

    getPermission = () => {
        db.collection('login')
            .where("version", "==", "1.0.10")
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        PermissionGranted: doc.data().login,
                        PermissionText: doc.data().text,
                        headText: doc.data().headText,
                    })
                });
            });
    }

    getverificationCode = () => {
        db.collection("students")
            .where("email_id", "==", this.state.verificationEmail)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        checkName2: doc.data().name,
                        checkGrade2: doc.data().grade,
                        checkSection2: doc.data().section,
                        checkContact2: doc.data().contact,
                        checkdob2: doc.data().dob,
                        checkPassId2: doc.data().id,
                        checkPass: doc.data().mainPassword,
                    });
                    if (doc.data().mainPassword == undefined) {
                        this.setState({
                            checkPass: doc.data().contact
                        })
                    }
                    if (doc.data().id != undefined) {
                        this.setState({
                            verificationModalVisible: true,
                            overlay2Visible: false,
                        })
                    }

                });
            });
    }

    verificationModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.verificationModalVisible}
            >
                <ScrollView style={styles.scrollview}>
                    <View style={styles.signupView}>
                        <Text style={styles.signupText}>Verification</Text>
                    </View>
                    <View style={{ flex: 0.95 }}>
                        <Text style={styles.label}>Name </Text>
                        <Input
                            style={styles.loginBox}
                            placeholder={'name'}
                            onChangeText={(text) => {
                                this.setState({
                                    checkName: text,
                                });
                            }}
                            leftIcon={
                                <Icon
                                    name="id-badge"
                                    size={RFValue(35)}
                                    color="#fabf10"
                                    type="font-awesome-5"
                                />
                            }
                        />

                        <Text style={styles.label}>Grade</Text>
                        <Input
                            style={styles.loginBox}
                            placeholder={'Grade'}
                            onChangeText={(text) => {
                                this.setState({
                                    checkGrade: text,
                                });
                            }}
                            leftIcon={
                                <Icon
                                    name="id-badge"
                                    size={RFValue(35)}
                                    color="#fabf10"
                                    type="font-awesome-5"
                                />
                            }
                        />

                        <Text style={styles.label}> section </Text>
                        <Input
                            style={styles.loginBox}
                            placeholder={'section'}
                            multiline={true}
                            onChangeText={(text) => {
                                this.setState({
                                    checkSection: text,
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
                        />

                        <Text style={styles.label}> Pass ID </Text>
                        <Input
                            style={styles.loginBox}
                            placeholder={'Pass ID'}
                            multiline={true}
                            onChangeText={(text) => {
                                this.setState({
                                    checkPassId: text,
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
                        />

                        <Text style={styles.label}>Contact </Text>

                        {this.state.checkContact.length !== 10 ? (
                            <Input
                                style={styles.loginBox}
                                placeholder={'Contact'}
                                maxLength={10}
                                keyboardType={'numeric'}
                                onChangeText={(text) => {
                                    this.setState({
                                        checkContact: text,
                                    });
                                }}
                                leftIcon={
                                    <Icon
                                        name="phone"
                                        size={RFValue(35)}
                                        color="#fabf10"
                                        type="font-awesome-5"
                                    />
                                }
                                errorMessage="Enter a Valid Phone Number"
                            />
                        ) : (
                                <Input
                                    style={styles.loginBox}
                                    placeholder={'Contact'}
                                    maxLength={10}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => {
                                        this.setState({
                                            checkContact: text,
                                        });
                                    }}
                                    leftIcon={
                                        <Icon
                                            name="phone"
                                            size={RFValue(35)}
                                            color="#fabf10"
                                            type="font-awesome-5"
                                        />
                                    }
                                />
                            )}
                        <Text style={styles.label}>Date of Birth </Text>
                        <DatePicker
                            style={{ width: 200, marginLeft: RFValue(10) }}
                            date={this.state.checkdob}
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
                            onDateChange={(date) => { this.setState({ checkdob: date }) }}
                        />
                    </View>

                    <View style={{ flex: 0.2, alignItems: 'center' }}>
                        <TouchableOpacity
                            style={[styles.registerButton, { width: '90%' }]}
                            onPress={() => {
                                this.getLogin()
                                this.state({
                                    verificationModalVisible: false
                                })
                            }}>
                            <Text style={styles.registerButtonText}>Confirm Verification</Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.cancelButtonText}
                            onPress={() => {
                                this.setState({ verificationModalVisible: false })
                            }}
                        >
                            Cancel</Text>
                    </View>
                </ScrollView>
            </Modal>
        );
    }

    getLogin = () => {
        if (this.state.checkName.toLocaleLowerCase() == this.state.checkName2.toLocaleLowerCase() && this.state.checkGrade.toLocaleLowerCase() == this.state.checkGrade2.toLocaleLowerCase()
            && this.state.checkSection.toLocaleLowerCase() == this.state.checkSection2.toLocaleLowerCase() && this.state.checkContact == this.state.checkContact2
            && this.state.checkPassId == this.state.checkPassId2) {
            if (this.state.checkdob == this.state.checkdob2 || this.state.checkdob2 == undefined) {
                Alert.alert(
                    "Password",
                    this.state.checkPass + 'is your password requesting to reset in profile screen'
                )
            }
            else {
                Alert.alert('Information that you provided is wrong ')
            }
        } else {
            Alert.alert('Information that you provided is wrong')
        }
    }

    userLogin = (emailId, password) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(emailId, password)
            .then(() => {
                this.setState({
                    loding: true
                })
                db.collection("teacher")
                    .where("email_id", "==", emailId)
                    .onSnapshot((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc.data().state === "hod") {
                                this.props.navigation.navigate('hodHome')
                                //Alert.alert('hod')
                            }
                            if (doc.data().state === "teacher") {
                                this.props.navigation.navigate('teacherHome')
                            }
                            //Alert.alert('teacher')
                        });
                    })
                db.collection("students")
                    .where("email_id", "==", emailId)
                    .onSnapshot((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            this.props.navigation.navigate('Home')
                        });
                    });
                db.collection("admin")
                    .where("email_id", "==", emailId)
                    .onSnapshot((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            this.props.navigation.navigate('FeedBackAdmin')
                        });
                    });

            })
            .catch((error) => {
                this.setState({
                    loding: false
                })
                var errorCode = error.code;
                var errorMessage = error.message;
                return (
                    Alert.alert(
                        "",
                        errorMessage,
                        [
                            {
                                text: "Forgot Password",
                                onPress: () => {
                                    Alert.alert(
                                        "Forgot Password",
                                        "For Recovery Password verification is Necessary",
                                        [
                                            {
                                                text: "Start verification",
                                                onPress: () => { this.setState({ overlay2Visible: true }) },
                                            },
                                            {
                                                text: "Cancel",
                                            },
                                        ])
                                }
                            },
                            { text: "OK" }
                        ],
                    ),
                    Vibration.vibrate()
                )
            });
    };

    componentDidMount() {
        this.getPermission()
    }

    render() {
        if (this.state.PermissionGranted == true) {
            return (
                <View style={styles.container}>
                    {this.verificationModal()}

                    <Overlay
                        isVisible={this.state.overlay2Visible}
                        overlayStyle={{ width: '90%' }}
                        onBackdropPress={() => {
                            this.setState({
                                overlay2Visible: false
                            })
                        }}
                    >
                        <View>
                            <Input
                                style={styles.loginBox}
                                placeholder="abc@inbo.com"
                                placeholderTextColor="#fabf10"
                                leftIcon={
                                    <Icon
                                        name='envelope-open-text'
                                        size={RFValue(35)}
                                        color='black'
                                        type="font-awesome-5"
                                    />
                                }
                                keyboardType="email-address"
                                onChangeText={(text) => {
                                    this.setState({
                                        verificationEmail: text,
                                    });
                                }}
                                label='USER ID'
                                errorMessage='verification is only for students'
                            />
                            <View style={{ alignItems: 'center' }}>
                                <Text
                                    style={styles.cancelButtonText}
                                    onPress={() => {
                                        if (this.state.verificationEmail.length != 0) {
                                            this.getverificationCode();
                                        } else {
                                            Vibration.vibrate()
                                        }
                                    }
                                    }
                                >
                                    NEXT</Text>
                            </View>
                        </View>
                    </Overlay>
                    <Overlay
                        isVisible={this.state.loding}
                        overlayStyle={{ width: '90%' }}
                    >
                        <Image
                            source={require('../assets/loding.gif')}
                            style={{ width: '100%' }}
                        />
                    </Overlay>
                    <ScrollView>
                        <View
                            style={{ flex: 0.25 }}
                        >
                            <View style={{ flex: 0.15 }} />
                            <View style={styles.logo}>
                                <Image
                                    source={require('../assets/logo.png')}
                                    style={styles.santaImage}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 0.45, marginTop: 20 }}>

                            <View style={styles.TextInput}>
                                <Input
                                    style={styles.loginBox}
                                    placeholder="abc@inbo.com"
                                    placeholderTextColor="#fabf10"
                                    leftIcon={
                                        <Icon
                                            name='envelope-open-text'
                                            size={RFValue(35)}
                                            color='black'
                                            type="font-awesome-5"
                                        />
                                    }
                                    keyboardType="email-address"
                                    onChangeText={(text) => {
                                        this.setState({
                                            emailId: text,
                                        });
                                    }}

                                />
                                <Input
                                    style={[styles.loginBox, { marginTop: RFValue(15) }]}
                                    secureTextEntry={true}
                                    placeholder="Enter Password"
                                    placeholderTextColor="#fabf10"
                                    leftIcon={
                                        <Icon
                                            name='user-lock'
                                            size={RFValue(30)}
                                            color='black'
                                            type="font-awesome-5"
                                        />
                                    }
                                    onChangeText={(text) => {
                                        this.setState({
                                            password: text,
                                        });
                                    }}
                                />
                            </View>
                            <View style={{ flex: 0.5, alignItems: "center", marginTop: 20 }}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        this.userLogin(this.state.emailId, this.state.password);
                                        this.setState({
                                            loding: true
                                        })
                                    }}
                                >
                                    <Text style={styles.buttonText}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            );
        }
        if (this.state.PermissionGranted == false) {
            return (
                <View style={styles.container}>
                    {this.verificationModal()}

                    <Overlay
                        isVisible={this.state.overlay2Visible}
                        overlayStyle={{ width: '90%' }}
                        onBackdropPress={() => {
                            this.setState({
                                overlay2Visible: false
                            })
                        }}
                    >
                        <View>
                            <Input
                                style={styles.loginBox}
                                placeholder="abc@inbo.com"
                                placeholderTextColor="#fabf10"
                                leftIcon={
                                    <Icon
                                        name='envelope-open-text'
                                        size={RFValue(35)}
                                        color='black'
                                        type="font-awesome-5"
                                    />
                                }
                                keyboardType="email-address"
                                onChangeText={(text) => {
                                    this.setState({
                                        verificationEmail: text,
                                    });
                                }}
                                label='USER ID'
                                errorMessage='verification is only for students'
                            />
                            <View style={{ alignItems: 'center' }}>
                                <Text
                                    style={styles.cancelButtonText}
                                    onPress={() => {
                                        if (this.state.verificationEmail.length != 0) {
                                            this.getverificationCode();
                                        } else {
                                            Vibration.vibrate()
                                        }
                                    }
                                    }
                                >
                                    NEXT</Text>
                            </View>
                        </View>
                    </Overlay>
                    <Overlay
                        isVisible={this.state.loding}
                        overlayStyle={{ width: '90%' }}
                    >
                        <Image
                            source={require('../assets/loding.gif')}
                            style={{ width: '100%' }}
                        />
                    </Overlay>
                    <ScrollView>
                        <View
                            style={{ flex: 0.25 }}
                        >
                            <View style={{ flex: 0.15 }} />
                            <View style={styles.logo}>
                                <Image
                                    source={require('../assets/logo.png')}
                                    style={styles.santaImage}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 0.45, marginTop: 20 }}>

                            <View style={styles.TextInput}>
                                <Input
                                    style={styles.loginBox}
                                    placeholder="abc@inbo.com"
                                    placeholderTextColor="#fabf10"
                                    leftIcon={
                                        <Icon
                                            name='envelope-open-text'
                                            size={RFValue(35)}
                                            color='black'
                                            type="font-awesome-5"
                                        />
                                    }
                                    keyboardType="email-address"
                                    onChangeText={(text) => {
                                        this.setState({
                                            emailId: text,
                                        });
                                    }}
                                />
                                <Input
                                    style={[styles.loginBox, { marginTop: RFValue(15) }]}
                                    secureTextEntry={true}
                                    placeholder="Enter Password"
                                    placeholderTextColor="#fabf10"
                                    leftIcon={
                                        <Icon
                                            name='user-lock'
                                            size={RFValue(30)}
                                            color='black'
                                            type="font-awesome-5"
                                        />
                                    }
                                    onChangeText={(text) => {
                                        this.setState({
                                            password: text,
                                        });
                                    }}
                                />
                            </View>
                            <View style={{ flex: 0.5, alignItems: "center", marginTop: 20 }}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        Alert.alert(
                                            this.state.headText,
                                            this.state.PermissionText
                                        )
                                    }}
                                >
                                    <Text style={styles.buttonText}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E5F7FE",
    },
    loginBox: {
        width: "80%",
        height: RFValue(50),
        borderWidth: 1.5,
        borderColor: "#ffffff",
        fontSize: RFValue(20),
        paddingLeft: RFValue(10),
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
        color: "#32867d",
        fontWeight: "200",
        fontSize: RFValue(20),
    },
    label: {
        fontSize: RFValue(17),
        color: "#717D7E",
        fontWeight: 'bold',
        paddingLeft: RFValue(10),
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
        fontSize: RFValue(23),
        fontWeight: "bold",
        color: "#fff",
    },
    cancelButtonText: {
        fontSize: RFValue(20),
        fontWeight: 'bold',
        color: "#32867d",
        marginTop: RFValue(10)
    },
    scrollview: {
        flex: 1,
        backgroundColor: "#fff"
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
    logo: {
        justifyContent: "center",
        alignItems: "center",
        padding: RFValue(10),
        height: RFValue(250),
        marginTop: RFValue(20)
    },
    santaImage: {
        width: "70%",
        height: "100%",
        resizeMode: "stretch"
    },
    TextInput: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center"
    }
});

/*<TouchableOpacity
style={styles.button}
onPress={() => this.setState({ isModalVisible: true })}
>
<Text style={styles.buttonText}>SignUp</Text>
</TouchableOpacity>*/