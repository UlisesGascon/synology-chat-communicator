const { disableSslRejections, ensureArrayStructure, generateMessagePayload, getUrlByMethod, makePostRequest, makeGetRequest } = require('./utils')

const synologyChatCommunicator = ({ baseUrl, token, ignoreSSLErrors } = {}) => {
  const getRequestUrl = getUrlByMethod(baseUrl, token)
  const chatbotUrl = getRequestUrl('chatbot')
  const usersUrl = getRequestUrl('user_list')
  const channelsUrl = getRequestUrl('channel_list')

  if (ignoreSSLErrors) {
    disableSslRejections()
  }

  return {
    sendDirectMessage: (users, text, mediaLink) => {
      const usersInScope = ensureArrayStructure(users)
      const payload = generateMessagePayload({ users: usersInScope, text, mediaLink })
      const requestSettings = { form: { payload } }
      return makePostRequest(chatbotUrl, requestSettings).then(res => res.data)
    },
    getUsers: () => makeGetRequest(usersUrl).then(res => res.data.users),
    getChannels: () => makeGetRequest(channelsUrl).then(res => res.data.channels)
  }
}

module.exports = synologyChatCommunicator
