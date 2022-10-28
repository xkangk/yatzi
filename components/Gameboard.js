import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../styles/styles";
import { ScrollView } from "react-native";
import { useFonts } from "expo-font";

const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const NBR_OF_POINTS = 6;
const BONUS = 63;
let bonusCheck = true;
let selected = new Array(6).fill(0);
let board = [];
let rounds = 6;

export default function Gameboard () {
  const counted = [];
  const row = [];

  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState("");
  const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
  const [selectedPoints, setSelectedPoints] = useState(new Array(6).fill(false));
  const [disable, setDisable] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [total, setTotal] = useState(0);
  const [bonari, setBonus] = useState(BONUS);

  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable
        disabled={disable ? true : false}
        key={"row" + i}
        onPress={() => selectDice(i)}>
        <MaterialCommunityIcons
          name={board[i]}
          key={"row" + i}
          size={50}
          color={getDiceColor(i)} />
      </Pressable>
    )
  }

  for (let i = 0; i < NBR_OF_POINTS; i++) {
    counted.push(
      <Pressable
        disabled={disable ? true : false}
        key={"counted" + i}
        onPress={() => selectPoint(i)}>
        <Text style={[styles.gameinfo, { fontFamily: "Inconsolata-Variable" }]}>{selected[i]}</Text>
        <MaterialCommunityIcons
          name={"numeric-" + (i + 1) + "-circle"}
          key={"counted" + i}
          size={30}
          color={getPointsColor(i)} />
      </Pressable>
    )
  }

  function getDiceColor (i) {
    return selectedDices[i] ? "black" : "#767D67";
  }

  function getPointsColor (i) {
    return selectedPoints[i] ? "black" : "#767D67";
  }

  function selectDice (i) {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }

  const selectPoint = i => {
    let points = [...selectedPoints];

    if (nbrOfThrowsLeft > 0) {
      setStatus("Throw 3 times before setting points");
      setDisable(true);
    } else if (points[i] === true) {
      setStatus("You have already selected points for " + (i + 1));
      return
    }
    points[i] = true;
    rounds = rounds - 1;
    setSelectedPoints(points);
    countSpots(i);
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setNbrOfThrowsLeft(NBR_OF_THROWS);
  }

  function throwDices () {
    setDisable(false);
    if (NBR_OF_THROWS == 0) {
      return;
    } else if (BONUS <= total && bonusCheck == true) {
      setTotal(total);
      bonusCheck = false;
    }
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let rnd = Math.floor(Math.random() * 6 + 1);
        board[i] = "dice-" + rnd;
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
  }

  function countSpots (value) {
    let sum = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i].endsWith(value + 1)) {
        sum += value + 1;
      }
    }
    selected[value] = sum;
    setTotal(total + sum)
  }

  
  function bonus () {
    if (total < BONUS) {
      return "You are " + (BONUS - total) + " points away from bonus.";
    } else {
      return "A Congratulations it's a celebration, I just wanna tell you that I think you got the bonus !";
    }
  }

  useEffect(() => {
    if (nbrOfThrowsLeft === 3) {
      setStatus("Game has not started");
    }

    if (nbrOfThrowsLeft === 3) {
      setStatus("You have to throw dices first");
      setDisable(true);
      setButtonDisable(false);
    }
    if (nbrOfThrowsLeft < NBR_OF_THROWS) {
      setStatus("Throw dices");
    }

    if (nbrOfThrowsLeft <= 0) {
      setNbrOfThrowsLeft(0);
      setDisable(false);
      setButtonDisable(true);
      setStatus("Select your points.");
    }
    if (rounds === 0 && nbrOfThrowsLeft === 0) {
      setStatus("Game Over! All points are selected.");
    }
    if (selectedPoints.every(value => value === true)) {
      setStatus(
        "Game Over! All points are selected. Please push Restart game to play again"
      );
      setButtonDisable(true)
    }
  }, [nbrOfThrowsLeft])

  function restart () {
    setNbrOfThrowsLeft(NBR_OF_THROWS)
    setButtonDisable(false)
    setTotal(0)
    setBonus(BONUS)
    board = []
    setSelectedPoints(new Array(6).fill(false))
    setSelectedDices(new Array(NBR_OF_DICES).fill(false))
  }

  const [fontsLoaded] = useFonts({
    TitilliumWeb: require("../assets/fonts/TitilliumWeb-Regular.ttf"),
    "Inconsolata-Variable": require("../assets/fonts/Inconsolata-VariableFont.ttf")
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <ScrollView>
      <View style={styles.gameboard}>
        <View style={styles.flex}>
          <Text>{row}</Text>
        </View>
        <View style={[styles.gameinfo]}>
          <Text style={[styles.gameinfo, { fontFamily: "TitilliumWeb" }]}>
            Throws left: {nbrOfThrowsLeft}
          </Text>
          <Text style={[styles.gameinfo, { fontFamily: "TitilliumWeb" }]}>
            {status}
          </Text>
        </View>
        <View>
          <Pressable
            style={styles.button}
            onPress={() => throwDices()}
            disabled={buttonDisable ? true : false}>
            <Text style={[styles.buttonText, { fontFamily: "Inconsolata-Variable" }]}>
              Throw dices
            </Text>
          </Pressable>
          <Text style={[styles.total, { fontFamily: "TitilliumWeb" }]}>
            Total of points: {total}
          </Text>
          <Text style={[styles.gameinfo, { fontFamily: "TitilliumWeb" }]}>
            {bonus()}
          </Text>
          <View style={[styles.flex, { fontFamily: "Inconsolata-Variable" }]}>
            {counted}
          </View>
        </View>
        <Pressable style={styles.button} onPress={() => restart()}>
          <Text style={[styles.buttonText, { fontFamily: "Inconsolata-Variable" }]}>
            Restart Game
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
