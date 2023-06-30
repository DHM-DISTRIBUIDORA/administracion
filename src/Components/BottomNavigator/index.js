import React, { Component } from 'react';

import { SView, SText, STheme, SGradient, SIcon, SNavigation } from 'servisofts-component'
import Model from '../../Model';

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
				backgroundColor: (isSelect ? "#ffffff44" : ""),
				width: 55,
				height: 45,
			}} center>
				<SView height={23} colSquare center >
					<SIcon name={icon} fill={color} />
				</SView>
				<SView height={2} />
				<SText fontSize={8} center color={color}  >{title}</SText>
			</SView>
		</SView>
	}
	render() {
		return (
			// <SView flex col={"xs-12"}>
			// 		<SView col={"xs-12"} flex>
			// 		</SView>
			<SView col={"xs-12"} height={50} border={'transparent'} style={{ backgroundColor: STheme.color.accent }}>
				<SView col={'xs-12'} row height >
					{this.getItem({ key: "root", title: 'Descrubir', icon: 'MenuLocation', url: '/root' })}
					{this.getItem({ key: "explorar", title: 'Explorar', icon: 'MenuExplorar', url: '/explorar' })}
					{
						!Model.usuario.Action.getKey() ?
							(this.getItem({ key: "login", title: 'Login', icon: 'Exit', url: '/login' }))
							: (this.getItem({ key: "favorito", title: 'Favoritos', icon: 'MenuFavoritos', url: '/favoritos' }))
					}
					{
						!Model.usuario.Action.getKey() ?
							null
							: (this.getItem({ key: "pedido", title: 'Pedidos', icon: 'MenuPedido', url: '/compras' }))
					}
					{/* {this.getItem({ key: "pedido", title: 'Pedidos', icon: 'MenuPedido', url: '/compras' })} */}
				</SView>
			</SView >
			// </SView>
		);
	}
}
