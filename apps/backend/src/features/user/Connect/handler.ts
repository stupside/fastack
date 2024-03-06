import { MyRoute, MySessionSchema } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Interface } from './schema'
import { Static } from '@sinclair/typebox'
import Hook from '../../hook'
import Event from '../../event'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const user = await prisma.user.findFirst({
    where: {
      firstname: request.body.firstname,
      lastname: request.body.lastname,
    },
    select: {
      id: true,
      password: true,
    },
  })

  if (user === null) {
    return response.unauthorized()
  }

  if (user.password === request.body.password) {
    const payload: Static<typeof MySessionSchema> = {
      user: user.id,
      claims: [
        Hook.Sse.Claim,
        Event.Create.Claim,
        Event.GetAllForConnectedUser.Claim,
        Event.Delete.Claim,
        Event.GetOne.Claim,
        Event.ChangeStatus.Claim,
      ],
    }

    const token = await response.jwtSign(payload)

    return response.send({
      id: user.id,
      token: token,
    })
  }

  return response.unauthorized()
}
