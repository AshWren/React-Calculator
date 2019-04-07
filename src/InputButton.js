import React, { Component } from 'react';
import {
    StyleSheet,
    Text, 
    TouchableHighlight,
} from 'react-native';

export default class InputButton extends Component {
    render () {
        return (
            <TouchableHighlight
                style={[styles.inputButton,
                this.props.highlight ? styles.inputButtonHighlighted : null]}
                underlayColor='#5e92f3'
                onPress={this.props.onPress}
                >
                <Text style={styles.inputButtonText}>
                    {this.props.value}
                </Text>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    inputButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#5e92f3'
    }, 
    inputButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
    inputButtonHighlighted: {
        backgroundColor: '#003c8f'
    },
});