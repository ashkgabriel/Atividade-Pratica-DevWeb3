var User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.getUser = async function (req, res) {
    try {
        const result = await User.find();
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.create = function (req, res) {
    let user = new User(
        {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            senha: req.body.senha
        }
    );
    user.save()
        .then(res.status(201).send(user.toJSON()))
        .catch((err) => {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar usuário.` })
        })
};

exports.details = async function (req, res) {
    try {
        const result = await User.findById(req.params.id);
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.delete = async function (req, res) {
    try {
        const result = await User.findByIdAndDelete(req.params.id)
        if (!result) {
            return res.stats(404).send({ message: 'Usuário não encontrado.' })
        }
        res.status(200).json({ message: 'Usuário excluído com sucesso' })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.update = async function (req, res) {
    try {
        const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!result) {
            return res.stats(404).send({ message: 'Usuário não encontrado.' })
        }
        res.status(200).json({ message: 'Usuário atualizado com sucesso' })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.userToken = async function (req, res) {
    try {
        const email = 'gabriel.ashikaga@fatec.sp.gov.br'
        const senha = '123Teste'

        const hashedPassword = await bcrypt.hash(senha, 10)
        const newUser = new User({ 
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            senha: hashedPassword
         })
        await newUser.save()
        res.json({ message: 'Usuário validado com sucesso.', email, senha })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Erro do servidor.')
    }

}

exports.validaLogin = async function (req, res) {
    const { name, age, email, senha } = req.body;

    try {

        const existingUser = await User.findOne({ email });


        if (existingUser) {
            return res.status(400).json({ message: 'Já existe um usuário com este nome.' });
        }


        const hashedPassword = await bcrypt.hash(senha, 10);


        const newUser = new User({ name, age, email, senha: hashedPassword });
        await newUser.save();

        const jwtSecret = '123Teste';

        const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1h' });


        res.status(201).json({ token });
    } catch (err) {

        res.status(500).json({ message: `${err.message} - falha ao registrar e autenticar usuário.` });
    }
}
