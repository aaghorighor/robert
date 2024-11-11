/* eslint-disable linebreak-style */
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Doctor = require('../../model/doctor');
const User = require('../../model/user');

const { fetchDoctorSchedule } = require('../../services/doctorSchedule');

global.TextEncoder = TextEncoder;

describe('fetchDoctorAppointments', () => {
  let mongoServer;

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
    const userId = new mongoose.Types.ObjectId('649ff343069e1cd177cecee3');
    console.log(userId);
    const doctorData = {
      _id: new mongoose.Types.ObjectId(),
      user: userId,
      schedule: [
        {
          session: 'morning',
          date: new Date('2023-07-04T00:00:00.000Z'),
          status: true,
          slots: [
            {
              time: '09:00 AM',
              status: 'accepted',
              patient: new mongoose.Types.ObjectId('64a32e7bc75659c0b7df97a8'),
              service: {
                name: 'Tooth cleaning',
                duration: '15 minutes',
                price: 30,
              },
              _id: new mongoose.Types.ObjectId('64a322bfc75659c0b7df937d'),
            },
            {
              time: '10:30 AM',
              status: 'accepted',
              patient: new mongoose.Types.ObjectId('64a32e7bc75659c0b7df97a8'),
              service: {
                name: 'Tooth cleaning',
                duration: '15 minutes',
                price: 30,
              },
              _id: new mongoose.Types.ObjectId('64a322bfc75659c0b7df937e'),
            },
          ],
          _id: new mongoose.Types.ObjectId('64a322bfc75659c0b7df937c'),
        },
        {
          session: 'evening',
          date: new Date('2023-07-05T00:00:00.000Z'),
          status: true,
          slots: [
            {
              time: '06:00 PM',
              status: 'accepted',
              patient: new mongoose.Types.ObjectId('64a32e7bc75659c0b7df97a8'),
              service: {
                name: 'Tooth cleaning',
                duration: '15 minutes',
                price: 30,
              },
              _id: new mongoose.Types.ObjectId('64a3231dc75659c0b7df9469'),
            },
            {
              time: '07:00 PM',
              status: 'accepted',
              patient: new mongoose.Types.ObjectId('64a32e7bc75659c0b7df97a8'),
              service: {
                name: 'Tooth cleaning',
                duration: '15 minutes',
                price: 30,
              },
              _id: new mongoose.Types.ObjectId('64a3231dc75659c0b7df946a'),
            },
            {
              time: '07:30 PM',
              status: 'pending',
              patient: null,
              service: {
                duration: '0',
                price: 0,
              },
              _id: new mongoose.Types.ObjectId('64a3231dc75659c0b7df946b'),
            },
          ],
          _id: new mongoose.Types.ObjectId('64a3231dc75659c0b7df9468'),
        },
      ],
    };

    const doctor = new Doctor(doctorData);
    await doctor.save();

    const userData = {
      _id: new mongoose.Types.ObjectId('64a32e7bc75659c0b7df97a8'),
      first_name: 'Ema',
      last_name: 'Aghorighor',
      mobile: '07407022723',
      short_description: '',
      email: 'kabelsus@gmail.com',
      otp: '',
      role: 'patient',
      password: '$2b$10$D7K16UVMrUm/bNC/MxSAPO2/gJ7BaqjWbLFdk8u8A63m75WIYBS4C',
      photo: {
        secure_url: 'http://res.cloudinary.com/dwjjtakfs/image/upload/v1688457013/h2spajmfjz0rxs4oo8fa.jpg',
        public_id: 'h2spajmfjz0rxs4oo8fa',
      },
      createdAt: new Date('2023-07-03T20:24:27.156Z'),
      updatedAt: new Date('2023-07-07T17:15:19.516Z'),
    };

    const user = new User(userData);
    await user.save();
  });

  afterEach(async () => {
    await Doctor.deleteMany();
  });

  describe('fetchDoctorSchedule', () => {
    it('should fetch the doctor schedule with non-pending slots and full user details', async () => {
      const result = await fetchDoctorSchedule('649ff343069e1cd177cecee3');

      console.log('___________________________________________');
      console.log(JSON.stringify(result));
      expect(result).toBeTruthy();
    });
  });
});
