import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { SImage, SMapView, SNavigation, SText, STheme, SView } from 'servisofts-component';


const Cantidad = ({ cantidad }) => {
    if (!cantidad) return null;
    return <SView style={{
        position: "absolute",
        width: 30,
        height: 30,
        right: 0,
        top: 0,
        borderRadius: 100,
        overflow: "hidden",
        backgroundColor: STheme.color.danger,
    }} center>
        <SText fontSize={14} color={STheme.color.white}>{cantidad}</SText>
    </SView>
}
export default ({ latitude, longitude, key, cantidad, src, label, onPress, size = 60, content, borderColor }) => {
    // console.log();
    return <SMapView.SMarker key={key} latitude={latitude} longitude={longitude} width={size} onPress={onPress} >
        <SView width={size} height={size} padding={4} center>
            <SView flex col={"xs-12"} borderRadius={100} backgroundColor={STheme.color.card} onPress={onPress} style={{
                borderWidth: 2,
                borderColor: borderColor ?? STheme.color.text,
            }}>
                <SView style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: 100,
                    overflow: "hidden",
                }}>
                    <SImage src={src} style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover"
                    }} />
                </SView>
                <SView style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: 100,
                }} center>
                    {!content ? null : <SText fontSize={8} center >{content}</SText>}
                </SView>
            </SView>
            <Cantidad cantidad={cantidad} />
        </SView>
        {!label ? null : <SText fontSize={8} center >{label}</SText>}
    </SMapView.SMarker>
}
// export default ({ latitude, longitude, cantidad, src, label, onPress }) => {
//     // console.log();
//     return <SMapView.SMarker latitude={latitude} longitude={longitude} >
//         <TouchableOpacity style={{
//             width: 100,
//             height: 100,
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: 100,
//             borderWidth: 2,
//             borderColor: STheme.color.text,
//             backgroundColor: STheme.color.card,
//         }} onPress={onPress}>
//             <SView style={{
//                 position: "absolute",
//                 width: "100%",
//                 height: "100%",
//                 borderRadius: 100,
//                 overflow: "hidden",
//             }}>
//                 <SImage src={src} style={{
//                     resizeMode: "cover"
//                 }} />
//             </SView>
//             <Cantidad cantidad={cantidad} />
//         </TouchableOpacity>
//         {!label ? null : <SText>{label}</SText>}
//     </SMapView.SMarker>
// }