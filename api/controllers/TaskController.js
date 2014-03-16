module.exports = {
    find: function (req, res) {
        if (req.params.id) {
            Task.findOne(req.params.id).done(function (err, task) {
                if (err)
                    res.send('DB error', 500);
                res.json(task);
            });
        } else {
            Task.query(Task.getAllTasksOfThisProjectQuery(req.params.projectId), function (err, tasks) {
                if (err)
                    res.send('DB error', 500);
                res.json(tasks);
            });
        }
    },
    create: function (req, res) {
        console.log('params-', req.params);
        if (req.body.username == 'self') {
            Task.create({
                projectId: req.params.projectId,
                reporterId: req.session.user,
                desc: req.body.desc,
                assigneeId: req.session.user
            }).done(function (err, task) {
                    if (err)
                        res.send('DB error', 500);
                    console.log('task created', task);
                    return res.send(task);
                });
        } else {
            User.findByUsername(req.body.username, function (err, users) {
                if (err)
                    res.send('DB error', 500);
                console.log('user->', users);
                if (!users.length) {
                    res.send('User not found', 404);
                    return;
                }

                Task.create({
                    projectId: req.params.projectId,
                    reporterId: req.session.user,
                    desc: req.body.desc,
                    assigneeId: users[0].id
                }).done(function (err, task) {
                        if (err)
                            res.send('DB error', 500);
                        console.log('task created', task);
                        res.send(task);
                    });
            });
        }


    },
    clearDone: function (req, res, next) {
        if (req.body.idsToDelete && req.body.idsToDelete.length) {
            var idsToDelete = req.body.idsToDelete,
                query = {where: {or: []}};

            query.where.or = idsToDelete.map(function (taskId) {
                return {id: taskId};
            });


            Task
                .destroy(query)
                .done(function (err) {
                    if (err) res.send(err, 500);
                    res.send(idsToDelete);
                });

        } else {
            //next();
            res.send('No params');
        }


    }
};
