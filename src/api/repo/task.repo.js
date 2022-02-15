const { Task, Process } = require('../models')

const createTask = async (data) => {
  const newTask = new Task(data)
  return await newTask.save()
}

const updateTask = async (id, data) => {
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    data,
    { new: true }
  ).populate([
    {
      path: 'assignees',
      select: 'name email _id'
    },
    {
      path: 'followers',
      select: 'name email _id'
    },
    {
      path: 'tags',
      select: 'name _id'
    }
  ])
  return updatedTask
}

const addAssignee = async (taskId, assigneeId) => {
  const rs = await Task.findByIdAndUpdate(
    taskId,
    {
      $addToSet: { assignees: assigneeId }
    },
    { new: true }
  )
    .populate([
      {
        path: 'assignees',
        select: 'name email _id'
      },
      {
        path: 'followers',
        select: 'name email _id'
      },
      {
        path: 'tags',
        select: 'name _id'
      }
    ])
  return rs
}

const removeAssignee = async (taskId, assigneeId) => {
  const rs = await Task.findByIdAndUpdate(
    taskId,
    {
      $pull: { assignees: assigneeId }
    },
    { new: true }
  )
    .populate([
      {
        path: 'assignees',
        select: 'name email _id'
      },
      {
        path: 'followers',
        select: 'name email _id'
      },
      {
        path: 'tags',
        select: 'name _id'
      }
    ])
  return rs
}

const addFollower = async (taskId, followerId) => {
  const rs = await Task.findByIdAndUpdate(
    taskId,
    {
      $addToSet: { followers: followerId }
    },
    { new: true }
  )
    .populate([
      {
        path: 'assignees',
        select: 'name email _id'
      },
      {
        path: 'followers',
        select: 'name email _id'
      },
      {
        path: 'tags',
        select: 'name _id'
      }
    ])
  return rs
}

const removeFollower = async (taskId, followerId) => {
  const rs = await Task.findByIdAndUpdate(
    taskId,
    {
      $pull: { followers: followerId }
    },
    { new: true }
  )
    .populate([
      {
        path: 'assignees',
        select: 'name email _id'
      },
      {
        path: 'followers',
        select: 'name email _id'
      },
      {
        path: 'tags',
        select: 'name _id'
      }
    ])
  return rs
}

const getTask = async (id) => {
  const task = await Task.findById(id)
    .populate([
      {
        path: 'assignees',
        select: 'name email _id'
      },
      {
        path: 'followers',
        select: 'name email _id'
      },
      {
        path: 'tags',
        select: 'name _id'
      }
    ])
  return task
}

const deleteTask = async (processId, taskId) => {
  const deleteInProcess = Process.findByIdAndUpdate(
    processId,
    {
      $pull: { tasks: [taskId] }
    },
    { new: true }
  )
  const deleteTask = Task.findByIdAndRemove(taskId)
  const [updatedProcess, deleteOk] = await Promise.all([
    deleteInProcess,
    deleteTask
  ])
  return { updatedProcess, deleteOk }
}

module.exports = {
  createTask,
  updateTask,
  getTask,
  addAssignee,
  removeAssignee,
  addFollower,
  removeFollower,
  deleteTask
}
