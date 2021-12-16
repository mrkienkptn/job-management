const { Task } = require('../models')

const createTask = async (data) => {
  const newTask = new Task(data)
  return await newTask.save()
}

const updateTask = async (data) => {
  
}

const getTask = async (id) => {
  const task = await Task.findById(id)
  return task
}

module.exports = {
  createTask,
  updateTask,
  getTask
}