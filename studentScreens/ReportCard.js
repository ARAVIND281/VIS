import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import MyHeader from "../components/MyHeader";

export default class ReportCard extends Component {
    constructor() {
        super();
        this.state = {
            userid: firebase.auth().currentUser.email,
            AdministratorReport: '',
            classTeacherReport: '',
            subjectTeacherReport: '',
            teacherName: '',
            docId: '',
        };
    }

    getReport = () => {
        db.collection(this.state.userid)
            .where("field", "==", 'reportCard')
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        AdministratorReport: doc.data().Administrator,
                        classTeacherReport: doc.data().classTeacher,
                        subjectTeacherReport: doc.data().subjectTeacher,
                        teacherName: doc.data().teacherName,
                        docId: doc.id,
                    });
                });
            });
    }

    componentDidMount() {
        this.getReport()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <View>
                        <MyHeader title="Report Card" navigation={this.props.navigation} />
                    </View>
                    <Text style={{ marginLeft: RFValue(10), marginTop: RFValue(15), fontSize: RFValue(18), fontWeight: 'bold' }}>
                        Report from Administrator/Principal</Text>
                    <View style={{ flex: 0.25, backgroundColor: '#FFEFE5', alignContent: 'center', marginLeft: RFValue(10), marginRight: RFValue(10), marginTop: RFValue(10) }}>
                        <ScrollView>
                            <Text>{this.state.AdministratorReport}</Text>
                        </ScrollView>
                    </View>
                    <Text style={{ marginLeft: RFValue(10), marginTop: RFValue(5), fontSize: RFValue(18), fontWeight: 'bold' }}>
                        Report from Class teacher</Text>
                    <View style={{ flex: 0.3, backgroundColor: '#FDDDE6', alignContent: 'center', marginLeft: RFValue(10), marginRight: RFValue(10), marginTop: RFValue(10) }}>
                        <View style={{ justifyContent: 'space-between' }}>
                            <ScrollView>
                                <Text>{this.state.classTeacherReport}</Text>
                            </ScrollView>
                        </View>
                    </View>
                    <Text style={{ marginLeft: RFValue(10), marginTop: RFValue(5), fontSize: RFValue(18), fontWeight: 'bold' }}>
                        Report from Subject teacher</Text>
                    <View style={{ flex: 0.3, backgroundColor: '#D7EFF4', alignContent: 'center', marginLeft: RFValue(10), marginRight: RFValue(10), marginTop: RFValue(10) }}>
                        <View style={{ justifyContent: 'space-between', flex: 0.92 }}>
                            <ScrollView>
                                <Text>{this.state.subjectTeacherReport}</Text>
                            </ScrollView>
                            <Text style={{ textAlign: 'right' }}>~{this.state.teacherName}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#add8e6",
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
});