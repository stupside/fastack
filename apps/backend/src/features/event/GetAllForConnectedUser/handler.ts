import { MyRoute } from '../../../fastify'
import prisma from '../../../utils/prisma'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const event = await prisma.event.findMany({
    where: {
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

  return response.send({
    events: event,
  })
}
