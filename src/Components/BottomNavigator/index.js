import React, { Component } from 'react';

import { SView, SText, STheme, SGradient, SIcon, SNavigation } from 'servisofts-component'
import Model from '../../Model';
import Carrito from '../Carrito';

export default class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	getItem({ key, title, icon, url, params }) {
		var color = "#ffffff";
		var isSelect = (url == this.props.url)
		return <SView flex center height onPress={() => {
			SNavigation.navigate(url, params);
		}} >
			<SView style={{
				borderRadius: 16,
				// backgroundColor: (isSelect ? "#ffffff44" : ""),
				width: 55,
				height: 45,
			}} center>
				<SView height={23} colSquare center >
					{/* <SIcon name={icon} stroke={color} fill={STheme.color.primary} /> */}
					{/* <SIcon name={icon} stroke={isSelect ? STheme.color.info : color} fill={isSelect ? STheme.color.info : STheme.color.white} /> */}
					<SIcon name={icon} fill={isSelect ? STheme.color.info : color}  />
				</SView>
				<SView height={2} />
				<SText fontSize={8} center color={isSelect ? STheme.color.info : color}  >{title}</SText>
			</SView>
		</SView>
	}
	render() {
		return (
			// <SView flex col={"xs-12"}>
			// 		<SView col={"xs-12"} flex>
			// 		</SView>
			<>
				<SView col={"xs-12"} height={60} border={'transparent'}
					style={{
						// backgroundColor: STheme.color.primary,
						borderTopLeftRadius: 35,
						borderTopRightRadius: 35,
						overflow: 'hidden',
					}}>
					<SView col={'xs-12'} row height style={{zIndex:100}}>
						{this.getItem({ key: "root", title: 'Inicio', icon: 'Inicio', url: '/public' })}
						{this.getItem({ key: "explorar", title: 'Explorar', icon: 'Explorar', url: '/explorar' })}
						{
							!Model.usuario.Action.getKey() ?
								(this.getItem({ key: "login", title: 'Cuenta', icon: 'Login', url: '/login' }))
								: (this.getItem({ key: "favorito", title: 'Mis pedidos', icon: 'IconoPedido', url: '/pedidos' }))
						}
						{
							!Model.usuario.Action.getKey() ?
								null
								: (this.getItem({ key: "pedido", title: 'Carrito', icon: 'MenuPedido', url: '/carrito/pedido' }))
						}
						{/* {this.getItem({ key: "pedido", title: 'Pedidos', icon: 'MenuPedido', url: '/compras' })} */}
					</SView>
					<SGradient deg={50} colors={[STheme.color.primary, "#71D1F0",]} style={{zIndex:99}} />
				</SView >
				<Carrito.Float bottom={100} />
			</>
			// </SView>
		);
	}
}
