import { MyRoute } from '../../../fastify'
import prisma from '../../../utils/prisma'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const userDiet = await prisma.user.update({
    where: {
      id: identity.user,
    },
    data: {
      diets: {
        set: request.body.diets,
      },
    },
    select: {
      diets: true,
    },
  })

  return response.send({
    countOfDiet: userDiet.diets.length,
  })
}
