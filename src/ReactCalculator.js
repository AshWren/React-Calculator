import React, { Component } from 'react';
import { 
    StyleSheet,
    Text,
    View,
} from 'react-native';

import InputButton from './InputButton';

const inputButtons = [
    ['C', 'CE', '.', '/'],
    [7, 8, 9, '*'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'], 
    [0, '=']
]


export class ReactCalculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            previousInputValue: 0,
            inputValue: 0,
            selectedSymbol: null
        }
    }

    render() {
        return (
            <View style={styles.rootContainer}>
                <View style={styles.displayContainer}>
                    <Text style={styles.displayText}>{this.state.inputValue}</Text>
                </View>
                <View style={styles.inputContainer}>
                    {this._renderInputButtons()}
                </View>
            </View>
        )
    }


    _renderInputButtons() {
        let views = [];

        for (var r = 0; r < inputButtons.length; r++) {
            let row = inputButtons[r];

            let inputRow = [];

            for(var i=0; i<row.length; i++) {
                let input = row[i];

                inputRow.push(
                    <InputButton
                        highlight={this.state.selectedSymbol === input}
                        onPress={this._onInputButtonPressed.bind(this,input)}
                        key={r + '-' + i} 
                        value={input}/>
                );
            }

            views.push(
                <View 
                    style={styles.inputRow}
                    key = {'row-' + r}>
                    {inputRow}
                </View>
            )
        }

        return views;
    }

    _onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number': 
                return this._handleNumberInput(input)
            case 'string': 
                return this._handleStringInput(input)
        }
    }

    _handleNumberInput(num){
        let inputValue = (this.state.inputValue * 10) + num;

        this.setState({
            inputValue: inputValue
        })
    }

    _handleStringInput(str){
        switch(str) {
            case '/':
            case '*':
            case '+':
            case '-':
                this.setState({
                    selectedSymbol: str,
                    previousInputValue: this.state.inputValue,
                    inputValue: 0
                });
                break;
            case '.': 
                
                break;
            case '=': 
                let symbol = this.state.selectedSymbol,
                    inputValue = this.state.inputValue,
                    previousInputValue = this.state.previousInputValue;

                if(!symbol) {
                    return;
                }

                this.setState({
                    previousInputValue: 0,
                    inputValue: eval(previousInputValue + symbol + inputValue),
                    selectedSymbol: null
                });
                break;
            case 'C':
                this.setState({
                    inputValue: 0
                });
                break;
            case 'CE': 
                this.setState({
                    inputValue: 0,
                    previousInputValue: 0,
                    selectedSymbol: null,
                }); 
                break;
        }
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    }, 
    displayContainer: {
        flex: 2,
        backgroundColor: '#003c8f', 
        justifyContent: 'center',
    },
    displayText: {
        color: '#fff',
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: 20
    },
    inputContainer: {
        flex: 8,
        backgroundColor: '#1565c0',
    },
    inputRow: {
        flex: 1, 
        flexDirection: 'row',
    }, 

});