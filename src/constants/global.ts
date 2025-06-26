export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const genders = ['Male', 'Female', 'Other'];

export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const monthOptions = monthNames.map((item) => ({
  value: item,
  label: item,
}));

export const genderOptions = genders.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));

export const bloodGroupOptions = bloodGroups.map((item) => ({
  value: item,
  label: item,
}));

export const daysOptions = [
  { value: 'Sat', label: 'Saturday' },
  { value: 'Sun', label: 'Sunday' },
  { value: 'Mon', label: 'Monday' },
  { value: 'Tue', label: 'Tuesday' },
  { value: 'Wed', label: 'Wednesday' },
  { value: 'Thu', label: 'Thursday' },
  { value: 'Fri', label: 'Friday' },
];