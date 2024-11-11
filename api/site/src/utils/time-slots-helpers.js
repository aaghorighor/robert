const generateTimeSlots = (startTime, endTime) => {
  const timeSlots = [];

  let currentTime = startTime;
  while (currentTime < endTime) {
    timeSlots.push(
      currentTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    );
    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }

  return timeSlots;
};

// Usage example
const morningStartTime = new Date();
morningStartTime.setHours(9, 0, 0); // Set the morning start time to 9:00 AM

const morningEndTime = new Date();
morningEndTime.setHours(12, 0, 0); // Set the morning end time to 12:00 PM

const afternoonStartTime = new Date();
afternoonStartTime.setHours(13, 0, 0); // Set the afternoon start time to 1:00 PM

const afternoonEndTime = new Date();
afternoonEndTime.setHours(17, 0, 0); // Set the afternoon end time to 5:00 PM

const eveningStartTime = new Date();
eveningStartTime.setHours(18, 0, 0); // Set the evening start time to 6:00 PM

const eveningEndTime = new Date();
eveningEndTime.setHours(20, 0, 0); // Set the evening end time to 8:00 PM

const morningTimeSlots = generateTimeSlots(morningStartTime, morningEndTime);
const afternoonTimeSlots = generateTimeSlots(
  afternoonStartTime,
  afternoonEndTime,
);
const eveningTimeSlots = generateTimeSlots(eveningStartTime, eveningEndTime);
const morningEveningTimeSlots = generateTimeSlots(
  morningStartTime,
  eveningEndTime,
);

function fullDayTimeSlots() {
  const timeSlots = [];
  const startTime = new Date();
  startTime.setHours(0, 0, 0, 0); 

  const endTime = new Date();
  endTime.setHours(23, 30, 0, 0); 

  while (startTime <= endTime) {
    const hours = startTime.getHours();
    const minutes = startTime.getMinutes();
    const amOrPm = hours < 12 ? 'AM' : 'PM';
    const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    const formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;
    timeSlots.push(formattedTime);
    startTime.setMinutes(startTime.getMinutes() + 30); 
  }

  return timeSlots;
}

export {
  morningTimeSlots,
  eveningTimeSlots,
  afternoonTimeSlots,
  morningEveningTimeSlots,
  fullDayTimeSlots,
};
