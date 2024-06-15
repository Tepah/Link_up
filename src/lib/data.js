// Fake data for testing
export const upcomingPlans = [
  {
    id: 1,
    title: 'Dinner with friends',
    description: 'Dinner with friends at a fancy restaurant',
    date: '2023-01-20',
    attending: [
      'John', 'Michael', 'Sarah'
    ]
  },
  {
    id: 2,
    title: 'Game night',
    date: '2023-01-15',
    attending: [
      'you'
    ]
  },
  {
    id: 3,
    title: 'Popeyes',
    date: '2023-01-16',
    attending: [
      'John', 'Michael', 'Sarah'
    ]
  },
  {
    id: 3,
    title: 'Popeyes',
    date: '2023-01-16',
    attending: [
      'John', 'Michael', 'Sarah'
    ]
  }
]

export const incompletePlan = [
  {
    id: 1,
    title: 'Dinner with friends',
    schedules: [
      {
        user: 'John',
        available: [
          "Mon Jun 24 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Tue Jun 25 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Thu Jun 27 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Sat Jun 29 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Tue Jul 02 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Thu Jul 04 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          ]
      },
      {
        user: 'Michael',
        available: [
          "Mon Jun 24 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Tue Jun 25 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
        ]
      },
      {
        user: 'Sarah',
        available: [
          "Mon Jun 24 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Tue Jun 25 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Tue Jul 02 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Thu Jul 04 2024 00:00:00 GMT-0700 (Pacific Standard Time)"
          ]
      },
    ]
  },
  {
    id: 1,
    title: 'Dinner with friends',
    schedules: [
      {
        user: 'John',
        available: [
          "Mon Jan 22 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Tue Jan 23 2024 00:00:00 GMT-0700 (Pacific Standard Time)", "Wed Jan 24 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Thu Jan 25 2024 00:00:00 GMT-0700 (Pacific Standard Time)", "Fri Jan 26 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Sat Jan 27 2024 00:00:00 GMT-0700 (Pacific Standard Time)", "Mon Jan 29 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Tue Jan 30 2024 00:00:00 GMT-0700 (Pacific Standard Time)", "Wed Jan 31 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Thu Feb 01 2024 00:00:00 GMT-0700 (Pacific Standard Time)", "Fri Feb 02 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
        ]
      },
      {
        user: 'Michael',
        available: ["Wed Jan 24 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Thu Jan 25 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Fri Jan 26 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Wed Jan 31 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Thu Feb 01 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Fri Feb 02 2024 00:00:00 GMT-0700 (Pacific Standard Time)"]
      },
      {
        user: 'Sarah',
        available: ["Thu Feb 01 2024 00:00:00 GMT-0700 (Pacific Standard Time)",
          "Fri Feb 02 2024 00:00:00 GMT-0700 (Pacific Standard Time)"]
      },
    ]
  },
]

