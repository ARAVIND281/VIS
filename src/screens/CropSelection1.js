import React from 'react'
import { View, Text, Image, Alert } from 'react-native'
import { TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import { Icon } from "react-native-elements"

const CropSelection1 = ({ navigation }) => {
    return (
        <View style={{
            backgroundColor: "#FFF",
            flex: 1
        }}>
            <View style={{
                backgroundColor: "#00a46c",
                height: "28%",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                paddingHorizontal: 20,
            }}>
                <View style={{
                    flexDirection: "row",
                    marginTop: 50
                }}>
                    <TouchableOpacity
                        style={{
                            height: 20,
                            width: 20,
                            marginTop:-5,
                            marginRight:15
                        }}
                        onPress={() => { navigation.navigate("Home1") }}
                    >
                        <Icon
                            name='arrow-left'
                            type='font-awesome-5'
                            color='#fff'
                            size={20}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 10,
                            width: 20,
                        }}
                        onPress={() => { navigation.toggleDrawer() }}
                    >
                        <Image
                            source={require('../image/1.png')}
                            style={{
                                height: 10,
                                width: 20,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 25,
                    width: "100%"
                }}>
                    <View style={{ width: "50%" }}>
                        <Text style={{
                            fontSize: 28,
                            color: "#FFF",
                            fontWeight: "bold"
                        }}>Hi! Aravind</Text>
                    </View>
                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                        <Image
                            source={require('../image/image.png')}
                            style={{ height: 60, width: 60 }}
                        />
                    </View>
                </View>
            </View>
            <LinearGradient
                colors={["rgba(0,164,109,0.4)", "transparent"]}
                style={{
                    left: 0,
                    right: 0,
                    height: 90,
                    marginTop: -45
                }}
            >
                <View style={{
                    backgroundColor: "#FFF",
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    marginHorizontal: 20,
                    borderRadius: 15,
                    marginTop: 25,
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor="#b1e5d3"
                        style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            width: 260
                        }}
                    />
                    <Image
                        source={require('../image/3.png')}
                        style={{ height: 20, width: 20 }}
                    />
                </View>
            </LinearGradient>

            <ScrollView>
                <View style={{
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    width: "100%",
                    alignItems: "center"
                }}>
                    <View style={{ width: "50%" }}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            color: "#585a61"
                        }}>July to October</Text>
                        <View style={{
                            height: 4,
                            backgroundColor: "#b1e5d3",
                            width: 115,
                            marginTop: -5
                        }}>

                        </View>

                    </View>
                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                        <View style={{
                            backgroundColor: "#00a46c",
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                            borderRadius: 15
                        }}>
                            <Text
                                onPress={() =>
                                    Alert.alert(
                                        "Help", "Help wiil show here"
                                    )}
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 13,
                                    color: "#FFF"
                                }}>Help</Text>
                        </View>
                    </View>
                </View>



                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ height: 400 }}
                >
                    <LinearGradient
                        colors={["rgba(0,164,109,0.09)", "transparent"]}
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            height: 100,
                            marginTop: 220,
                            top: 0
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate("PaddyDetail")}
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: "#FFF",
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 160
                        }}
                    >
                        <Image
                            source={require('../crop_selection_img/paddy2.jpg')}
                        />
                        <View style={{
                            flexDirection: "row",
                            paddingTop: 10,
                            paddingHorizontal: 10
                        }}>
                            <Text style={{
                                fontWeight: "bold"
                            }}>Paddy</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal: 10,
                            fontWeight: "bold",
                            color: "#00a46c",
                            paddingTop: 3
                        }}>
                            90 to 110 days
                        </Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: "#FFF",
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 160
                        }}
                    >
                        <Image
                            source={require('../crop_selection_img/corn2.jpg')}
                        />
                        <View style={{
                            flexDirection: "row",
                            paddingTop: 10,
                            paddingHorizontal: 10
                        }}>
                            <Text style={{
                                fontWeight: "bold"
                            }}>Corn</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal: 10,
                            fontWeight: "bold",
                            color: "#00a46c",
                            paddingTop: 3
                        }}>
                            60 to 100 days
                        </Text>
                    </View>

                    <View
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: "#FFF",
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 160
                        }}
                    >
                        <Image
                            source={require('../crop_selection_img/cabbage2.jpg')}
                        />
                        <View style={{
                            flexDirection: "row",
                            paddingTop: 10,
                            paddingHorizontal: 10
                        }}>
                            <Text style={{
                                fontWeight: "bold"
                            }}>Cabbage</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal: 10,
                            fontWeight: "bold",
                            color: "#00a46c",
                            paddingTop: 3
                        }}>
                            90 to 120 days
                        </Text>
                    </View>

                </ScrollView>

                <View style={{
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    width: "100%",
                    alignItems: "center",
                    marginTop: -100
                }}>
                    <View style={{ width: "50%" }}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            color: "#585a61"
                        }}>October to March</Text>
                        <View style={{
                            height: 4,
                            backgroundColor: "#b1e5d3",
                            width: 115,
                            marginTop: -5
                        }}>

                        </View>

                    </View>
                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                        <View style={{
                            backgroundColor: "#00a46c",
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                            borderRadius: 15,
                        }}

                        >
                            <Text
                                onPress={() =>
                                    Alert.alert(
                                        "Help", "Help wiil show here"
                                    )}
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 13,
                                    color: "#FFF"
                                }}>Help</Text>
                        </View>
                    </View>
                </View>



                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ height: 400 }}
                >
                    <LinearGradient
                        colors={["rgba(0,164,109,0.09)", "transparent"]}
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            height: 100,
                            marginTop: 220,
                            top: 0
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate("PaddyDetail")}
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: "#FFF",
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 160
                        }}
                    >
                        <Image
                            source={require('../crop_selection_img/paddy2.jpg')}
                        />
                        <View style={{
                            flexDirection: "row",
                            paddingTop: 10,
                            paddingHorizontal: 10
                        }}>
                            <Text style={{
                                fontWeight: "bold"
                            }}>Paddy</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal: 10,
                            fontWeight: "bold",
                            color: "#00a46c",
                            paddingTop: 3
                        }}>
                            90 to 110 days
                        </Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: "#FFF",
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 160
                        }}
                    >
                        <Image
                            source={require('../crop_selection_img/corn2.jpg')}
                        />
                        <View style={{
                            flexDirection: "row",
                            paddingTop: 10,
                            paddingHorizontal: 10
                        }}>
                            <Text style={{
                                fontWeight: "bold"
                            }}>Corn</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal: 10,
                            fontWeight: "bold",
                            color: "#00a46c",
                            paddingTop: 3
                        }}>
                            60 to 100 days
                        </Text>
                    </View>

                    <View
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: "#FFF",
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 160
                        }}
                    >
                        <Image
                            source={require('../crop_selection_img/cabbage2.jpg')}
                        />
                        <View style={{
                            flexDirection: "row",
                            paddingTop: 10,
                            paddingHorizontal: 10
                        }}>
                            <Text style={{
                                fontWeight: "bold"
                            }}>Cabbage</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal: 10,
                            fontWeight: "bold",
                            color: "#00a46c",
                            paddingTop: 3
                        }}>
                            90 to 120 days
                        </Text>
                    </View>

                </ScrollView><View style={{
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    width: "100%",
                    alignItems: "center",
                    marginTop: -100
                }}>
                    <View style={{ width: "50%" }}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            color: "#585a61"
                        }}>March to June</Text>
                        <View style={{
                            height: 4,
                            backgroundColor: "#b1e5d3",
                            width: 115,
                            marginTop: -5
                        }}>

                        </View>

                    </View>
                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                        <View style={{
                            backgroundColor: "#00a46c",
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                            borderRadius: 15
                        }}>
                            <Text
                                onPress={() =>
                                    Alert.alert(
                                        "Help", "Help wiil show here"
                                    )}
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 13,
                                    color: "#FFF"
                                }}>Help</Text>
                        </View>
                    </View>
                </View>



                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ height: 400 }}
                >
                    <LinearGradient
                        colors={["rgba(0,164,109,0.09)", "transparent"]}
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            height: 100,
                            marginTop: 220,
                            top: 0
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate("PaddyDetail")}
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: "#FFF",
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 160
                        }}
                    >
                        <Image
                            source={require('../crop_selection_img/paddy2.jpg')}
                        />
                        <View style={{
                            flexDirection: "row",
                            paddingTop: 10,
                            paddingHorizontal: 10
                        }}>
                            <Text style={{
                                fontWeight: "bold"
                            }}>Paddy</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal: 10,
                            fontWeight: "bold",
                            color: "#00a46c",
                            paddingTop: 3
                        }}>
                            90 to 110 days
                        </Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: "#FFF",
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 160
                        }}
                    >
                        <Image
                            source={require('../crop_selection_img/corn2.jpg')}
                        />
                        <View style={{
                            flexDirection: "row",
                            paddingTop: 10,
                            paddingHorizontal: 10
                        }}>
                            <Text style={{
                                fontWeight: "bold"
                            }}>Corn</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal: 10,
                            fontWeight: "bold",
                            color: "#00a46c",
                            paddingTop: 3
                        }}>
                            60 to 100 days
                        </Text>
                    </View>

                    <View
                        style={{
                            height: 250,
                            elevation: 2,
                            backgroundColor: "#FFF",
                            marginLeft: 20,
                            marginTop: 20,
                            borderRadius: 15,
                            marginBottom: 10,
                            width: 160
                        }}
                    >
                        <Image
                            source={require('../crop_selection_img/cabbage2.jpg')}
                        />
                        <View style={{
                            flexDirection: "row",
                            paddingTop: 10,
                            paddingHorizontal: 10
                        }}>
                            <Text style={{
                                fontWeight: "bold"
                            }}>Cabbage</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal: 10,
                            fontWeight: "bold",
                            color: "#00a46c",
                            paddingTop: 3
                        }}>
                            90 to 120 days
                        </Text>
                    </View>

                </ScrollView>
            </ScrollView>
        </View>
    )
}
export default CropSelection1;