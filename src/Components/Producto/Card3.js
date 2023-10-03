import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SInput, SLoad, SMath, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import PButtomSmall from '../PButtomSmall';
import Model from '../../Model';
import { TextInput } from 'react-native';
export type ProductoCard2PropsType = {
    data: any,
    onPress?: (obj) => {},
}
class index extends Component<ProductoCard2PropsType> {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.data.vdcan,
        };
    }

    // componentDidMount() {

    //     console.log(this.props.data.prdcod + "codigooooo")
    //     Model.tbprd.Action.getAll({ prdcod: this.props.data.prdcod }).then((e) => {
            
    //         console.log("siiiiiiiiiiii")
    //         console.log(e);
    //         this.setState({ dataProducto: e?.data[0] })
    //     }).catch(e => {
    //         console.log("nooooooooo")

    //         SPopup.alert(e.error)
    //         console.error(e)
    //     })
    // }

    enviarDatosItems = () => {
        const datos = {
            // tbprd: this.props.data,
            tbprd: { [this.props.data.idprd]: { cantidad: this.state.count, data: this.props.data } },
            items: this.state.count,
            precio: this.props.data.prdpoficial,
        };
        this.props.items(datos);
    };

    render() {
        var active = true;

        var {prdcod, vdcan, vddesc, vdpre  } = this.props.data;

        console.log(this.props.data.cantidad + " - data");
        console.log(this.state.count + " - state");

        console.log(this.props.data.prdcod + "codigooooo")

         var productos = Model.tbprd.Action.getAllSimple();
            if (!productos) return <SLoad />
    
            var objProducto = (Object.values(productos).filter((a) => this.props.data.prdcod == a.prdcod)[0])
            // this.setState({ dataProducto:Object.values(productos).filter((a) => this.props.data.prdcod == a.prdcod) })

        console.log("dataproducto");

        console.log(objProducto)
        return (
            <SView col={"xs-12"} card row {...this.props}
                style={{
                    borderRadius: 4,
                    borderWidth: 1,
                    padding: 10,
                    opacity: active ? 1 : 0.6,
                    borderColor: !active ? "#D20C0C" : STheme.color.card
                }}
            >

                <SView col={"xs-3"} height={105}>
                    <SImage src={require('../../Assets/img/foto.png')}
                        style={{
                            resizeMode: "contain",
                            position: "absolute",
                            zIndex: 90,
                            top: 0,
                        }}
                    />
                    <SImage enablePreview src={SSocket.api.root + "tbprd/" + objProducto?.idprd}
                        style={{
                            resizeMode: "contain",
                            borderRadius: 4,
                            overflow: "hidden",
                            position: "absolute",
                            zIndex: 99,
                            top: 0,
                            backgroundColor: "#ffffff50"

                        }}
                    />
                </SView>
                <SView col={"xs-0.5"}></SView>
                <SView col={"xs-8.5"}>
                    <SView col={"xs-11"}>
                        <SText fontSize={16}>{objProducto?.prdnom}</SText>
                    </SView>
                    <SView col={"xs-12"} row>
                        <SText fontSize={11} color={STheme.color.gray}>Stock: {objProducto?.stock} </SText>
                        <SView width={5}><SText fontSize={11}>|</SText></SView>
                        <SText fontSize={11} color={STheme.color.gray}> Ud: {objProducto?.prdunid} </SText>
                        <SView width={5}><SText fontSize={11}>|</SText></SView>
                        <SText fontSize={11} color={STheme.color.gray}> UxC: {objProducto?.prdcxu}</SText>
                    </SView>

                    <SHr />
                    <SView row>
                        <SView col={"xs-7"} row center>
                            <SView center width={35} height={35} style={{ borderRadius: 4, borderColor: "#E2E2E2", borderWidth: 1 }}
                                onPress={() => {
                                    if (this.state.count <= 0) return;
                                    this.state.count = this.state.count - 1 
                                    this.enviarDatosItems()
                                }}
                                backgroundColor={STheme.color.card}
                            >
                                <SIcon name='Menos' height={4} />
                            </SView>
                            {/* <SView width={2} /> */}
                            {/* <SText fontSize={16}>{this.state?.count ? this.state.count : this.props?.data?.cantidad}</SText> */}
                            <SView flex height={35} >
                            
                                
                                {/* <TextInput value={this.state.count !== null && this.state.count !== undefined ? this.state.count.toString() : ""}  style={{ */}
                                <TextInput value={(this.state.count ?? 0) + ""}  style={{
                                    flex: 1,
                                    height: 40,
                                    borderRadius: 4,
                                    backgroundColor: STheme.color.lightGray + "30",
                                    textAlign: "center",
                                    color: STheme.color.text
                                }}
                                    keyboardType={"numeric"}
                                    inputMode={"numeric"}
                                    onChangeText={(val) => {
                                        if (this.state?.count) {
                                            if (val == "") val = 1
                                            this.state.count = parseInt(val);
                                            this.enviarDatosItems();
                                            console.log(this.state);
                                        }
                                    }}
                                />
                            </SView>
                            {/* <SInput type="number" defaultValue={this.props?.data?.cantidad ?? 0} onChangeText={(val) => {
                                // if (this.state?.count) {
                                //     if (val == "") val = 1
                                //     this.state.count = parseInt(val);
                                //     this.enviarDatosItems();
                                //     console.log(this.state?.count + " - count - ");
                                // }

                                // console.log(val + " - AQUI");
                            }}
                                // placeholder={"as"}
                                style={{
                                    textAlign: "center",
                                    backgroundColor: STheme.color.lightGray + "30",
                                    padding: 0,
                                    margin: 0,
                                    // paddingLeft: 0,
                                    // paddingRight: 0,
                                    fontSize: 10
                                }}
                            /> */}
                            {/* <SView width={4} /> */}
                            {/* <SView width={10} /> */}
                            <SView center width={35} height={35} style={{ borderRadius: 4, borderColor: "#E2E2E2", borderWidth: 1 }}
                                onPress={() => {
                                    if (this.state.count >= objProducto?.stock) return;
                                    this.state.count = this.state.count + 1
                                    this.enviarDatosItems()
                                }}
                                backgroundColor={STheme.color.card}
                            >
                                <SIcon name='Mas' height={18} />
                            </SView>
                        </SView>
                        <SView col={"xs-5"} style={{ alignItems: "flex-end" }}>
                            <SText fontSize={18} bold>Bs. {SMath.formatMoney(vdpre)}</SText>
                            <SHr />
                            {/* {this.state.count >= 1 ? <PButtomSmall fontSize={13}
                                onPress={this.enviarDatosItems}
                            >Añadir
                            </PButtomSmall> : <SView height={24} />} */}
                        </SView>
                    </SView>
                </SView>
                <SView height={25} width={25}
                    style={{
                        position: "absolute",
                        top: 8,
                        right: 8
                    }}
                    onPress={() => {
                        const productos = Model.carrito.Action.removeItem(idprd)
                    }}
                >
                    <SIcon name='Delete2' height={18} fill={STheme.color.text} />
                    {/* <SText>ELIMINAR</SText> */}
                </SView>
            </SView>
        );
    }
}
export default (index);