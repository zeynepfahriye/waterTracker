import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { radioButtonStyle } from '../styles/radioButtonStyle';
import {radioButtonProps} from '../types/types'

const RadioButton = (props: radioButtonProps) => {
	const options = useMemo(() => [
      { label: 'Günlük', id: 1 },
      { label: 'Haftalık', id: 2 },
      { label: 'Aylık', id: 3 }

   ], [])
	return (
		<View style={{ flexDirection: "row" ,justifyContent:'space-between',padding:20}} >
			{
				options.map((option, key) => (
					<TouchableOpacity
						disabled={props.disabled}
						key={key}
						style={([radioButtonStyle.container, props.style, !props.vertical && { paddingHorizontal: 2 }])}
						onPress={() => props.onChange({key: option.id, value: option.label})}
					>
						<Text style={[radioButtonStyle.label, props.disabled && { color: 'gray' }]}>{option.label}</Text>
						<View style={[radioButtonStyle.radio, { borderColor: props.color ?? 'blue' }]}>
							{
								props.selected.key === option.id ?
									(<View style={[radioButtonStyle.selectedRadio, { backgroundColor: props.color ?? 'blue' }]} />)
									: null
							}
						</View>
					</TouchableOpacity>
				))}
		</View>
	);
};

export default RadioButton;
