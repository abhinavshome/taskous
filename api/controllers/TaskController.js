
module.exports = {
    find: function(req, res) {
        if (req.params.id) {
            Task.findOne(req.params.id).done(function(err, task) {
                if (err)
                    res.send('DB error', 500);
                res.json(task);
            });
        } else {
            Task.query(Task.getAllTasksOfThisProjectQuery(req.params.projectId),function(err, tasks) {
                if (err)
                    res.send('DB error', 500);
                res.json(tasks);
            });
        }
    },
    create: function(req, res) {
        console.log(req.params);
        User.findByUsername(req.body.username, function(err, users) {
            if (err)
                res.send('DB error', 500);
            console.log('user', users);
            if (!users.length)
                res.send('User not found', 404);

            Task.create({
                projectId: req.params.projectId,
                reporterId: req.session.user,
                desc: req.body.desc,
                assigneeId: users[0].id
            }).done(function(err, task) {
                if (err)
                    res.send('DB error', 500);
                console.log('task created', task);
                res.send(task);
            })
        });
    }
};
