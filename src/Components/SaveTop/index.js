import React from 'react';
import { Animated } from 'react-native';
import { SView, SImage, SNavigation, STheme, SIcon, SText, SScrollView2, SThread } from 'servisofts-component';
import { connect } from 'react-redux';
import DataBaseContainer from '../../DataBase/DataBaseContainer';
import DataBase from '../../DataBase';

class index extends React.Component {


	constructor(props) {
		super(props);
		this.state = {

		};

	}


	render() {

		return (
			<>
				<SView style={{
					position: "absolute",
					width: 25,
					height: 25,
					right: 70,
					backgroundColor: STheme.color.card,
					borderBottomLeftRadius: 5,
					borderBottomRightRadius: 5,
				}}
					activeOpacity={1}
					onPress={() => {
						DataBase.Funciones.saveAllChanges();
						// DataBaseContainer.sync();
					}} center>
					<SIcon name={"Isave"} fill={STheme.color.primary} height={17} width={17} />
				</SView>

			</>
		);
	}
}

const initStates = (state) => {
	return { state }
};
export default connect(initStates)(index);