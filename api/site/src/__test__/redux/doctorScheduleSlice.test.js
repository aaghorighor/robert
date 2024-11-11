import { doctorScheduleSlice } from '../../redux/slices/doctor-schedule';

describe('doctorScheduleSlice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      doctorSchedules: [],
      doctorSchedule: {},
    };
  });

  it('should handle addNewSchedule', () => {
    const { addNewSchedule } = doctorScheduleSlice.actions;
    const schedule = { id: 1, title: 'Schedule 1' };

    const nextState = doctorScheduleSlice.reducer(initialState, addNewSchedule(schedule));

    expect(nextState.doctorSchedules).toEqual([schedule]);
  });

  it('should handle editSchedule', () => {
    const { editSchedule } = doctorScheduleSlice.actions;
    const schedule = { id: 1, title: 'Updated Schedule' };

    const nextState = doctorScheduleSlice.reducer(initialState, editSchedule(schedule));

    expect(nextState.doctorSchedule).toEqual(schedule);
  });

  it('should handle updateMySchedule', () => {
    const { updateMySchedule } = doctorScheduleSlice.actions;
    const scheduleToUpdate = { id: 1, title: 'Schedule 1' };
    const updatedSchedule = { id: 1, title: 'Updated Schedule' };
    initialState.doctorSchedules = [scheduleToUpdate];

    const nextState = doctorScheduleSlice.reducer(initialState, updateMySchedule(updatedSchedule));

    expect(nextState.doctorSchedules).toEqual([updatedSchedule]);
  });

  it('should handle deleteMySchedule', () => {
    const { deleteMySchedule } = doctorScheduleSlice.actions;
    const scheduleId = 1;
    const scheduleToRemove = { id: scheduleId, title: 'Schedule 1' };
    initialState.doctorSchedules = [scheduleToRemove];

    const nextState = doctorScheduleSlice.reducer(initialState, deleteMySchedule(scheduleId));

    expect(nextState.doctorSchedules).toEqual([]);
  });

  it('should handle loadSchedules', () => {
    const { loadSchedules } = doctorScheduleSlice.actions;
    const schedules = [{ id: 1, title: 'Schedule 1' }];

    const nextState = doctorScheduleSlice.reducer(initialState, loadSchedules(schedules));

    expect(nextState.doctorSchedules).toEqual(schedules);
  });

  it('should handle resetDoctorSchedule', () => {
    const { resetDoctorSchedule } = doctorScheduleSlice.actions;
    initialState.doctorSchedule = { id: 1, title: 'Schedule 1' };

    const nextState = doctorScheduleSlice.reducer(initialState, resetDoctorSchedule());

    expect(nextState.doctorSchedule).toEqual({});
  });
});
