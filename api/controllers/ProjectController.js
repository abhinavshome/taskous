/**
 * ProjectController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

 module.exports = {

 	find : function(req, res) {
 		console.log('find called', req.params.id);
 		if(req.params.id){
 			Project.findOne(req.params.id).done(function(err, project){
 				if (err) res.send('DB error', 500);
 				res.json(project);
 			});
 		} else {
 			Team
 			.find({userId: req.session.user})
 			.done(function(err, teams){
 				res.json(teams);
 			});
 		}
 	},
 	create: function  (req, res) {
 		Project
 		.create(req.body)
 		.done(function (err, project) {
 			if(err) res.send('DB error', 500);
 			console.log('project created', project);
 			Team
 			.create({
 				projectId: project.id,
 				userId: req.session.user
 			})
 			.done(function (err, team) {
 				if(err) res.send('DB error', 500);
 				res.send(project);
 			});
 		})
 	}
 };
