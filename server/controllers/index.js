import { AuthController } from "./auth.js";
import { UserController } from "./users.js";
import services from "../services/index.js"

const authController = new AuthController(services.userServices, services.tokenServices);
const userController = new UserController(services.userServices, services.tokenServices);


export default {
    userController,
    authController  
};