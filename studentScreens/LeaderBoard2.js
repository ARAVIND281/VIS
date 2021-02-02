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
import { Header, Icon, Avatar, ListItem } from "react-native-elements"

export default class LeaderBoard2 extends Component {
    constructor(props) {
        super(props);
        var day = new Date().getDay();
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            userId: firebase.auth().currentUser.email,
            field: this.props.navigation.getParam("details")["field"],
            value: this.props.navigation.getParam("details")["value"],
            sort: this.props.navigation.getParam("details")["sort"],
            students: [],
            day: day,
            date: date,
            grade: '',
        };
    }

    getUserDetails = () => {
        db.collection("students")
            .where("email_id", "==", this.state.userId)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        grade: doc.data().grade,
                    });
                });
                this.getstudents()
            });
    }

    getstudents = async () => {
        if (this.state.sort === 'mainScore') {
            this.studentsRef = await db.collection('students')
                .where('grade', '==', this.state.grade)
                .limit(50)
                .orderBy(this.state.value, 'desc')
                .onSnapshot((snapshot) => {
                    var students = snapshot.docs.map((doc) => doc.data())
                    this.setState({
                        students: students
                    });
                })
        }
        if (this.state.sort === 'monthScore') {
            this.studentsRef = await db.collection('students')
                .where('grade', '==', this.state.grade)
                .where('lastMonth', '==', (new Date().getMonth() + 1))
                .limit(50)
                .orderBy(this.state.value, 'desc')
                .onSnapshot((snapshot) => {
                    var students = snapshot.docs.map((doc) => doc.data())
                    this.setState({
                        students: students
                    });
                })
        }
        if (this.state.sort === 'weekScore') {
            var d = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
            var dayNum = d.getUTCDay() || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            var lastWeek = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
            this.studentsRef = await db.collection('students')
                .where('grade', '==', this.state.grade)
                .where('lastWeek', '==', lastWeek)
                .limit(50)
                .orderBy(this.state.value, 'desc')
                .onSnapshot((snapshot) => {
                    var students = snapshot.docs.map((doc) => doc.data())
                    this.setState({
                        students: students
                    });
                })
        }
    }

    keyExtractor = (index) => index.toString()

    renderItem = ({ item, i, index }) => {
        if (this.state.sort === 'mainScore') {
            return (
                <ListItem
                    key={i}
                    title={
                        <Text
                            style={{
                                fontSize: RFValue(20)
                            }}
                        >{item.name}</Text>
                    }
                    subtitle={
                        <Text>{item.grade} {item.section}</Text>
                    }
                    //titleStyle={{ color: 'black', fontWeight: 'bold' }}

                    rightElement={
                        <Text>{item.mainScore}</Text>
                    }
                    leftAvatar={
                        <Avatar rounded source={{ uri: item.imageurl }} size={RFValue(50)} />
                    }
                    leftElement={
                        <Text style={{ fontSize: RFValue(20), fontWeight: 'bold' }} >{index + 1}</Text>
                    }
                    bottomDivider
                />
            )
        }
        if (this.state.sort === 'monthScore') {
            return (
                <ListItem
                    key={i}
                    title={
                        <Text
                            style={{
                                fontSize: RFValue(20)
                            }}
                        >{item.name}</Text>
                    }
                    subtitle={
                        <Text>{item.grade} {item.section}</Text>
                    }
                    //titleStyle={{ color: 'black', fontWeight: 'bold' }}shining
                    rightElement={
                        <Text>{item.monthScore}</Text>
                    }
                    leftAvatar={
                        <Avatar rounded source={{ uri: item.imageurl }} size={RFValue(50)} title={item.name} />
                    }
                    leftElement={
                        <Text style={{ fontSize: RFValue(20), fontWeight: 'bold' }}>{index + 1}</Text>
                    }
                    bottomDivider
                />
            )
        }
        if (this.state.sort === 'weekScore') {
            return (
                <ListItem
                    key={i}
                    title={
                        <Text
                            style={{
                                fontSize: RFValue(20)
                            }}
                        >{item.name}</Text>
                    }
                    subtitle={
                        <Text>{item.grade} {item.section}</Text>
                    }
                    //titleStyle={{ color: 'black', fontWeight: 'bold' }}

                    rightElement={
                        <Text>{item.weekScore}</Text>
                    }
                    leftAvatar={
                        <Avatar rounded source={{ uri: item.imageurl }} size={RFValue(50)} />
                    }
                    leftElement={
                        <Text style={{ fontSize: RFValue(20), fontWeight: 'bold' }}>{index + 1}</Text>
                    }
                    bottomDivider
                />
            )
        }
    }

    componentDidMount() {
        this.getUserDetails()
    }

    render() {
        if (this.state.students.length == 0) {
            return (
                <View style={{ backgroundColor: '#fff5dc', flex: 1 }}>
                    <Header
                        leftComponent={<Icon name='arrow-alt-circle-left' type='font-awesome-5' color='#fff' solid={false} size={RFValue(40)} onPress={() => this.props.navigation.goBack()} />}
                        centerComponent={{ text: this.state.field, style: { color: '#fff', fontSize: 20, fontWeight: "bold", } }}
                        rightComponent={<Image
                            source={require('../assets/logo.png')}
                            style={{ width: '92%', height: '100%' }}
                        />}
                        backgroundColor="#1338BF"
                    />
                    <View style={{
                        flex: 0.88,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image
                            source={require('../assets/emptyLeader.png')} />
                        <Text style={{ fontSize: RFValue(20), textAlign: 'center' }}>{'Getting more students for the Leaderboard!\nplay daly Quiz to enter LeaderBoard'}</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
                    <View>
                        <Header
                            leftComponent={<Icon name='arrow-alt-circle-left' type='font-awesome-5' color='#fff' solid={false} size={RFValue(40)} onPress={() => this.props.navigation.goBack()} />}
                            centerComponent={{ text: this.state.field, style: { color: '#fff', fontSize: 20, fontWeight: "bold", } }}
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