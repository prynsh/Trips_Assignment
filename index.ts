
interface Device {
    id: string;
    name: string;
    loggedIn: Date;
    loggedOut?: Date;
    lastSeenAt: Date;
  }
  
  interface User {
    id: string;
    username: string;
    devices: Device[];
  }
  
  function calculateMonthlyUsers(users: User[], month: number, year: number): { loggedIn: number, active: number } {
    let loggedInCount = 0;
    let activeCount = 0;
  
    for (const user of users) {
      if (userLoggedInDuringMonth(user, month, year)) {
        loggedInCount++;
  
        if (userActiveDuringMonth(user, month, year)) {
          activeCount++;
        }
      }
    }
  
    return { loggedIn: loggedInCount, active: activeCount };
  }
  
  function userLoggedInDuringMonth(user: User, month: number, year: number): boolean {
    for (const device of user.devices) {
      if (device.loggedIn.getMonth() === month && device.loggedIn.getFullYear() === year) {
        return true;
      }
    }
    return false;
  }
  
  function userActiveDuringMonth(user: User, month: number, year: number): boolean {
    for (const device of user.devices) {
      if (device.lastSeenAt.getMonth() === month && device.lastSeenAt.getFullYear() === year) {
        return true;
      }
    }
    return false;
  }
  
  const users: User[] = [
    {
      id: "1",
      username: "user1",
      devices: [
        {
          id: "1",
          name: "Device 1",
          loggedIn: new Date(2024, 4, 15), // May 15, 2024
          lastSeenAt: new Date(2024, 4, 25), // May 25, 2024
        }
      ]
    },
    {
      id: "2",
      username: "user2",
      devices: [
        {
          id: "2",
          name: "Device 2",
          loggedIn: new Date(2024, 3, 20), // April 20, 2024
          lastSeenAt: new Date(2024, 4, 5), // May 5, 2024
        },
        {
          id: "3",
          name: "Device 3",
          loggedIn: new Date(2024, 4, 10), // May 10, 2024
          lastSeenAt: new Date(2024, 4, 30), // May 30, 2024
        }
      ]
    }
  ];
  
  
  const month = 4; // May (0 based indexing is used here)
  const year = 2024;
  const { loggedIn, active } = calculateMonthlyUsers(users, month, year);
  console.log(`Logged-in users in May 2024: ${loggedIn}`);
  console.log(`Active users in May 2024: ${active}`);
  