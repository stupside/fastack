import { createCookieSessionStorage, type Session } from '@remix-run/node'

import { type MySessionData } from './types/MySessionData'
import { type MySessionFlashData } from './types/MySessionFlashData'

const storage = createCookieSessionStorage<MySessionData, MySessionFlashData>({
  cookie: {
    name: '__fastack',
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
    secrets: [process.env.MY_STORAGE_SECRET],
  },
})

type MySession = Session<MySessionData, MySessionFlashData>

const fromCookies = async <TResult>(
  request: Request,
  callback: (session: MySession) => Promise<TResult>,
): Promise<TResult> => {
  const session = await storage.getSession(request.headers.get('Cookie'))

  return callback(session)
}

const requireValue = <TKey extends keyof MySessionData>(
  session: MySession,
  key: TKey,
) => {
  const value = session.get(key)

  if (value === undefined) {
    session.flash('error', `Could not resolve ${key} value from session.`)

    throw new Error(`Could not resolve ${key}`)
  }

  return value
}

const hasValue = <TKey extends keyof MySessionData>(
  session: MySession,
  key: TKey,
): boolean => {
  return session.has(key)
}

export default Object.assign(storage, {
  hasValue,
  fromCookies,
  requireValue,
})
