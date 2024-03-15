const router = require("express").Router();
const userController = require("../controllers/user");

router.post("/create", userController.create);
router.post("/checkEmail", userController.checkEmail);
router.post("/checkPass", userController.checkPass);
router.post("/checkUser", userController.checkUser);
router.post("/confirmUser", userController.confirmUser);
router.post("/update", userController.update);
router.post("/add", userController.add);
router.get("/getUser", userController.getUser);
router.get("/getUserByToken", userController.getUserByToken);
router.get("/checkBalance", userController.checkBalance);

module.exports = router;
