const path = require('path')
const jsonfile = require('jsonfile')
const arrayShuffle = require('array-shuffle')

const file = path.join(__dirname, 'json/') + 'colors.json'
let arr = []

const randomNumber = (min,max) =>  Math.random() * (max - min) + min

const calculate = (inc,min,max) => {
	const x = parseInt(randomNumber(min,max))
	const y = (x + inc) % max
	return [
		x,
		y
	]
}

const generate2DigitOpacity = () => {
	const opacity1 = randomNumber(0.2,0.5).toFixed(2)
	const opacity2 = randomNumber(0.6,1).toFixed(2)
	return [
		opacity1,
		opacity2
	]
}

const calcHue = () => calculate(120,0,360)

const calcSaturation = () => calculate(75,0,100)

const calcLightness = () => calculate(50,0,100)

const calcOpacity = () => generate2DigitOpacity()

const generateColor = () => {
	for (let i = 0; i < 1000; i++) {
		const [hue1, hue2] = calcHue()
		const [sat1, sat2] = calcSaturation()
		const [lig1, lig2] = calcLightness()
		const [opacity1, opacity2] = calcOpacity()
		arr.push({
			backgroundColor: `hsla(${hue1},${sat1}%,${lig1}%,${opacity1})`, 
			color: `hsla(${hue2},${sat2}%,${lig2}%,${opacity2})`
		})
	}
	arr = arrayShuffle(arr)
	console.log(JSON.stringify(arr,undefined,4));
	jsonfile.writeFile(file, arr, {spaces: 2}, function (err) {
		console.error(err)
	})
}

generateColor()