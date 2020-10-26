import { Request, Response } from 'express'

import { Controller } from '../../presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response): Promise<void> => {
    const { body, statusCode } = await controller.handle({ body: request.body })

    if (statusCode === 500) {
      response.status(statusCode).json({
        ...body,
        error: body.message,
        stack: body.stack
      })
    } else {
      response.status(statusCode).json(body)
    }
  }
}
