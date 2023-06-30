import React, { Component } from 'react';

import { SView, SText, STheme, SGradient, SIcon, SNavigation } from 'servisofts-component'
import Model from '../../Model';

export default class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			// <SView flex col={"xs-12"}>
			// 		<SView col={"xs-12"} flex>
			// 		</SView>
			<SView onPress={() => {
				// props.onPress();
				this.props.onPress();
			}}
				style={{
					position: "absolute",
					right: 10,
					bottom: 40,
					width: 50,
					height: 50,
					// borderWidth: STheme.color.secondary + "22",
					// borderColor: STheme.color.secondary + "22",
					justifyContent: "center",
					alignItems: "center",
					// margin: 4,
					...this.props.style
				}}>
				<SIcon name={"AgregarTap"} fill="#fff"/>
				{/* <Svg name={"Add"} style={{
					width: "100%",
					height: "100%",
					// fill:"#C31"
				}} /> */}
			</SView >
			// </SView>
		);
	}
}
