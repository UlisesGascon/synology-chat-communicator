const got = require('got')
const synologyChatCommunicator = require('../src/index')

const token = 'THE-TOKEN'
const baseUrl = 'https://demo.com'

describe('synology-chat-communicator', () => {
  describe('configuration', () => {
    it('Should disable SSL Validation', async () => {
      const { getUsers } = synologyChatCommunicator({
        token,
        baseUrl,
        ignoreSSLErrors: true
      })
      await getUsers()
      expect(got.get.mock.calls[0][1]).toStrictEqual({ https: { rejectUnauthorized: false } })
      expect(got.get.mock.calls).toHaveLength(1)
    })

    it('Should keep SSL Validation (even as default)', async () => {
      let { getUsers } = synologyChatCommunicator({
        token,
        baseUrl,
        ignoreSSLErrors: false
      })
      await getUsers()
      expect(got.get.mock.calls[0][1]).toStrictEqual({})
      expect(got.get.mock.calls).toHaveLength(1)

      getUsers = synologyChatCommunicator({
        token,
        baseUrl
      }).getUsers
      await getUsers()
      expect(got.get.mock.calls[1][1]).toStrictEqual({})
      expect(got.get.mock.calls).toHaveLength(2)
    })
  })

  describe('sendDirectMessage', () => {
    const { sendDirectMessage } = synologyChatCommunicator({
      token,
      baseUrl
    })

    it('Should send a direct Message to one user', async () => {
      await sendDirectMessage(123, 'Hi there!')
      expect(got.post.mock.calls[0][0]).toBe(`${baseUrl}/webapi/entry.cgi?api=SYNO.Chat.External&method=chatbot&version=2&token=%22${token}%22`)
      expect(got.post.mock.calls[0][1]).toStrictEqual({
        form: { payload: JSON.stringify({ user_ids: [123], text: 'Hi there!' }) }
      })
      expect(got.post.mock.calls).toHaveLength(1)
    })

    it('Should send a direct Message with media link', async () => {
      await sendDirectMessage(123, 'Hi there!', 'https://demo.com/image.png')
      expect(got.post.mock.calls[0][0]).toBe(`${baseUrl}/webapi/entry.cgi?api=SYNO.Chat.External&method=chatbot&version=2&token=%22${token}%22`)
      expect(got.post.mock.calls[0][1]).toStrictEqual({
        form: { payload: JSON.stringify({ user_ids: [123], text: 'Hi there!', file_url: 'https://demo.com/image.png' }) }
      })
      expect(got.post.mock.calls).toHaveLength(1)
    })

    it('Should send a direct Message to multiple users', async () => {
      await sendDirectMessage([123, 456, 789], 'Hi there!')
      expect(got.post.mock.calls[0][0]).toBe(`${baseUrl}/webapi/entry.cgi?api=SYNO.Chat.External&method=chatbot&version=2&token=%22${token}%22`)
      expect(got.post.mock.calls[0][1]).toStrictEqual({
        form: { payload: JSON.stringify({ user_ids: [123, 456, 789], text: 'Hi there!' }) }
      })
      expect(got.post.mock.calls).toHaveLength(1)
    })
  })
  describe('getUsers', () => {
    it('Should get the available users', async () => {
      const { getUsers } = synologyChatCommunicator({
        token,
        baseUrl
      })
      await getUsers()
      expect(got.get.mock.calls[0][0]).toBe(`${baseUrl}/webapi/entry.cgi?api=SYNO.Chat.External&method=user_list&version=2&token=%22${token}%22`)
      expect(got.get.mock.calls[0][1]).toStrictEqual({})
      expect(got.get.mock.calls).toHaveLength(1)
    })
  })

  describe('getChannels', () => {
    it('Should get the available channels', async () => {
      const { getChannels } = synologyChatCommunicator({
        token,
        baseUrl
      })
      await getChannels()
      expect(got.get.mock.calls[0][0]).toBe(`${baseUrl}/webapi/entry.cgi?api=SYNO.Chat.External&method=channel_list&version=2&token=%22${token}%22`)
      expect(got.get.mock.calls[0][1]).toStrictEqual({})
      expect(got.get.mock.calls).toHaveLength(1)
    })
  })
})
