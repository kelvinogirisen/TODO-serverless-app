import { TodosAccess } from '../../helpers/dataLayer/todosAcess'
import { AttachmentAccess } from '../../helpers/filestorage/attachmentUtils';
import { TodoItem } from '../../models/TodoItem'
import { TodoUpdate } from '../../models/TodoUpdate'
import { parseUserId } from '../../auth/utils'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

import * as uuid from 'uuid'


// TODO: Implement businessLogic

const todoAccess = new TodosAccess()
const attachmentAccess = new AttachmentAccess()

export async function getTodo(todoId: string, userId: string): Promise<TodoItem> {
  return await todoAccess.getTodo(todoId, userId)
}

export async function getTodosForUser(jwtToken: string): Promise<TodoItem[]> {
  const userId = parseUserId(jwtToken)
  return await todoAccess.getTodos(userId)
}

export async function getUserIdByToken(jwtToken: string): Promise<string> {
  return parseUserId(jwtToken)
}

export async function createTodo(
  createTodoRequest: CreateTodoRequest,
  jwtToken: string
): Promise<TodoItem> {

  const userId = parseUserId(jwtToken)
  const todoId = uuid.v4()

  return await todoAccess.createTodo({
    userId: userId,
    todoId: todoId,
    createdAt: new Date().toISOString(),
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done: false,
    attachmentUrl: ''
  })
}

export async function updateTodo(
  updateTodoRequest: UpdateTodoRequest,
  userId: string, 
  todoId: string
): Promise<TodoUpdate> {
  return await todoAccess.updateTodo(userId, todoId, {
    name: updateTodoRequest.name,
    dueDate: updateTodoRequest.dueDate,
    done: updateTodoRequest.done
  })
}

export async function deleteTodo(todoId: string, userId: string) {   
    return await todoAccess.deleteTodo(todoId, userId)
}

export async function createAttachmentPresignedUrl(todoId: string): Promise<string>{
  return await attachmentAccess.createAttachmentPresignedUrl(todoId)
}

export async function updateTodoWithUrl(userId: string, todoId: string, uploadUrl: string): Promise<string>{
  return await todoAccess.updateTodoWithUrl(userId, todoId, uploadUrl)
}

