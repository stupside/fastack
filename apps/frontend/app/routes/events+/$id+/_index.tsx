import { useState, type FC, useEffect, useMemo } from 'react'

import { Form, useLoaderData } from '@remix-run/react'

import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'

import storage from '~/server/storage/session.server'
import Submit from '~/client/components/commons/forms/Submit'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Event',
    },
  ]
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  if (params.id === undefined) throw new Error()

  const session = await storage.extractSession(request)

  void session // TODO: get event

  return json({
    title: 'Event 1',
    date: '2022-01-01',
    choice: {
      dish: 0,
    },
    menus: [
      {
        id: 0,
        name: 'Menu 1',
        description: 'Description 1',
        dishes: [
          {
            id: 0,
            name: 'Dish 1',
            description: 'Description 1',
            ingredients: [
              {
                id: 0,
                name: 'Ingredient 1',
              },
              {
                id: 1,
                name: 'Ingredient 2',
              },
              {
                id: 2,
                name: 'Ingredient 3',
              },
              {
                id: 3,
                name: 'Ingredient 4',
              },
            ],
          },
          {
            id: 1,
            name: 'Dish 2',
            description: 'Description 2',
            ingredients: [
              {
                id: 0,
                name: 'Ingredient 1',
              },
              {
                id: 1,
                name: 'Ingredient 2',
              },
              {
                id: 2,
                name: 'Ingredient 3',
              },
              {
                id: 3,
                name: 'Ingredient 4',
              },
            ],
          },
        ],
      },
      {
        id: 1,
        name: 'Menu 2',
        description: 'Description 2',
        dishes: [
          {
            id: 0,
            name: 'Dish 1',
            description: 'Description 1',
            ingredients: [
              {
                id: 0,
                name: 'Ingredient 1',
              },
              {
                id: 1,
                name: 'Ingredient 2',
              },
              {
                id: 2,
                name: 'Ingredient 3',
              },
              {
                id: 3,
                name: 'Ingredient 4',
              },
            ],
          },
          {
            id: 1,
            name: 'Dish 2',
            description: 'Description 2',
            ingredients: [
              {
                id: 0,
                name: 'Ingredient 1',
              },
              {
                id: 1,
                name: 'Ingredient 2',
              },
              {
                id: 2,
                name: 'Ingredient 3',
              },
              {
                id: 3,
                name: 'Ingredient 4',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: 'Menu 3',
        description: 'Description 3',
        dishes: [
          {
            id: 0,
            name: 'Dish 1',
            description: 'Description 1',
            ingredients: [
              {
                id: 0,
                name: 'Ingredient 1',
              },
              {
                id: 1,
                name: 'Ingredient 2',
              },
              {
                id: 2,
                name: 'Ingredient 3',
              },
              {
                id: 3,
                name: 'Ingredient 4',
              },
            ],
          },
        ],
      },
      {
        id: 3,
        name: 'Menu 4',
        description: 'Description 4',
        dishes: [
          {
            id: 0,
            name: 'Dish 1',
            description: 'Description 1',
            ingredients: [
              {
                id: 0,
                name: 'Ingredient 1',
              },
              {
                id: 1,
                name: 'Ingredient 2',
              },
              {
                id: 2,
                name: 'Ingredient 3',
              },
              {
                id: 3,
                name: 'Ingredient 4',
              },
            ],
          },
        ],
      },
    ],
  })
}

const PageComponent: FC = () => {
  const { title, choice, date, menus } = useLoaderData<typeof loader>()

  const [selection, setSelection] = useState(choice.dish)

  const menu = useMemo(
    () => menus.find((menu) => menu.id === selection),
    [menus, selection],
  )

  useEffect(() => {
    setSelection(choice.dish)
  }, [choice.dish])

  return (
    <>
      <header className="mb-4">
        <h1 className="text-2xl">{title}</h1>
        <h2>{date}</h2>
      </header>
      <div className="grid grid-cols-3 gap-x-5">
        <div className="grid col-span-2 grid-cols-2 gap-5">
          {menus.map((menu) => {
            const selected = menu.id === selection

            const highlight =
              selected && menu.id === choice.dish ? true : selected

            return (
              <article key={menu.id} className="flex flex-col gap-y-4">
                <header className="flex justify-between">
                  <div>
                    <h1 className="text-xl">{menu.name}</h1>
                    <p>{menu.description}</p>
                  </div>
                  <div>
                    {highlight === false && (
                      <Form method="post">
                        <input type="hidden" name="dish" value={selection} />
                        <Submit>Choose</Submit>
                      </Form>
                    )}
                  </div>
                </header>
                <ul className="list-none">
                  {menu.dishes.map((dish) => (
                    <li
                      key={dish.id}
                      className="px-4 py-3 flex justify-between border-2 bg-slate-50"
                    >
                      {dish.name}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
        <div className="flex">
          {menu ? (
            <article>
              <h1 className="text-xl">My menu {menu.name}</h1>
              <p>{menu.description}</p>
              <h2>Dishes</h2>
              <ul className="list-none">
                {menu.dishes.map((dish) => (
                  <li key={dish.id}>
                    <div>
                      <h3>{dish.name}</h3>
                    </div>
                    <ul>
                      {dish.ingredients.map((ingredient) => (
                        <li
                          key={ingredient.id}
                          className="px-4 py-3 flex justify-between border-2 bg-slate-50"
                        >
                          {ingredient.name}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </article>
          ) : (
            <h1 className="m-auto">No menu selected</h1>
          )}
        </div>
      </div>
    </>
  )
}

export default PageComponent