import bcrypt from "bcryptjs";
import {generateBaererToken, generateRefreshToken, payloadToken, validareToken} from "../helpers/authHelper.js";

class AuthController {
    constructor(userService, tokenService) {
        this.userService = userService,
        this.tokenService = tokenService
    }

    async signup(req, res){
        const { id, password } = req.body;
        const candidate = await this.userService.findOne(id);

        if(candidate){
            res.status(409).json({
                message: "This login is already taken. Try another one."
            })
        } else {
            try {
                const id_type = type(id);

                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(password, salt);

                const user = await this.tokenService.signup( id, hashPassword, id_type );
                const token = generateBaererToken(user._id);

                const refreshToken = generateRefreshToken(user._id);
                await this.tokenService.saveRefreshToken(user._id, refreshToken);
                return res.status(201)
                .cookie('refreshToken', refreshToken, {maxAge: 30 * 60 * 1000, httpOnly: true})
                .json({Bearer: `Bearer ${token}`});
            } catch (err) {
                console.log(err);
                res.status(500)
            }
        }
        
        function type(value) {
            if(/^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.exec(value)){
                return "phone"
            }else if(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.exec(value)){
                return "email"
            } else res.status(409).json({
                message: "Invalid email or number."
            })
        }
    };

    async signin(req, res){
        const { id, password } = req.body;
        const candidate = await this.userService.findOne(id);
        try {
            if(candidate){
                const passwordResult = bcrypt.compareSync(password, candidate.password);
    
                if (passwordResult) {
                    const token = generateBaererToken(candidate._id);
    
                    const refreshToken = generateRefreshToken(candidate._id);
                    await this.tokenService.saveRefreshToken(candidate._id, refreshToken);
    
                    return res.status(200)
                    .cookie('refreshToken', refreshToken, {maxAge: 30 * 60 * 1000, httpOnly: true})
                    .json({Bearer: `Bearer ${token}`});
                    
                } else {
                    res.status(401).json({
                        message: "Invalid password."
                    });
                };
            } else {
                res.status(404).json({
                    message: "User not found."
                })
            };
        } catch (err) {
            console.log(err);
        }
        
    };

    async logout(req, res){
        const token = req.headers.authorization.split(' ')[1];
        const {refreshToken} = req.cookies;
        const {all = "false"} = req.query;
        const decode = payloadToken(token);
        console.log(all);

        try {
            if (all == "true") {
                console.log(all);
                await this.tokenService.logoutMany(decode.id);
                res.clearCookie("refreshToken")
                .status(200)
                .json({massage: "OK"});
            } else if(all == "false"){
                console.log(all);
                await this.tokenService.logoutOne(refreshToken);
                res.clearCookie("refreshToken")
                .status(200)
                .json({massage: "OK"});
            };
        } catch (err) {
            console.log(err);
            res.json(err)
        };
    };

    async refreshTokens(req, res){
        try {
            const token = req.headers.authorization.split(' ')[1];
            const {refreshToken} = req.cookies;
            const userData = validareToken(token);
            const tokenFromDb = await this.tokenService.findOneRefreshToken(refreshToken);
            if (tokenFromDb) {
                const newToken = generateBaererToken(userData.id);
                const newRefreshToken = generateRefreshToken();
                await this.tokenService.saveRefreshToken(userData.id, newRefreshToken);
                return res.status(200).
                clearCookie("refreshToken")
                .cookie('refreshToken', newRefreshToken, {maxAge: 30 * 60 * 1000, httpOnly: true})
                .json({Bearer: `Bearer ${newToken}`});
            };
        } catch (err) {
            console.log(err);
        }
    }
};

export { AuthController };