import React from 'react'
import styles from './custombutton.style'
import {View, Text, Pressable} from 'react-native'

const CustomButton = ({onPress, text, type}) => {
    return(
        <Pressable onPress={onPress} type  style={[styles.container, styles[`container_${type}`]]}>
            <Text style={[styles.text, styles[`text_${type}`]]}> {text} </Text>
        </Pressable>
    )
}

export default CustomButton