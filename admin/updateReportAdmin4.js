import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView,
    Modal
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import db from "../config";
import firebase from "firebase";
import { Header, Icon, Input } from "react-native-elements"

export default class updateReportAdmin4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            studentName: this.props.navigation.getParam("details")["name"],
            student_email_id: this.props.navigation.getParam("details")["email_id"],
            class_report: '',
            updateclass_report: '',
            name: '',
        };
    }

    getReport = () => {
        db.collection(this.state.student_email_id)
            .where("field", "==", 'reportCard')
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        class_report: doc.data().Administrator,
                        updateclass_report: doc.data().Administrator
                    });
                });
            });
    }

    updateReport = (Report) => {
        db.collection(this.state.student_email_id)
            .doc("ReportCard")
            .update({
                Administrator: Report,
                lastAdministratorChangeName: this.state.name
            })
        Alert.alert('Updated Report Successfully')
    }

    getUserDetails = () => {
        db.collection("admin")
            .where("email_id", "==", this.state.userId)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        name: doc.data().name,
                    });
                });
            });
    }

    componentDidMount() {
        this.getReport()
        this.getUserDetails()
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
                <View>
                    <Header
                        leftComponent={<Icon name='arrow-alt-circle-left' type='font-awesome-5' color='#fff' solid={false} size={RFValue(40)} onPress={() => this.props.navigation.goBack()} />}
                        centerComponent={{ text: this.state.studentName + ' REPORT', style: { color: '#fabf10', fontSize: 20, fontWeight: "bold", } }}
                        rightComponent={<Image
                            source={require('../assets/logo.png')}
                            style={{ width: '92%', height: '100%' }}
                        />}
                        backgroundColor="#1338BF"
                    />
                </View>
                <View>
                    <Text style={styles.label}>Previous Report of {this.state.studentName} </Text>
                    <Text style={styles.label1}>{this.state.class_report}</Text>
                    <Text style={styles.label}>Update {this.state.studentName}'s Report</Text>
                    <Input
                        style={styles.loginBox}
                        placeholder={'Student Report'}
                        onChangeText={(text) => {
                            this.setState({
                                updateclass_report: text,
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
                        value={this.state.updateclass_report}
                        style={[styles.formTextInput, { height: RFValue(200) }]}
                        multiline
                    />
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity
                            style={styles.button1}
                            onPress={() => {
                                this.updateReport(this.state.updateclass_report);
                            }}
                        >
                            <Text style={styles.buttonText}>UPDATE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
    label1: {
        fontSize: RFValue(18),
        color: "#FD6A02",
        fontWeight: 'bold',
        marginLeft: RFValue(50)
    },
    button1: {
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
        alignItems: "center"
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
    formTextInput: {
        width: "75%",
        height: RFValue(45),
        borderWidth: 1,
        padding: 10,
    },
});