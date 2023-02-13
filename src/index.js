const { ensureArrayStructure, generateMessagePayload, getUrlByMethod, makePostRequest, makeGetRequest } = require('./utils')

const synologyChatCommunicator = ({ baseUrl, token, ignoreSSLErrors } = {}) => {
  const getRequestUrl = getUrlByMethod(baseUrl, token)
  const chatbotUrl = getRequestUrl('chatbot')
  const usersUrl = getRequestUrl('user_list')
  const channelsUrl = getRequestUrl('channel_list')
  const requestSettings = {}
  if (ignoreSSLErrors) {
    // @SEE: https://github.com/sindresorhus/got/issues/477#issuecomment-682166391
    requestSettings.https = { rejectUnauthorized: false }
  }

  return {
    sendDirectMessage: (users, text, mediaLink) => {
      const usersInScope = ensureArrayStructure(users)
      const payload = generateMessagePayload({ users: usersInScope, text, mediaLink })
      return makePostRequest(chatbotUrl, { ...requestSettings, form: { payload } }).then(res => res.data)
    },
    getUsers: () => makeGetRequest(usersUrl, requestSettings).then(res => res.data.users),
    getChannels: () => makeGetRequest(channelsUrl, requestSettings).then(res => res.data.channels)
  }
}

module.exports = synologyChatCommunicator
