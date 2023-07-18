import { SInputsCofig, STheme } from 'servisofts-component';
const inputs = () => {
    return {
        default: {
            LabelStyle: {
                position: "absolute",
                top: -8,
                left: 0,
                fontSize: 12,
                width: "100%",
                // color: STheme.color.text,
                // backgroundColor:STheme.color.primary+"22",
                // borderRadius:4,
                // padding:4,
                // backgroundColor: "#E0E0E0" + "55",
            },
            View: {
                // borderWidth: 2,
                //  borderColor: "#E0E0E0" + "40",
                height: 40,
                borderRadius: 4,
                marginTop: 30,
                paddingStart: 4,
                backgroundColor: STheme.color.card,
                // backgroundColor: '#E0E0E0' + '35'
            },
            InputText: {
                // fontSize: 16,

                paddingStart: 8,
                color: STheme.color.text,
                placeholderTextColor: STheme.color.gray,
                // backgroundColor: "#E0E0E0" + "55",
                // height: 55,
                // borderRadius: 16,
                // backgroundColor: STheme.color.card,
            },
            "placeholder": {
                color: STheme.color.gray,
            },
            error: {
                // borderRadius: 16,
                borderWidth: 1,
                borderColor: "#FA8081"
            }
        }
    }
}
// const inputs = () => {
//     return {
//         "default": {
//             "LabelStyle": {
//                 position: "absolute",
//                 top: -10,
//                 left: 0,
//                 fontSize: 14,
//                 width: "100%",
//                 color: STheme.color.text,
//             },
//             "View": {
//                 borderWidth: 2,
//                 borderColor: "#999999" + "40",
//                 height: 55,
//                 borderRadius: 16,
//                 marginTop: 50,

//             },
//             "InputText": {
//                 fontSize: 16,
//                 paddingStart: 20,
//                 color: STheme.color.text,
//                 backgroundColor: "#FFFFFF",
//                 placeholderTextColor: STheme.color.gray,
//                 height: 55,
//                 borderRadius: 16,
//             },
//             "error": {
//                 borderRadius: 16,
//                 borderColor: STheme.color.danger,
//             },
//             "placeholder": {
//                 color: STheme.color.gray,
//             }
//         }
//     }
// }
export default inputs;
