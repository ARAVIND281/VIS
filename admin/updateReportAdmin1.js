import React, { Component } from "react";
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    FlatList
} from "react-native";
import { Input, Icon, ListItem, Avatar } from "react-native-elements";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import * as ImagePicker from "expo-image-picker";

export default class updateReportAdmin1 extends Component {

    constructor() {
        super();
        this.state = {
            contact: "",
            userid: firebase.auth().currentUser.email,
            name: "",
            docId: "",
            id: '',
            grades: [],
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
                            this.props.navigation.navigate("updateReportasSubject2", { "details": item })
                        }}
                    >
                        <Text
                            style={{
                                fontSize: RFValue(20)
                            }}
                        >Grade {item.grade}</Text>
                    </TouchableOpacity>}
                //titleStyle={{ color: 'black', fontWeight: 'bold' }}
                rightElement={
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("updateReportasSubject2", { "details": item })
                        }}
                    >
                        <Icon name="arrow-alt-circle-right" type="font-awesome-5" solid={true} size={RFValue(35)} />
                    </TouchableOpacity>
                }
                bottomDivider
            />
        )
    }


    componentDidMount() {
        this.getClass();
    }

    getClass = async () => {
        this.studentsRef = await db.collection('grade')
            .onSnapshot((snapshot) => {
                var grades = snapshot.docs.map((doc) => doc.data())
                this.setState({
                    grades: grades
                });
            })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
                <View>
                    <MyHeader title="UPDATE REPORT" navigation={this.props.navigation} />
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.grades}
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
});