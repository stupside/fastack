import { type LoaderFunctionArgs, redirect } from '@remix-run/node'

import storage from '~/server/storage/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await storage.extractSession(request)

  return redirect('/', {
    headers: {
      'Set-Cookie': await storage.destroySession(session.state),
    },
  })
}
