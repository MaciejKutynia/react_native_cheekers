import {Dimensions, SafeAreaView, StyleSheet, Animated, TouchableOpacity, View, Button} from 'react-native';

import useGame from "@/hooks/useGame";


const screenWidth = Dimensions.get('window').width - 36;

const FIELDS_NUMBER = 8;

const fieldWidth = screenWidth / FIELDS_NUMBER;
const fieldHeight = screenWidth / FIELDS_NUMBER;

export default function HomeScreen() {

    const {
        animatedStyle,
        whiteStartingCheekers,
        blackStartingCheekers,
        columns,
        rows,
        selectedCheeker,
        startingColor,
        selectCheekerHandler,
        selectFieldToMoveHandler,
        setStartingColor
    } = useGame({FIELDS_NUMBER})

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.board, animatedStyle]}>
                {columns.map((column) =>
                    rows.map(row => {
                        const lightField = (column % 2 === 0 && row % 2 === 0) || (column % 2 !== 0 && row % 2 !== 0)
                        return <TouchableOpacity
                            onPress={selectFieldToMoveHandler.bind(this, `${column}_${row}`)}
                            style={{...styles.field, backgroundColor: lightField ? '#C1C1C1' : '#4D4C4C'}}
                            key={`${column}_${row}`}>
                            {whiteStartingCheekers.includes(`${column}_${row}`) ?
                                <TouchableOpacity onPress={selectCheekerHandler.bind(this, `${column}_${row}`)}
                                                  style={{
                                                      ...styles.cheeker,
                                                      backgroundColor: 'white'
                                                  }}></TouchableOpacity> : null}
                            {blackStartingCheekers.includes(`${column}_${row}`) ?
                                <TouchableOpacity onPress={selectCheekerHandler.bind(this, `${column}_${row}`)}
                                                  style={{
                                                      ...styles.cheeker,
                                                      backgroundColor: 'black'
                                                  }}></TouchableOpacity> : null}
                        </TouchableOpacity>
                    })
                )}
            </Animated.View>
            <Button title='Zakończ' onPress={() => {
                setStartingColor(startingColor !== 'whites' ? 'whites' : 'blacks')
            }}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    cheeker: {
        width: fieldWidth - 8,
        height: fieldHeight - 8,
        borderRadius: 999,
    },
    field: {
        height: fieldHeight,
        width: fieldWidth,
        alignItems: 'center',
        justifyContent: 'center'
    },
    board: {
        borderColor: 'black',
        borderWidth: 2,
        marginHorizontal: 16,
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
});
