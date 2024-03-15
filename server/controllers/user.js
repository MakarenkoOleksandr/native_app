const nodemailer = require("nodemailer");
const { Web3 } = require("web3");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const secret = JWT_SECRET.JWT_SECRET;

require("dotenv").config();

const MAIL = process.env.MAIL;
const MAIL_PASS = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: MAIL,
    pass: MAIL_PASS,
  },
});

class UserController {
  async create(req, res) {
    const { email, password } = req.body;

    const confirmationCode = uuidv4();
    const token = jwt.sign({ email }, secret);

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.send({ ok: false, data: `Username ${email} already exists` });
      } else {
        await User.create({
          token,
          email,
          password,
          confirmationCode,
          confirmed: false,
          loggined: false,
          metamask: "",
        });
        res.send({ ok: true, data: `User ${email} successfully registered` });
      }
    } catch (error) {
      res.status(500).send({ ok: false, error });
      console.log(error);
    }
  }

  async checkUser(req, res) {
    const { email } = req.query;

    try {
      const user = await User.findOne({ email });

      if (user) {
        res.send({
          ok: true,
          data: user,
        });
      } else {
        res.send({
          ok: false,
          data: user,
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(error);
    }
  }

  async checkEmail(req, res) {
    const { email } = req.body;
    const includeVar = email.includes("@");

    try {
      const user = await User.findOne({ email });

      if (!user && includeVar) {
        res.send({ ok: true, data: "Username is available" });
      } else if (user && includeVar) {
        res.send({ ok: false, data: "Username already exists" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(error);
    }
  }

  async checkPass(req, res) {
    const { password, confirmPassword } = req.body;

    try {
      const match = password === confirmPassword;
      const length = password.length > 5;

      if (match && length) {
        res.send({ ok: true, data: "Now you can Submit" });
      } else if (!match && length) {
        res.send({ ok: false, data: "Passwords must match" });
      } else {
        res.send({
          ok: false,
          data: "Passwords must match and have more that 5 symbols",
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(error);
    }
  }

  async confirmUser(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).send({ ok: false, error: "User not found" });
      }

      const mailOptions = {
        from: MAIL,
        to: email,
        subject: "Confirmation Code",
        text: `Your confirmation code is: 
        ${user.confirmationCode}`,
      };

      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      res.status(500).json({ error: "Error sending email" });
      console.log(error);
    }

    res
      .status(200)
      .send({ ok: true, data: "Confirmation code sent successfully" });
  }

  async update(req, res) {
    const { token, update, status } = req.query;

    try {
      const user = await User.findOne({ token });
      if (user) {
        await User.updateOne({ token }, { [update]: status });
        res.send({ ok: true, data: "User updated successfully" });
      } else {
        res.status(404).json({ ok: false, data: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error during update" });
      console.log(error);
    }
  }

  async add(req, res) {
    const { token, param, value } = req.body;
    try {
      const user = await User.findOne({ token });
      const checkNetworkName = user.network.find((network) => {
        return network.name.toLowerCase() === value.name.toLowerCase();
      });

      if (user) {
        if (param === "network") {
          if (!checkNetworkName) {
            await User.updateOne({ token }, { $push: { [param]: value } });
            res.send({
              ok: true,
              data: `Network ${value.name} has added successfully`,
            });
          } else {
            res.send({
              ok: false,
              data: `Network ${value.name} alredy exists`,
            });
          }
        } else {
          await User.updateOne({ email }, { [param]: value });
          res.send({ ok: true, data: `${param} has added successfully` });
        }
      }
    } catch (error) {
      res.status(500).json({ error: "Error during adding param" });
      console.log(error);
    }
  }

  async getUser(req, res) {
    const { email } = req.query;

    try {
      const user = await User.findOne({ email });

      if (user) {
        res.send({
          ok: true,
          data: user,
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Error during request user" });
      console.log(error);
    }
  }

  async getUserByToken(req, res) {
    const { token } = req.query;
    try {
      const user = await User.findOne({ token });
      if (user) {
        res.send({
          ok: true,
          data: user,
        });
      } else {
        res.send({ ok: false });
      }
    } catch (error) {
      res.status(500).json({ error: "Error during request user" });
      console.log(error);
    }
  }

  async checkBalance(req, res) {
    const { network, wallet } = req.query;

    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(network));
      const checkBalance = await web3.eth.getBalance(wallet);
      const nativeBalance = web3.utils.fromWei(checkBalance, "ether");
      const balance = parseFloat(nativeBalance).toFixed(4);

      if (balance) {
        res.send({
          ok: true,
          data: balance,
        });
      } else {
        res.send({
          ok: false,
          data: "Can`t get balance",
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Error during request balance" });
      console.log(error);
    }
  }
}

module.exports = new UserController();
