const got = require('got')
const debug = require('debug')('synology-chat-communicator')

const ensureArrayStructure = users => Array.isArray(users) ? users : [users]

const generateMessagePayload = ({ users, text, mediaLink }) => {
  const payload = { user_ids: users, text }
  debug('Preparing message with basic payload ', { users, text })

  if (mediaLink) {
    payload.file_url = mediaLink
    debug('Adding file_url to the message', mediaLink)
  }

  return JSON.stringify(payload)
}
const implementedMethods = ['chatbot', 'user_list', 'channel_list']

const getUrlByMethod = (baseUrl, token) => method => {
  if (!baseUrl || !token) {
    throw new Error('The baseUrl or the token are missing. Check out the documentation!')
  }

  if (!implementedMethods.includes(method)) {
    throw new Error('Invalid method!')
  }

  return `${baseUrl}/webapi/entry.cgi?api=SYNO.Chat.External&method=${method}&version=2&token=%22${token}%22`
}

const makeRequest = method => async (url, settings = {}) => {
  debug('Starting the request to Synology Chat with url', url)
  const message = await got[method](url, settings).json()

  if (!message.success) {
    throw new Error('Request not send', message)
  }

  debug('Received response from Synology Chat Request', message)
  return message
}

module.exports = {
  ensureArrayStructure,
  generateMessagePayload,
  getUrlByMethod,
  makePostRequest: makeRequest('post'),
  makeGetRequest: makeRequest('get')
}
