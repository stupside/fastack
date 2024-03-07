import { MyRoute } from '../../../fastify'

import { Interface } from './schema'

// c'est ici
export const Handler: MyRoute<Interface> = () => async (request, response) => {
  void request
  return await response.send()
}
