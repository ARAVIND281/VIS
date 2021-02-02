import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView,
    FlatList
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import MyHeader from "../components/MyHeader";
import { Input, Icon, ListItem, Avatar } from "react-native-elements";

export default class LeaderBoard1 extends Component {
    constructor() {
        super();
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            time: date,
            leaderBoard: [],
            userId: firebase.auth().currentUser.email,
        };
    }

    getLeaderBoard = async () => {
        this.studentsRef = await db.collection('leaderBoard')
            .onSnapshot((snapshot) => {
                var leaderBoard = snapshot.docs.map((doc) => doc.data())
                this.setState({
                    leaderBoard: leaderBoard
                });
            })
    }

    componentDidMount() {
        this.getLeaderBoard()
    }

    keyExtractor = (index) => index.toString()

    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                title={
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("LeaderBoard2", { "details": item })
                        }}
                    >
                        <Text
                            style={{
                                fontSize: RFValue(20)
                            }}
                        >{item.field}</Text>
                    </TouchableOpacity>}
                //titleStyle={{ color: 'black', fontWeight: 'bold' }}
                rightElement={
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("LeaderBoard2", { "details": item })
                        }}
                    >
                        <Icon name="arrow-alt-circle-right" type="font-awesome-5" solid={true} size={RFValue(35)} />
                    </TouchableOpacity>
                }
                leftElement={
                    <Icon name="award" type="font-awesome-5" solid={true} size={RFValue(35)} />
                }
                bottomDivider
            />
        )
    }

    render() {
        if (this.state.leaderBoard == 0) {
            return (
                <View>
                    <View style={{ flex: 0.12 }}>
                        <MyHeader title="Leader Board" navigation={this.props.navigation} />
                    </View>
                    <View style={{
                        flex: 0.88,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: RFValue(300),
                    }}>
                        <Image
                            source={require('../assets/Notification.png')} />
                        <Text style={{ fontSize: RFValue(20), textAlign: 'center' }}>{'No leaderBoard found'}</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff5dc' }}>
                    <MyHeader title="Leader Board" navigation={this.props.navigation} />
                    <View style={{ flex: 1 }}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.leaderBoard}
                            renderItem={this.renderItem}
                        />
                    </View>
                </View>
            );
        }
    }
}