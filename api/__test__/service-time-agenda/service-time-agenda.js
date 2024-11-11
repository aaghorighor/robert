/* eslint-disable linebreak-style */
const { combineResolvers } = require('graphql-resolvers');

// Mocked user data for testing
const mockUser = {
  id: 'user123',
  username: 'testuser',
};

// Mocked input data for testing
const mockAgendaItemInput = {
  title: 'Test Agenda',
  start_time: '10:00 AM',
  end_time: '11:00 AM',
  description: 'Test agenda description',
  status: true,
  facilitator: 'James Micheal',
};

describe('Resolvers', () => {
  describe('Mutation: addAgenda', () => {
    it('should add a new agenda item', async () => {
      // Mock the required functions
      const addAgendaMock = jest.fn().mockResolvedValueOnce({
        _id: '64a32e7bc75659c0b7df97a8',
        ...mockAgendaItemInput,
      });

      const resolver = combineResolvers((_, { agendaItemInput }, { user }) =>
        addAgendaMock(user, agendaItemInput));

      // Run the resolver function with mocked data
      const result = await resolver(
        null,
        { agendaItemInput: mockAgendaItemInput },
        { user: mockUser },
      );

      // Assert that the addAgenda function was called with the correct arguments
      expect(addAgendaMock).toHaveBeenCalledWith(mockUser, mockAgendaItemInput);
      // Assert the expected result
      expect(result).toEqual({
        _id: '64a32e7bc75659c0b7df97a8',
        ...mockAgendaItemInput,
      });
    });
  });

  describe('Mutation: updateAgenda', () => {
    it('should update an existing agenda item', async () => {
      // Mock the required functions
      const updateAgendaMock = jest.fn().mockResolvedValueOnce(
        true,
      );

      const resolver = combineResolvers((_, { agendaId, agendaItemInput }) =>
        updateAgendaMock(agendaId, agendaItemInput));

      // Run the resolver function with mocked data
      const result = await resolver(null, {
        agendaId: 'agenda123',
        agendaItemInput: mockAgendaItemInput,
      });

      // Assert that the updateAgenda function was called with the correct arguments
      expect(updateAgendaMock).toHaveBeenCalledWith(
        'agenda123',
        mockAgendaItemInput,
      );
      // Assert the expected result
      expect(result).toEqual(
        true,
      );
    });
  });

  describe('Mutation: removeAgenda', () => {
    it('should remove an agenda item', async () => {
      // Mock the required functions
      const removeAgendaMock = jest.fn().mockResolvedValueOnce(
        true,
      );

      const resolver = combineResolvers((_, { agendaId }) =>
        removeAgendaMock(agendaId));

      // Run the resolver function with mocked data
      const result = await resolver(null, { agendaId: 'agenda123' });

      // Assert that the removeAgenda function was called with the correct arguments
      expect(removeAgendaMock).toHaveBeenCalledWith('agenda123');
      // Assert the expected result
      expect(result).toEqual(
        true,
      );
    });
  });
});
