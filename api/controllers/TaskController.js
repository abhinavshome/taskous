
module.exports = {
    find: function(req, res) {
        if (req.params.id) {
            Task.findOne(req.params.id).done(function(err, task) {
                if (err)
                    res.send('DB error', 500);
                res.json(task);
            })
        } else {
            Task.findByProjectId(req.params.projectId).done(function(err, tasks) {
                if (err)
                    res.send('DB error', 500);
                res.json(tasks);
            })
        }
    },
    create: function(req, res) {
        User.findByUsername(req.params.username).done(function(err, user) {
            if (err)
                res.send('DB error', 500);
            if (!user)
                res.send('User not found', 404);

            Task.create({
                projectId: req.params.projectId,
                reporterId: req.session.user,
                desc: req.body.desc,
                assigneeId: user.id
            }).done(function(err, task) {
                if (err)
                    res.send('DB error', 500);
                console.log('task created', task);
                res.send(task);
            })
        });
    }
};
