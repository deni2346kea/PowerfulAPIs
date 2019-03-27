
const hapi = require('hapi');
const mongoose = require('mongoose');
//const { ApolloServer, gql } = require('apollo-server-hapi');
//const schema = require('./graphql/schema');
const Painting = require('./models/Painting');




const server = hapi.server({
	port: 4001,
	host: 'localhost'
});

mongoose.connect('mongodb+srv://deni2346:1488@modernapi-9hj4j.mongodb.net/test?retryWrites=true');

mongoose.connection.once('open', () =>{
console.log('connected to DB');
});

const init = async () => {






	server.route([
		{
			method: 'GET',
			path: '/api/v1/paintings',
			config: {
				description: 'Get all the paintings',
				tags: ['api', 'v1', 'painting']
			},
			handler: (req, reply) => {
				return Painting.find();
			}
		},
		{
			method: 'POST',
			path: '/api/v1/paintings',
			config: {
				description: 'Get a specific painting by ID.',
				tags: ['api', 'v1', 'painting']
			},
			handler: (req, reply) => {
				const { name, url, technique } = req.payload;
				const painting = new Painting({
					name,
					url,
					technique
				});

				return painting.save();
			}
		}
	]);

	await server.start();
	console.log(`Server running at: ${server.info.uri}`);
};

process.on('unHandledRejection', (err) => {
	if (err) {
		console.log(err);
		process.exit(1);
	}
});

init();
