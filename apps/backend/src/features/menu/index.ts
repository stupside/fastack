export * from './Choose'
export * from './Create'
export * from './Delete'
export * from './GetById'

import Choose from './Choose'
import Create from './Create'
import Delete from './Delete'
import View from './GetById'

const Menu = {
  Create,
  Choose,
  Delete,
  View,
}

export { Menu }
export default Menu
