import { MyRoute, MySessionSchema } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Interface } from './schema'
import { Static } from '@sinclair/typebox'
import Hook from '../../hook'
import Event from '../../event'
import Participant from '../../participant'
import User from '../index'

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
        Event.Delete.Claim,
        Event.GetOne.Claim,
        Event.ChangeStatus.Claim,
        Participant.ChooseMenu.Claim,
        Participant.Leave.Claim,
        Participant.Join.Claim,
        User.LinkDiet.Claim,
        User.GetAllDiet.Claim,
        User.UnlinkDiet.Claim,
        Event.GetHosting.Claim,
        Event.GetAttending.Claim,
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
