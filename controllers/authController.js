const User = require('../models/User');

const register = async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
};

const login = async (req, res) => {
    if (req.body.email && req.body.password) {
        try {
            let user = await User.findOne({ email: req.body.email, password: req.body.password }).select('-password');
            if (user) {
                res.send(user);
            } else {
                res.status(404).send({ result: 'User not found' });
            }
        } catch (error) {
            res.status(500).send({ result: 'Error during login' });
        }
    } else {
        res.status(400).send({ result: 'Please provide email and password' });
    }
};

module.exports = { register, login };
