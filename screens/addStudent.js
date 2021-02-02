import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  Picker
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Icon, Input, Header } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import MyHeader from "../components/MyHeader";

export default class addStudent extends Component {
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
    };
  }

  userSignUp = (emailId, password, confirmPassword) => {
    var id = Math.random().toString(36).substring(7);
    if (password !== confirmPassword) {
      return alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection('students').doc(emailId).set({
            name: this.state.name,
            grade: this.state.grade,
            contact: this.state.contact,
            email_id: this.state.emailId,
            section: this.state.section,
            id: id,
            dateScore: 0,
            mainScore: 0,
            weekScore: 0,
            monthScore: 0,
            first: "0",
            imageurl:
              'https://firebasestorage.googleapis.com/v0/b/inbo-chat-a81c7.appspot.com/o/user_profiles%2F0c3b3adb1a7530892e55ef36d3be6cb8.png?alt=media&token=7818f4b2-e6cf-4342-8666-424c4636a430',
          });
          db.collection(this.state.emailId).doc('ReportCard').set({
            Administrator: 'There is no Report from Administrator/Principal',
            classTeacher: 'There is no Report from Class Teacher',
            subjectTeacher: 'There is no Report from Subject Teacher',
            email_id: this.state.emailId,
            teacherName: 'null',
            field: 'reportCard',
          });
          db.collection(this.state.emailId).doc('quiz').set({
            dateScore: 0,
            email_id: this.state.emailId,
            field: 'quiz',
            isEnd: false,
            lastDate: '0',
            mainScore: 0,
            monthScore: 0,
            weekScore: 0,
          });
          return alert('User Added Successfully')
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          return alert(errorMessage);
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <MyHeader title="ADD STUDENT" navigation={this.props.navigation} />
        </View>
        <ScrollView style={styles.scrollview}>
          <View style={{ flex: 0.95 }}>
            <Text style={styles.label}>Name </Text>
            <Input
              style={styles.loginBox}
              placeholder={'name'}
              onChangeText={(text) => {
                this.setState({
                  name: text,
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
            <View style={styles.Picker}>
              <Picker
                selectedValue={this.state.grade}
                style={{ height: RFValue(50), width: RFValue(250) }}
                onValueChange={(itemValue, itemIndex) => { this.setState({ grade: itemValue }) }}
              >
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

            <Text style={styles.label}> section </Text>

            <View style={styles.Picker}>
              <Picker
                selectedValue={this.state.section}
                style={{ height: RFValue(50), width: RFValue(250) }}
                onValueChange={(itemValue, itemIndex) => { this.setState({ section: itemValue }) }}
              >
                <Picker.Item label="A1" value="A1" />
                <Picker.Item label="A2" value="A2" />
                <Picker.Item label="A3" value="A3" />
                <Picker.Item label="A4" value="A4" />
                <Picker.Item label="A5" value="A5" />
              </Picker>
            </View>

            <Text style={styles.label}>Contact </Text>

            {this.state.contact.length !== 10 ? (
              <Input
                style={styles.loginBox}
                placeholder={'Contact'}
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({
                    contact: text,
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
                      contact: text,
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

            <Text style={styles.label}>USER ID </Text>
            <Input
              style={styles.loginBox}
              placeholder={'name@inbo.com'}
              keyboardType={'email-address'}
              onChangeText={(text) => {
                this.setState({
                  emailId: text.toLowerCase().trim(),
                });
              }}
              value={this.state.emailId}
              leftIcon={
                <Icon
                  name="envelope-open-text"
                  size={RFValue(35)}
                  color="#fabf10"
                  type="font-awesome-5"
                />
              }
            />

            <Text style={styles.label}> Password </Text>
            <Input
              style={styles.loginBox}
              placeholder={'Password'}
              secureTextEntry={false}
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

            <Text style={styles.label}>Confirm Password</Text>
            <Input
              style={styles.loginBox}
              placeholder={'Confrim Password'}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  confirmPassword: text,
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
          </View>

          <View style={{ flex: 0.2, alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => {
                this.state.contact.length !== 10
                  ? alert('Enter a Valid Phone Number')
                  : this.userSignUp(
                    this.state.emailId,
                    this.state.password,
                    this.state.confirmPassword
                  );
              }}>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
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
  Picker: {
    backgroundColor: '#fabf10',
    marginTop: RFValue(10),
    height: RFValue(50),
    width: RFValue(250),
    borderRadius: RFValue(10),
    marginLeft: RFValue(20)
  }
});

/*
<Input
              style={styles.loginBox}
              placeholder={'section'}
              multiline={true}
              onChangeText={(text) => {
                this.setState({
                  section: text.toUpperCase().trim(),
                });
              }}
              value={this.state.section}
              leftIcon={
                <Icon
                  name="address-card"
                  size={RFValue(35)}
                  color="#fabf10"
                  type="font-awesome-5"
                />
              }
              value={this.state.section}
            />
            <Input
              style={styles.loginBox}
              placeholder={'Grade'}
              onChangeText={(text) => {
                this.setState({
                  grade: text,
                });
              }}
              value={this.state.grade}
              leftIcon={
                <Icon
                  name="id-badge"
                  size={RFValue(35)}
                  color="#fabf10"
                  type="font-awesome-5"
                />
              }
            />
*/