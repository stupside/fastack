import { useState, type FC, useEffect, useMemo } from 'react'
import { Tooltip } from 'flowbite-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWheatAlt } from '@fortawesome/free-solid-svg-icons'

import { useLoaderData } from '@remix-run/react'

import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'

import storage from '~/server/storage/session.server'

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
    title: 'Soiree chez Kirill',
    date: '2022-01-01',
    choice: {
      dish: 0,
    },
    menus: [
      {
        id: 0,
        name: 'Vegetarian',
        description: 'Description 1',
        dishes: [
          {
            id: 0,
            name: 'Chicken Alfredo',
            description: 'Creamy pasta with grilled chicken',
            ingredients: [
              {
                id: 0,
                name: 'Pasta',
              },
              {
                id: 1,
                name: 'Chicken',
              },
              {
                id: 2,
                name: 'Cream',
              },
              {
                id: 3,
                name: 'Parmesan cheese',
              },
            ],
          },
          {
            id: 1,
            name: 'Caprese Salad',
            description: 'Fresh mozzarella, tomatoes, and basil',
            ingredients: [
              {
                id: 0,
                name: 'Tomatoes',
              },
              {
                id: 1,
                name: 'Mozzarella cheese',
              },
              {
                id: 2,
                name: 'Basil',
              },
              {
                id: 3,
                name: 'Olive oil',
              },
            ],
          },
        ],
        allergens: ['Gluten', 'Dairy'],
      },
      {
        id: 1,
        name: 'Vegetarian',
        description: 'Description 2',
        dishes: [
          {
            id: 0,
            name: 'Grilled Salmon',
            description: 'Fresh salmon grilled to perfection',
            ingredients: [
              {
                id: 0,
                name: 'Salmon',
              },
              {
                id: 1,
                name: 'Lemon',
              },
              {
                id: 2,
                name: 'Garlic',
              },
              {
                id: 3,
                name: 'Butter',
              },
            ],
          },
          {
            id: 1,
            name: 'Vegetable Stir-Fry',
            description: 'Assorted vegetables stir-fried with soy sauce',
            ingredients: [
              {
                id: 0,
                name: 'Broccoli',
              },
              {
                id: 1,
                name: 'Carrots',
              },
              {
                id: 2,
                name: 'Bell peppers',
              },
              {
                id: 3,
                name: 'Soy sauce',
              },
            ],
          },
        ],
        allergens: ['Fish', 'Soy'],
      },
      {
        id: 2,
        name: 'Menu 3',
        description: 'Description 3',
        dishes: [
          {
            id: 0,
            name: 'Beef Lasagna',
            description: 'Layers of pasta, ground beef, and tomato sauce',
            ingredients: [
              {
                id: 0,
                name: 'Pasta',
              },
              {
                id: 1,
                name: 'Ground beef',
              },
              {
                id: 2,
                name: 'Tomato sauce',
              },
              {
                id: 3,
                name: 'Mozzarella cheese',
              },
            ],
          },
        ],
        allergens: ['Gluten', 'Dairy'],
      },
      {
        id: 3,
        name: 'Menu 4',
        description: 'Description 4',
        dishes: [
          {
            id: 0,
            name: 'Vegetarian Pizza',
            description: 'Pizza topped with assorted vegetables',
            ingredients: [
              {
                id: 0,
                name: 'Pizza dough',
              },
              {
                id: 1,
                name: 'Tomatoes',
              },
              {
                id: 2,
                name: 'Mushrooms',
              },
              {
                id: 3,
                name: 'Onions',
              },
            ],
          },
        ],
        allergens: ['Gluten'],
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
      <header className="mb-4 w-full flex flex-row justify-center items-center">
        <h1 className="text-2xl">{title}</h1>
        <h2>{date}</h2>
      </header>
      <div className="px-3 w-full flex flex-row justify-center">
        <div className="grid gap-2 sm:grid-cols-1 lg:grid-cols-2 max-w-2xl m-1">
          {menus.map((menu) => {
            const selected = menu.id === selection

            const highlight =
              selected && menu.id === choice.dish ? true : selected

            return (
              <div>
                <div className={selected ? 'border-4 border-pink-400' : ''}>
                  <article key={menu.id} className={'flex flex-col w-80'}>
                    <Tooltip content={menu.description}>
                      <div className="bg-sky-500 h-10 w-80 flex flex-row justify-center items-center">
                        <span className="text-white font-thin mx-4">
                          {menu.name}
                        </span>
                        {/* tooltip icon */}
                        {/* ? probably show only if description is provided*/}
                        <svg
                          className="w-6 h-6 text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M10 11h2v5m-2 0h4m-2.6-8.5h0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </div>
                    </Tooltip>
                    {menu.dishes.map((dish) => (
                      <div className="border border-black h-10 w-80 border-t-0 flex flex-row justify-center items-center m-0 p-0">
                        <span className="text-black font-thin mx-4">
                          {dish.name}
                        </span>
                      </div>
                    ))}
                  </article>
                </div>
                {menu.allergens.map((allergen) => (
                  <div className="h-10 w-80 border-t-0 flex flex-row justify-start items-center m-0 p-0">
                    <FontAwesomeIcon icon={faWheatAlt} />
                    <span className="text-black font-thin mx-4 text-sm">
                      {allergen}
                    </span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
        <div className="w-80">
          <span>chosen menu description</span>
          <FontAwesomeIcon icon={faWheatAlt} />
        </div>
      </div>
    </>
  )
}

export default PageComponent
