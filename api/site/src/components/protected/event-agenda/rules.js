
export const EVENT_AGENDA_RULES = {
  eventAgenda: {
    title: [
      {
        pattern: /^.+$/,
        message: 'title is required'
      },
      {
        pattern: /^.{0,50}$/,
        message: 'title must be no more than 50 characters',
      },
    ],
    start_time: [
      {
        pattern: /^.+$/,
        message: 'start time is required'
      },
      {
        pattern: /^.{0,50}$/,
        message: 'star time must be no more than 10 characters',
      },
    ],
    end_time: [
      {
        pattern: /^.+$/,
        message: 'end time is required'
      },
      {
        pattern: /^.{0,50}$/,
        message: 'end time must be no more than 10 characters',
      },
    ]

  },

  fields: {
    _id: '',
    title: '',
    start_time: '',
    end_time: '',
    description: '',
    status: false,
    sequency_no: 0,
    facilitator: '',
    eventId: '',
  },
};


