const additionalHandlers = {
  json: () => ({
    success: true,
    data: {
      channels: [],
      users: []
    }
  })
}

module.exports = {
  get: jest.fn(() => additionalHandlers),
  post: jest.fn(() => additionalHandlers)
}
