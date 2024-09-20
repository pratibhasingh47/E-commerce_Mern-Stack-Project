const User = require("../model/user");
const bcrypt = require("bcrypt");

exports.signup = async (req, res , next) => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        const isExisting = await User.findOne({ email: email });
        if (isExisting) {
            // res.status(400).send({ message: "User already exists" });
            const error = new Error("User Already Exist");
            error.name = "existingUserError";
            error.statusCode = 400;
            throw error;
        }

        // const hashedPassword = await bcrypt.hash(password , 10);

        const newUser = new User({ name: name, email: email, password: password, phoneNumber: phoneNumber });

        await newUser.save();
        res.status(201).send({ message: "Account created" });

    } catch (error) {

        next(error)
        // if (error.name === "ValidationError") {
        //     const errors = Object.values(error.errors).map(error => error.message);
        //     return res.status(400).json({ message: "Validation Error", error: errors });
        // }
        // console.log(error.name);
        // res.status(500).send(error);
    }
}


exports.login = async (req,res,next) =>{
    try {
        const { email , password} = req.body;
        const isExisting = await User.findOne( {email : email});

        if( ! isExisting){
            // return res.status(404).send({message : "User not found"});
            const error = new Error("User Not Found");
            // error.name = "UserNotFound";
            error.statusCode = 404;
            throw error;
        };

        const isMatched = await bcrypt.compare(password,isExisting.password);
        // const isMatched = password === isExisting.password;

        if(!isMatched){
            // return res.status(401).send({message : "Password not matched"})
            const error = new Error("Password not matched");
            // error.name = "UserNotFound";
            error.statusCode = 401;
            throw error;
        }

        res.status(200).send({message : "User loged-in" , data : isExisting})
    } catch (error) {
        // res.send(500).send(error);
        next(error);
    }
}