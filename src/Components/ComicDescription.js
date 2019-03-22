import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';

const styles = StyleSheet.create({
	container: {
		width: Dimensions.get('window').width,
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {},
	name: {
		color: 'red'
	}
});

export default class ComicDescription extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.avatar}>
					<Avatar
						rounded
						size="xlarge"
						source={{
							uri: this.props.character[0]
								? this.props.character[0].thumbnail.path +
									'.' +
									this.props.character[0].thumbnail.extension
								: ''
						}}
					/>
				</View>
				<View style={styles.name}>
					<Text>{this.props.character[0] ? this.props.character[0].name : ''}</Text>
					<Text>{this.props.character[0] ? this.props.character[0].description : ''}</Text>
				</View>
			</View>
		);
	}
}
