/* eslint-disable linebreak-style */
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { UserInputError } = require('apollo-server');

const Patient = require('../../model/patient');
const { fetchDoctorAppointments } = require('../../services/patientProfile');

global.TextEncoder = TextEncoder;

describe('fetchDoctorAppointments', () => {
  let mongoServer;
  const validDoctorId = new mongoose.Types.ObjectId();

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    await mongoServer.start();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    const userId = new mongoose.Types.ObjectId();
    const patientData = {
      _id: new mongoose.Types.ObjectId(),
      user: userId,
      appointments: [
        {
          doctor: {
            doctorId: validDoctorId,
            // other doctor data
          },
          // other appointment data
        },
        {
          doctor: {
            doctorId: validDoctorId,
            // other doctor data
          },
          // other appointment data
        },
      ],
    };

    const patient = new Patient(patientData);
    await patient.save();
  });

  afterEach(async () => {
    await Patient.deleteMany(); // clean up the database
  });

  test('should return appointments for valid doctorId', async () => {
    // Arrange
    const patientData = {
      _id: new mongoose.Types.ObjectId(),
      user: validDoctorId,
      appointments: [
        {
          doctor: {
            doctorId: validDoctorId,
            // other doctor data
          },
          // other appointment data
        },
        {
          doctor: {
            doctorId: validDoctorId,
            // other doctor data
          },
          // other appointment data
        },
      ],
    };

    jest
      .spyOn(Patient, 'find')
      .mockResolvedValueOnce(patientData);

    // Act
    const appointments = await fetchDoctorAppointments(validDoctorId);

    // Assert
    expect(appointments).toEqual(patientData);
    expect(Patient.find).toHaveBeenCalledWith({
      'appointments.doctor.doctorId': validDoctorId,
    });
  });

  test('should throw error for invalid doctorId', async () => {
    const doctorId = 'inValidDoctorId';

    // Act and Assert
    await expect(fetchDoctorAppointments(doctorId)).rejects.toThrow(
      UserInputError,
    );
  });

  test('should throw error if doctor not found', async () => {
    // Arrange
    const doctorId = 'validButNonExistentDoctorId';
    jest.spyOn(Patient, 'find').mockResolvedValueOnce([]);

    // Act and Assert
    await expect(fetchDoctorAppointments(doctorId)).rejects.toThrow(
      UserInputError,
    );
  });
});
