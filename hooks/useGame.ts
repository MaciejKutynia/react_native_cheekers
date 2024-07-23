import {createArray} from "@/utils";
import {useEffect, useRef, useState} from "react";
import {Animated, Easing} from "react-native";

const useGame = ({FIELDS_NUMBER}) => {

    const rotateValue = useRef(new Animated.Value(0)).current

    const [startingColor, setStartingColor] = useState('whites')

    const [selectedCheeker, setSelectedCheeker] = useState('')


    useEffect(() => {
        Animated.timing(rotateValue, {
            toValue: startingColor === 'whites' ? 1 : 0,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
    }, [startingColor]);

    const rotateInterpolation = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const animatedStyle = {
        transform: [{rotate: rotateInterpolation}],
    };


    const rows = createArray(FIELDS_NUMBER)
    const columns = createArray(FIELDS_NUMBER)

    const whiteStartingCheekers = columns?.map(column => rows
        .map(row => (column === 1 && row % 2 == 0) || (column === 2 && row % 2 !== 0) ? `${column}_${row}` : null))
        .flat(Infinity).filter(el => Boolean(el))
    const blackStartingCheekers = columns?.map(column => rows
        .map(row => (column === FIELDS_NUMBER - 1 && row % 2 == 0) || (column === FIELDS_NUMBER && row % 2 !== 0) ? `${column}_${row}` : null))
        .flat(Infinity).filter(el => Boolean(el))

    const selectCheekerHandler = (field: string) => {
        setSelectedCheeker(field)
    }

    const selectFieldToMoveHandler = (field: string) => {
        if (!selectedCheeker) return;
        const [selectedCheekerColumn, selectedCheekerRow] = selectedCheeker?.split('_')?.map(el => Number(el))
        const [fieldColumn, fieldRow] = field?.split('_')?.map(el => Number(el))
        console.log({fieldRow, fieldColumn, selectedCheekerRow, selectedCheekerColumn})
    }


    return {
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
    };
}

export default useGame;