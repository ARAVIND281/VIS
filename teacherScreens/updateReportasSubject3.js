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
import db from "../config";
import firebase from "firebase";
import { Header, Icon, Input, ListItem, Avatar } from "react-native-elements"

export default class updateReportasSubject3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            grade: this.props.navigation.getParam("details")["grade"],
            section: this.props.navigation.getParam("details")["section"],
            students: [],
        };
    }

    getStudents = async () => {
        var grade = this.state.grade
        var section = this.state.section
        this.studentsRef = await db.collection('students')
            .where("grade", "==", grade)
            .where("section", "==", section)
            .onSnapshot((snapshot) => {
                var students = snapshot.docs.map((doc) => doc.data())
                this.setState({
                    students: students
                });
            })
    }

    componentDidMount() {
        this.getStudents()
    }

    keyExtractor = (index) => index.toString()

    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                title={
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("updateReportasSubject4", { "details": item })
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
                            this.props.navigation.navigate("updateReportasSubject4", { "details": item })
                        }}
                    >
                        <Icon name="arrow-alt-circle-right" type="font-awesome-5" solid={true} size={RFValue(35)} />
                    </TouchableOpacity>
                }
                leftAvatar={
                    <Avatar rounded source={{ uri: item.imageurl }} size={RFValue(50)} />
                }
                bottomDivider
            />
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
                <View>
                    <Header
                        leftComponent={<Icon name='arrow-alt-circle-left' type='font-awesome-5' color='#fff' solid={false} size={RFValue(40)} onPress={() => this.props.navigation.goBack()} />}
                        centerComponent={{ text: 'UPDATE REPORT', style: { color: '#fabf10', fontSize: 20, fontWeight: "bold", } }}
                        rightComponent={<Image
                            source={require('../assets/logo.png')}
                            style={{ width: '92%', height: '100%' }}
                        />}
                        backgroundColor="#1338BF"
                    />
                </View>
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