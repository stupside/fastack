import { MyRoute } from '../../../fastify'
import prisma from '../../../utils/prisma'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  let menuId: number | null
  if (request.body.menuId > 0) {
    const menu = await prisma.menu.findFirst({
      where: {
        id: request.body.menuId,
      },
      select: {
        eventId: true,
        id: true,
      },
    })

    if (!menu) {
      return response.badRequest()
    }

    menuId = menu.id
  } else {
    menuId = null
  }

  const participation = await prisma.participant.create({
    data: {
      userId: identity.user,
      eventId: request.body.eventId,
      menuId: menuId,
    },
    select: {
      eventId: true,
      menuId: true,
    },
  })

  return response.send({
    eventId: participation.eventId,
    menuId: menuId,
  })
}
