const Task = require('../models/task.model')

const createTask = async (data) => {
  const newTask = Task(data)
  return await newTask.save()
}

const updateTask = async (data) => {
  
}

module.exports = {
  createTask
}