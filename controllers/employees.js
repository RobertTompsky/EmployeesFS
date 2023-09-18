const {prisma} = require("../prisma/prisma-client.js")


const all = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany()
        res.status(200).json(employees)
    } catch {
        res.status(500).json({
            message: "Не удалось получить сотрудников"
        })
    }
}

const add = async (req, res) => {
    try {
        const data = req.body
        if (!data.firstName || !data.lastName ||!data.adress || !data.age) {
            console.log(data)
            return res.status(400).json({
                message: 'Все поля обязательны'
            })
        }
        const employee = await prisma.employee.create({
            data: {
                ...data,
                userId: req.user.id
            }
        })
        return res.status(201).json(employee)
    } catch {
        return res.status(500).json({
            message: 'Что-то пошло не так'
        })
    }
}

const remove = async (req, res) => {
    const {id} = req.body
    try {
        await prisma.employee.delete({
            where: {
                id
            }
        })
        res.status(204).json("Сотрудник удален")
    } catch {
        return res.status(500).json({
            message: 'Не удалось удалить сотрудника'
        })
    }
}

const edit = async (req, res) => {
    const data = req.body
    const id = data.id
    try {
        await prisma.employee.update({
            where: {
                id
            },
            data: data
        })
        res.status(204).json("Сотрудник обновлен")
    } catch {
        return res.status(500).json({
            message: 'Не удалось обновить сотрудника'
        })
    }
}

const findEmployee = async (req, res) => {
    const { id } = req.params
    try {
        const employee = await prisma.employee.findUnique({
            where: {
                id: id
            }
        })
        res.status(200).json(employee)
    } catch {
        return res.status(500).json({
            message: 'Не удалось получить сотрудника'
        })
    }
}


module.exports = {
    all,
    add,
    remove,
    edit,
    findEmployee
}