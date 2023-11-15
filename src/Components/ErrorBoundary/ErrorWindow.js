import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
// import {  } from 'react-native-svg'
import { SHr, SText, SView } from 'servisofts-component'
import ReportButtom from './ReportButtom'

export default class ErrorWindow extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                padding: 16,
                backgroundColor: '#31C2F1',
                borderRadius: 16,
                margin: 16,
                height: "100%",
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{
                    alignItems: 'center',
                }}>
                    {/* <Icon name="rocket" size={30} color="#900" /> Ajusta el nombre del icono y sus propiedades */}
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        marginVertical: 8,
                        color: '#FFFFFF',
                    }}>¡ALGO MALO PASA!</Text>
                    <View style={{ height: 20 }} />
                    <Image
                        source={require('../../Assets/img/bug.png')}
                        style={{ width: 230, height: 276 }}
                    />
                    <View style={{ height: 20 }} />
                    <Text style={{
                        fontSize: 16,
                        color: '#FFFFFF',
                        textAlign: 'center',
                    }}>{this.props.error.message}</Text>
                    <View style={{ height: 50 }} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                    }} >
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#FFFFFF',
                                padding: 10,
                                borderRadius: 5,
                                alignItems: 'center',
                                width: 100,
                                flex: 1,
                                height: 50,
                                justifyContent: 'center',
                            }}
                            onPress={() => {
                                navigation.navigate('public')
                            }
                            }
                        >
                            <Text style={{
                                color: '#000',
                                fontSize: 16,
                            }}>IGNORAR</Text>
                        </TouchableOpacity>
                        <View style={{ width: 20 }} />
                        <ReportButtom {...this.props} />
                    </View>
                </View>
                {/* <Text >
                    {this.props.errorInfo.componentStack}
                </Text> */}
            </View>
        )
    }
}