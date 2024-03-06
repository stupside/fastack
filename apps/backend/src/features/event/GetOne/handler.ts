import { MyRoute } from '../../../fastify'
import { Interface } from './schema'
import prisma from '../../../utils/prisma'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  const params = request.params

  if (identity === undefined) throw new Error('Unauthorized')

  const wishEvent = await prisma.event.findUnique({
    where: {
      id: parseInt(params.eventId),
      OR: [
        {
          userId: identity.user,
        },
        {
          participants: {
            some: {
              userId: identity.user,
            },
          },
        },
      ],
    },
  })

  if (!wishEvent) {
    // If the event is not found, return a 404 Not Found response
    response.badRequest()
  } else {
    // If the event is found, return it in the response
    return response.send({
      //participants: wishEvent.participants,
      id: wishEvent.id,
      name: wishEvent.name,
      nbParticipantMax: wishEvent.nbParticipantMax,
      userId: wishEvent.userId,
    })
  }
}
