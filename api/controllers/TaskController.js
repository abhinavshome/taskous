
module.exports = {
	find: function (req, res) {
		if(req.params.id){
			Task.findOne(req.params.id).done(function (err, task) {
				if(err)	res.send('DB error', 500);
				res.json(task);
			})
		} else {
			Task.findByProjectId(req.params.projectId).done(function (err, tasks) {
				if(err) res.send('DB error', 500);
				res.json(tasks);
			})
		}
	},
	create: function (req, res) {
		Task.create({
			projectId: req.params.projectId,
			reporterId: req.session.user,
			desc: req.body.desc	
		}).done(function (err, task) {
			if(err) res.send('DB error', 500);
			console.log('task created', task);
			res.send(task);
		})

	}
};
