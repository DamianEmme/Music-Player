import React, { useState, useRef, useEffect } from "react";
import PlayList from "./PlayList";
import Controls from "./Controls";

export default function Player() {
	const [playList, setPlayList] = useState([]);

	const cargarCanciones = async () => {
		try {
			let res = await fetch(
				"https://assets.breatheco.de/apis/sound/songs"
			);
			let data = await res.json();
			setPlayList(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		cargarCanciones();
	}, []);

	const [actual, setActual] = useState(0);

	function seleccionarCancion(pos) {
		setActual(pos);
	}

	function siguiente() {
		if (actual === playList.length - 1) {
			setActual(0);
		} else {
			setActual(actual + 1);
		}
	}

	function atras() {
		if (actual === 0) {
			setActual(playList.length - 1);
		} else {
			setActual(actual - 1);
		}
	}

	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}

	const bubbleSort = arr => {
		let wall = arr.length - 1; //we start the wall at the end of the array
		while (wall > 0) {
			let index = 0;
			while (index < wall) {
				//compare the adjacent positions, if the right one is bigger, we have to swap
				if (arr[index].id > arr[index + 1].id) {
					let aux = arr[index];
					arr[index] = arr[index + 1];
					arr[index + 1] = aux;
				}
				index++;
			}
			wall--; //decrease the wall for optimization
		}
		return arr;
	};

	const [ordenado, setOrdenado] = useState(true);

	function shuffle() {
		setActual(0);
		if (ordenado) {
			shuffleArray(playList);
			setOrdenado(false);
		} else {
			bubbleSort(playList);
			setOrdenado(true);
		}
		return ordenado;
	}

	return (
		<>
			{playList.length > 0 ? (
				<>
					<PlayList
						listaCanciones={playList}
						Select={seleccionarCancion}
						actual={actual}
					/>
					<Controls
						cancionSiguiente={siguiente}
						cancionAnterior={atras}
						cancionActual={playList[actual]}
						desordenar={shuffle}
					/>
				</>
			) : (
				" "
			)}
		</>
	);
}
