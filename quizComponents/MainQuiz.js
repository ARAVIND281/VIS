import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Image
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";
import { Header, Icon } from "react-native-elements"

class MainQuiz extends React.Component {
  constructor() {
    super();
    var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var day = new Date().getDay();
    var date2 = new Date().getDate();
    this.state = {
      currentQuestion: 0,
      myAnswer: null,
      options: [],
      score: 0,
      isEnd: false,
      quizData: [],
      userid: firebase.auth().currentUser.email,
      date: date,
      isshowImageModalVisible: false,
      image3: '',
      lastDate: '',
      lastQuiz: '',
      day: day,
      weekScore: 0,
      monthScore: 0,
      mainScore: 0,
      cdate: date2,
      lastweek: '',
    };
  }

  tozero = (lastweek, lastMonth) => {
    var d = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var lastweek1 = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)

    if (lastweek1 != lastweek) {
      db.collection('students')
        .doc(this.state.userid)
        .update({
          weekScore: 0
        })
    }
    if (lastMonth != (new Date().getMonth() + 1)) {
      db.collection('students')
        .doc(this.state.userid)
        .update({
          monthScore: 0
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
            messageVisible: doc.data().messageVisible,
          });
          this.readQue(doc.data().grade)
          this.tozero(doc.data().lastWeek,doc.data().lastMonth)
        });
      });
  }

  getWeek = () => {
    var d = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    this.setState({
      lastweek: Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
    })
  }

  showImage = (image) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isshowImageModalVisible}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                isshowImageModalVisible: false
              })
            }}
          >
            <View style={{ alignContent: 'space-between', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={{ uri: this.state.image3 }}
                style={{ width: '80%', height: '80%' }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  setData = () => {
    var value = Math.floor(Math.random() * (11 - 1 + 1)) + 1
    if (value === 1) {
      this.setState({
        image3: 'https://firebasestorage.googleapis.com/v0/b/story-hub-f2fc0.appspot.com/o/gif%2F1.gif?alt=media&token=1741c96a-9207-4d22-b52a-b6dbe1ae0920'
      })
    } if (value === 2) {
      this.setState({
        image3: 'https://firebasestorage.googleapis.com/v0/b/story-hub-f2fc0.appspot.com/o/gif%2F2.gif?alt=media&token=ecfe13bd-1a32-4723-bad0-ff9e5267ef96'
      })
    } if (value === 3) {
      this.setState({
        image3: 'https://firebasestorage.googleapis.com/v0/b/story-hub-f2fc0.appspot.com/o/gif%2F4.gif?alt=media&token=c327ae51-93d6-4f59-9868-27323c94a925'
      })
    } if (value === 4) {
      this.setState({
        image3: 'https://firebasestorage.googleapis.com/v0/b/story-hub-f2fc0.appspot.com/o/gif%2F4.gif?alt=media&token=c327ae51-93d6-4f59-9868-27323c94a925'
      })
    } if (value === 5) {
      this.setState({
        image3: 'https://firebasestorage.googleapis.com/v0/b/story-hub-f2fc0.appspot.com/o/gif%2F5.gif?alt=media&token=0e5c403d-d5a2-43c5-95f8-f78b1b0c4ae2'
      })
    } if (value === 6) {
      this.setState({
        image3: 'https://firebasestorage.googleapis.com/v0/b/story-hub-f2fc0.appspot.com/o/gif%2F6.gif?alt=media&token=e71bc48f-9644-4cac-9a45-02e722098604'
      })
    } if (value === 7) {
      this.setState({
        image3: 'https://firebasestorage.googleapis.com/v0/b/story-hub-f2fc0.appspot.com/o/gif%2F7.gif?alt=media&token=d05e9402-5552-473e-b2c2-02fe5e78b523'
      })
    } if (value === 8) {
      this.setState({
        image3: 'https://firebasestorage.googleapis.com/v0/b/story-hub-f2fc0.appspot.com/o/gif%2F8.gif?alt=media&token=69bdc500-5591-4552-98e6-bd2f1bf0dc89'
      })
    } if (value === 9) {
      this.setState({
        image3: 'https://firebasestorage.googleapis.com/v0/b/story-hub-f2fc0.appspot.com/o/gif%2F9.gif?alt=media&token=aa20ca4c-4ec9-4c83-a2de-c8e9d6f17f0c'
      })
    } if (value === 10) {
      this.setState({
        image3: 'https://firebasestorage.googleapis.com/v0/b/story-hub-f2fc0.appspot.com/o/gif%2F10.gif?alt=media&token=a633449a-0404-447f-9187-db90928d398b'
      })
    }if (value === 11) {
      this.setState({
        image3: 'https://firebasestorage.googleapis.com/v0/b/story-hub-f2fc0.appspot.com/o/gif%2F11.gif?alt=media&token=3d295cd4-46e3-488e-8f42-3c66fa89eb21'
      })
    }if (value === 12) {
      this.setState({
        image3: 'https://firebasestorage.googleapis.com/v0/b/story-hub-f2fc0.appspot.com/o/gif%2F12.gif?alt=media&token=76ddad3d-f92f-482f-b595-eac078cde77f'
      })
    }
    if (value === 13) {
      this.setState({
        image3: 'https://firebasestorage.googleapis.com/v0/b/story-hub-f2fc0.appspot.com/o/gif%2F13.gif?alt=media&token=9fc84e9a-0f62-4728-ae55-f229b483f502'
      })
    }if (value === 14) {
      this.setState({
        image3: 'https://firebasestorage.googleapis.com/v0/b/story-hub-f2fc0.appspot.com/o/gif%2F14.gif?alt=media&token=c4165284-b3ca-4518-9e1d-14e657a20bed'
      })
    }
  }

  readDate = () => {
    db.collection(this.state.userid)
      .where("field", "==", 'quiz')
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            lastDate: doc.data().lastDate,
            mainScore: doc.data().mainScore
          });
          if (this.state.cdate !== 1) {
            this.setState({
              monthScore: doc.data().monthScore,
            })
          } else if (this.state.cdate == 1) {
            db.collection(this.state.userid)
              .doc('quiz')
              .update({
                monthScore: 0
              })
          }
          if (this.state.day !== 0) {
            this.setState({
              weekScore: doc.data().weekScore,
            })
          } else if (this.state.day == 0) {
            db.collection(this.state.userid)
              .doc('quiz')
              .update({
                weekScore: 0
              })
          }
          if (this.state.date !== doc.data().lastDate) {
            db.collection(this.state.userid)
              .doc('quiz')
              .update({
                lastDate: this.state.date,
                dateScore: 0,
                isEnd: false,
              })
          }
        });
      });
  }

  readQue = (grade) => {
    db.collection("test")
      .where(grade, "==", true)
      .where("date", "==", this.state.date)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            quizData: doc.data().test,
          });
          this.loadQuizData();
        });
      });

    db.collection(this.state.userid)
      .where("field", "==", 'quiz')
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            isEnd: doc.data().isEnd,
          });
          if (doc.data().isEnd === true) {
            db.collection(this.state.userid)
              .where("field", "==", 'quiz')
              .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  this.setState({
                    score: doc.data().dateScore
                  });
                });
              });
          }
        });
      });
  }

  loadQuizData = () => {
    this.setState(() => {
      return {
        questions: this.state.quizData[this.state.currentQuestion].question,
        answer: this.state.quizData[this.state.currentQuestion].answer,
        options: this.state.quizData[this.state.currentQuestion].options
      };
    });
  };

  componentDidMount() {
    this.getWeek()
    this.readDate()
    this.setData()
    this.getUserDetails()
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          questions: this.state.quizData[this.state.currentQuestion].question,
          options: this.state.quizData[this.state.currentQuestion].options,
          answer: this.state.quizData[this.state.currentQuestion].answer
        };
      });
    }
  }

  nextQuestionHandler = (answer) => {
    this.setData()

    if (answer === this.state.answer) {
      this.setState({
        score: this.state.score + 10,
        isshowImageModalVisible: true
      })
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
  };

  checkAnswer = (answer) => {
    this.setState({
      myAnswer: answer,
    })
    {
      this.state.currentQuestion < this.state.quizData.length - 1 && (
        this.nextQuestionHandler(answer)
      )
    }
    {
      this.state.currentQuestion === this.state.quizData.length - 1 && (
        this.finishHandler(answer)
      )
    }
  }
  finishHandler = (answer) => {
    this.setState({
      isEnd: true
    });
    db.collection(this.state.userid)
      .doc('quiz')
      .update({
        isEnd: true,
        lastDate: this.state.date,
        lastWeek: this.state.lastweek,
        lastMonth: (new Date().getMonth() + 1)
      })
    db.collection('students')
      .doc(this.state.userid)
      .update({
        lastDate: this.state.date,
        lastWeek: this.state.lastweek,
        lastMonth: (new Date().getMonth() + 1)
      })
    if (answer === this.state.answer) {
      var wScore1 = this.state.score + this.state.weekScore + 10
      var mScore1 = this.state.score + this.state.monthScore + 10
      var maScore1 = this.state.score + this.state.mainScore + 10
      db.collection(this.state.userid)
        .doc('quiz')
        .update({
          dateScore: this.state.score + 10,
          weekScore: wScore1,
          monthScore: mScore1,
          mainScore: maScore1
        })
      db.collection('students')
        .doc(this.state.userid)
        .update({
          dateScore: this.state.score + 10,
          weekScore: wScore1,
          monthScore: mScore1,
          mainScore: maScore1,
          lastDate: this.state.date,
          lastDay: this.state.day
        })
      this.updateDateScore(this.state.score + 10)
      this.setState({
        score: this.state.score + 10,
        isshowImageModalVisible: true
      });
    }
    if (answer !== this.state.answer) {
      var wScore = this.state.score + this.state.weekScore
      var mScore = this.state.score + this.state.monthScore
      var maScore = this.state.score + this.state.mainScore

      db.collection(this.state.userid)
        .doc('quiz')
        .update({
          dateScore: this.state.score,
          weekScore: wScore,
          monthScore: mScore,
          mainScore: maScore
        })
      this.updateDateScore(this.state.score)
      db.collection('students')
        .doc(this.state.userid)
        .update({
          dateScore: this.state.score,
          weekScore: wScore,
          monthScore: mScore,
          mainScore: maScore,
          lastDate: this.state.date,
          lastDay: this.state.day
        })
    }
  };

  updateDateScore = (score) => {
    if (this.state.day === 0) {
      db.collection(this.state.userid)
        .doc('quiz')
        .update({
          sunscore: score
        })
    } else if (this.state.day === 1) {
      db.collection(this.state.userid)
        .doc('quiz')
        .update({
          monscore: score
        })
    } else if (this.state.day === 2) {
      db.collection(this.state.userid)
        .doc('quiz')
        .update({
          tuescore: score
        })
    } else if (this.state.day === 3) {
      db.collection(this.state.userid)
        .doc('quiz')
        .update({
          wedscore: score
        })
    } else if (this.state.day === 4) {
      db.collection(this.state.userid)
        .doc('quiz')
        .update({
          thuscore: score
        })
    } else if (this.state.day === 5) {
      db.collection(this.state.userid)
        .doc('quiz')
        .update({
          friscore: score
        })
    } else if (this.state.day === 6) {
      db.collection(this.state.userid)
        .doc('quiz')
        .update({
          satscore: score
        })
    }
  }
  render() {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;
    if (this.state.quizData.length === 0) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.12 }}>
            <Header
              leftComponent={<Icon name='arrow-alt-circle-left' type='font-awesome-5' color='#fff' solid={false} size={RFValue(40)} onPress={() => this.props.navigation.goBack()} />}
              centerComponent={{ text: 'QUIZ', style: { color: '#fff', fontSize: 20, fontWeight: "bold", } }}
              rightComponent={<Image
                source={require('../assets/logo.png')}
                style={{ width: '92%', height: '100%' }}
              />}
              backgroundColor="#1338BF"
            />
          </View>
          <View style={{
            flex: 0.88,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: RFValue(80),
          }}>
            <Image
              source={require('../assets/Notification.png')} />
            <Text style={{ fontSize: RFValue(25) }}>No Quiz Found</Text>
          </View>
        </View>
      )
    }
    else {
      if (isEnd) {
        return (
          <View style={{ backgroundColor: "#ffefff", height: '100%' }}>
            <Header
              leftComponent={<Icon name='arrow-alt-circle-left' type='font-awesome-5' color='#fff' solid={false} size={RFValue(40)} onPress={() => this.props.navigation.goBack()} />}
              centerComponent={{ text: 'QUIZ', style: { color: '#fff', fontSize: 20, fontWeight: "bold", } }}
              rightComponent={<Image
                source={require('../assets/logo.png')}
                style={{ width: '92%', height: '100%' }}
              />}
              backgroundColor="#1338BF"
            />
            <ScrollView>
              {this.showImage(1)}
              <View style={{ marginTop: RFValue(20) }}>
                <Text> QUIZ OVER. {this.state.score} IS YOUR MARK </Text>
                <View>
                  <Text>The correct answer's for the questions was</Text>
                  {this.state.quizData.map((item, index) => (
                    <ScrollView style={{
                      alignSelf: 'center',
                      width: '90%',
                      marginBottom: RFValue(20),
                      borderColor: 'blue',
                      borderRadius: RFValue(10),
                      backgroundColor: 'skyblue',
                    }}>
                      <TouchableOpacity style={{
                        marginBottom: RFValue(20),
                        borderColor: 'blue',
                        borderRadius: RFValue(10),
                        backgroundColor: 'skyblue'
                      }}>
                        <Text style={{ fontSize: RFValue(15), textAlign: 'justify' }}>
                          Question :{item.question}
                        </Text>
                        <Text style={{ marginTop: RFValue(20), fontSize: RFValue(20), textAlign: 'center' }}>
                          Answer :{item.answer}
                        </Text>
                      </TouchableOpacity>
                    </ScrollView>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        );
      } else {
        return (
          <View style={{ backgroundColor: "#ffefff", height: '100%' }}>
            <Header
              leftComponent={<Icon name='arrow-alt-circle-left' type='font-awesome-5' color='#fff' solid={false} size={RFValue(40)} onPress={() => this.props.navigation.goBack()} />}
              centerComponent={{ text: 'QUIZ', style: { color: '#fff', fontSize: 20, fontWeight: "bold", } }}
              rightComponent={<Image
                source={require('../assets/logo.png')}
                style={{ width: '92%', height: '100%' }}
              />}
              backgroundColor="#1338BF"
            />
            <View style={{
              alignItems: 'center',
              marginTop: RFValue(20),
              marginLeft: RFValue(20),
              marginRight: RFValue(20)
            }}>
              <Text style={{ fontSize: RFValue(17) }}>{this.state.questions} </Text>
              <Text style={{
                fontSize: RFValue(15),
                marginTop: RFValue(20),
                marginBottom: RFValue(20)
              }}>
                {`Questions ${currentQuestion + 1}  out of ${this.state.quizData.length} remaining `}
              </Text>
              {this.showImage(1)}
              {options.map(options => (
                <ScrollView style={{
                  width: '80%',
                  marginBottom: RFValue(20),
                  borderColor: 'blue',
                  borderRadius: RFValue(10),
                  backgroundColor: 'skyblue'
                }}>
                  <TouchableOpacity
                    style={{
                      marginBottom: RFValue(20),
                      borderColor: 'blue',
                      borderRadius: RFValue(10),
                      backgroundColor: 'skyblue'
                    }}
                    onPress={() => {
                      this.setData()
                      this.checkAnswer(options)
                    }}>
                    <Text
                      key={options.id}

                      style={{ marginTop: RFValue(20), fontSize: RFValue(20), textAlign: 'center' }}
                    >
                      {options}
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              ))}
            </View>
          </View>
        );
      }
    }
  }
}

export default MainQuiz;