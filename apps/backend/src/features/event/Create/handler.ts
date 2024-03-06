import { MyRoute } from '../../../fastify'
import prisma from '../../../utils/prisma'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const event = await prisma.event.create({
    data: {
      name: request.body.name,
      nbParticipantMax: request.body.nbParticipantMax,
      // startDate: request.body.startDate,
      // endDate: request.body.endDate,
      author: {
        connect: {
          id: identity.user,
        },
      },
    },
    select: {
      id: true,
    },
  })

  const participant = await prisma.participant.create({
    data: {
      userId: identity.user,
      eventId: event.id,
      menuId: 1,
    },
    select: {
      eventId: true,
    },
  })

  console.log('creation du participant : ', participant)

  return response.send({
    id: event.id,
  })
}
