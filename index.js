import express from 'express';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
import path from 'path';
const __dirname = path.resolve();
import { Market } from './Models/market.js';

mongoose.connect('mongodb://localhost:27017/MarketValue', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		console.log('MarketValue Database Connected Successfully');
	})
	.catch((err) => {
		console.log('Error in connecting to the Database');
		console.log(err);
	})

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(async(req,res,next) => {
	const result = await fetch('https://api.wazirx.com/api/v2/tickers');
	const data = await result.json();
	await Market.deleteMany({});
	let count = 1
	for (let marketData in data) {
		if (count > 10) {
			break;
		}
		//Storing data into the database
		const finalData = new Market({
			sno: count,
			name: data[marketData].name,
			last: +data[marketData].last,
			buy: +data[marketData].buy,
			sell: +data[marketData].sell,
			volume: +data[marketData].volume,
			base_unit: data[marketData].base_unit
		})
		await finalData.save();
		count++;
	}
	next();
})

app.get('/', async(req, res) => {
	//Fetching the stored data from database and rendering to Frontend
	const get_data = await Market.find({});
	let passName;
	res.render('home', { get_data, passName });
})

app.get('/:name', async(req,res) => {
	const get_data = await Market.find({});
	const { name } = req.params;
	const passName = name.slice(0,name.indexOf('-'));
	res.render('home', { get_data , passName });
})

app.listen(3000, () => {
	console.log('Listening to Port 3000');
})