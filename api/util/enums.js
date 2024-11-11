const STATUS_ENUMS = ['pending', 'accepted', 'rejected']
const ROLES_ENUMS = {
  Admin: 'admin',
  Seller: 'seller',
  User: 'user'
}
const MESSAGE_TYPE_ENUMS = {
  EVENT: 'event',
  CAMPAIGN: 'campaign',
  NOTIFY: 'notify'
}
module.exports = {
  STATUS_ENUMS,
  ROLES_ENUMS,
  MESSAGE_TYPE_ENUMS
}
