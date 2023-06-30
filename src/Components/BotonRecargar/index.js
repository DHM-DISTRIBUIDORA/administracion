import React, { Component } from 'react';

import { SView, SText, STheme, SGradient, SIcon, SNavigation } from 'servisofts-component'

export default class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (<SView onPress={() => { this.props.onPress(); }}
			style={{
				position: "absolute",
				right: 2,
				top: 2,
				width: 40,
				height: 40,
				borderRadius: 20,
				padding: 8,
				// borderWidth: STheme.color.secondary + "22",
				borderColor: STheme.color.secondary + "22",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: STheme.color.accent,
				// margin: 4,
				// ...this.props.style
			}}>
			<SIcon name={"Reload"} fill="#fff" />
		</SView >
		);
	}
}
