import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'

import { deleteTodo} from '../../helpers/businessLogic/todos'


const logger = createLogger('Todos')


export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing deleteTodo event', { event })

    const todoId = event.pathParameters.todoId
    // TODO: Remove a TODO item by id

    const userId = getUserId(event)

    const response = await deleteTodo(userId, todoId)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        msg: `Todo ${response} deleted successfully!`,
      }) 
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
