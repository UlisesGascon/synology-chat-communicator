const { ensureArrayStructure, generateMessagePayload, getUrlByMethod } = require('../src/utils')

describe('Utils', () => {
  describe('ensureArrayStructure', () => {
    it('Should support arrays', () => {
      expect(ensureArrayStructure([3, 4, 5])).toStrictEqual([3, 4, 5])
    })

    it('Should support isolated values', () => {
      expect(ensureArrayStructure(2)).toStrictEqual([2])
    })
  })

  describe('generateMessagePayload', () => {
    const users = [2, 3]
    const text = 'Hello'
    const mediaLink = 'https://demo.com/picture.png'

    it('Should support a basic message', () => {
      expect(generateMessagePayload({ users, text })).toStrictEqual(JSON.stringify({
        user_ids: users, text
      }))
    })

    it('Should support a media message', () => {
      expect(generateMessagePayload({ users, text, mediaLink })).toStrictEqual(JSON.stringify({
        user_ids: users, text, file_url: mediaLink
      }))
    })
  })

  describe('getUrlByMethod', () => {
    const token = 'THE-TOKEN'
    const baseUrl = 'https://demo.com'
    const method = 'chatbot'

    it('Should throw an error if token or baseUrl is missing', () => {
      expect(() => getUrlByMethod()()).toThrow('The baseUrl or the token are missing. Check out the documentation!')
      expect(() => getUrlByMethod(baseUrl)()).toThrow('The baseUrl or the token are missing. Check out the documentation!')
    })

    it('Should throw an error if the method is not implemented', () => {
      expect(() => getUrlByMethod(baseUrl, token)('INVENTED')).toThrow('Invalid method!')
    })

    it('Should return the full URL with the method', () => {
      const expectedUrl = `${baseUrl}/webapi/entry.cgi?api=SYNO.Chat.External&method=${method}&version=2&token=%22${token}%22`
      expect(getUrlByMethod(baseUrl, token)(method)).toBe(expectedUrl)
    })
  })
})
