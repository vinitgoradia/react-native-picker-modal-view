// Global Imports
import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

// Local Imports
import { ISelectBoxProps } from '@Interfaces';
import { SelectBoxStyle } from '@Styles';

export class SelectBoxComponent extends React.PureComponent<ISelectBoxProps, {}> {
	public render(): JSX.Element {
		const { openModal, selectedObject, chooseText, disabled, renderSelectView, items, isSource, isDestination } = this.props;
		const selectViewIsDisabled = (disabled || !items || items.length === 0);
		if (renderSelectView) {
			return (renderSelectView(selectViewIsDisabled, selectedObject, openModal.bind(this)))
		} else if (isSource || isDestination) {
            return (React.createElement(TouchableOpacity, { activeOpacity: 0.7, onPress: () => openModal(), style: [SelectBoxStyle.pressBtn, selectViewIsDisabled && SelectBoxStyle.disabledBtn, { flex: 1 }] },
                React.createElement(View, { style: [styles.selectBoxContainerStyle]},
                    React.createElement(View, { style: [ isSource ? styles.sourceBulletStyle : styles.destinationBulletStyle]}),
                        React.createElement(Text, { style: [selectViewIsDisabled ? SelectBoxStyle.disabledTxt : SelectBoxStyle.chooseText] }, (selectedObject && selectedObject.Name) ? selectedObject.Name : chooseText),
                )));
        } else {
			return (
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => openModal()}
					style={[SelectBoxStyle.pressBtn, selectViewIsDisabled && SelectBoxStyle.disabledBtn]}
				>
					<View style={SelectBoxStyle.container}>
						<Text style={[selectViewIsDisabled ? SelectBoxStyle.disabledTxt : SelectBoxStyle.chooseText]}>{
							(selectedObject && selectedObject.Name) ? selectedObject.Name : chooseText
						}</Text>
						<Image source={require('../Assets/Images/down.png')}
							style={[SelectBoxStyle.downBtn, selectViewIsDisabled && SelectBoxStyle.disabledImage]}
						/>
					</View>
				</TouchableOpacity>
				);
			}
	}
}

const colors = {
    clr_primary: '#D90429',
    clr_white: '#FFFFFF',
};

const styles = {
    selectBoxContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.clr_white,
        height: 40,
        paddingBottom: 12,
        padding: 15,
    },
    sourceBulletStyle: {
        width: 8,
        height: 8,
        backgroundColor: colors.clr_primary,
        borderWidth: 1,
        borderColor: colors.clr_primary,
        marginRight: 20,
        borderRadius: 4
    },
    destinationBulletStyle: {
        width: 8,
        height: 8,
        backgroundColor: colors.clr_white,
        borderWidth: 1,
        borderColor: colors.clr_primary,
        marginRight: 20,
        borderRadius: 4
    }
}