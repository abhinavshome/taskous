/**
 * api/models/User.js
 *
 * The user model contains the instance method for validating the password.
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {
    attributes : {
        username : {
            type : 'STRING',
            required : true,
            unique : true
        },
        password : {
            type : 'STRING',
            required : true,
            minLength : 6
        },
        email : {
            type : 'email',
            required : true,
            unique : true
        },
        // Override toJSON instance method to remove password value
        toJSON : function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
        // validPassword: function(password, callback) {
        // var obj = this.toObject();
        // if (callback) {
        // //callback (err, res)
        // return bcrypt.compare(password, obj.password, callback);
        // }
        // return bcrypt.compareSync(password, obj.password);
        // }
    },
    // Lifecycle Callbacks
    beforeCreate : function(attrs, next) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err)
                return next(err);

            bcrypt.hash(attrs.password, salt, function(){}, function(err, hash) {
                if (err)
                    return next(err);

                attrs.password = hash;
                next();
            });
        });
    },

    getAllProjectsSQLQuery: function (userId) {
        return "SELECT 'project'.* FROM 'project' JOIN 'team' ON 'project'.'id' = 'team'.'projectId' where 'team'.'userId'=" + userId;
    }
}; 