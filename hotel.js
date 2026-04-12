const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let users = [
  { userId: "U101", name: "Divya", email: "divya@gmail.com", phone: "9876543210" }
];

let bookings = [
  {
    bookingId: "B001",
    userId: "U101",
    roomNumber: "R101",
    roomType: "DELUXE",
    city: "chennai",
    checkIn: "2026-04-10",
    checkOut: "2026-04-15"
  }
];

function menu() {
  console.log("\n🏨 Hotel Booking System");
  console.log("1. Register User");
  console.log("2. Delete User");
  console.log("3. Check Room Availability");
  console.log("4. Book Room");
  console.log("5. Display All Bookings");
  console.log("6. Exit");

  rl.question("Choose option: ", choice => {
    switch (choice) {
      case "1": registerUser(); break;
      case "2": deleteUser(); break;
      case "3": checkAvailability(); break;
      case "4": bookRoom(); break;
      case "5": displayBookings(); break;
      case "6": rl.close(); break;
      default:
        console.log("Invalid choice");
        menu();
    }
  });
}

function registerUser() {
  rl.question("User ID: ", id => {
    if (users.some(u => u.userId === id)) {
      console.log("❌ User already exists");
      return menu();
    }

    rl.question("Name: ", name => {
      rl.question("Email: ", email => {
        rl.question("Phone: ", phone => {
          users.push({ userId: id, name, email, phone });
          console.log("✅ User registered successfully");
          menu();
        });
      });
    });
  });
}

function deleteUser() {
  rl.question("Enter User ID to delete: ", id => {

    let hasBooking = bookings.some(b => b.userId === id);
    if (hasBooking) {
      console.log("❌ Cannot delete user. Active booking exists.");
      return menu();
    }

    let before = users.length;
    users = users.filter(u => u.userId !== id);

    if (users.length === before)
      console.log("❌ User not found");
    else
      console.log("✅ User deleted successfully");

    menu();
  });
}

function checkAvailability() {
  rl.question("Room Number: ", room => {
    rl.question("Check-in (YYYY-MM-DD): ", from => {
      rl.question("Check-out (YYYY-MM-DD): ", to => {

        let fromDate = new Date(from);
        let toDate = new Date(to);

        let conflict = bookings.find(b => {
          let inDate = new Date(b.checkIn);
          let outDate = new Date(b.checkOut);
          return b.roomNumber === room &&
                 !(toDate < inDate || fromDate > outDate);
        });

        if (conflict)
          console.log(`❌ Room already booked (${conflict.checkIn} → ${conflict.checkOut})`);
        else
          console.log("✅ Room available");

        menu();
      });
    });
  });
}

function bookRoom() {
  rl.question("Booking ID: ", bid => {
    rl.question("User ID: ", userId => {

      if (!users.find(u => u.userId === userId)) {
        console.log("❌ User not registered");
        return menu();
      }

      rl.question("Room Number: ", room => {
        rl.question("Room Type: ", roomType => {
          rl.question("City: ", city => {
            rl.question("Check-in (YYYY-MM-DD): ", from => {
              rl.question("Check-out (YYYY-MM-DD): ", to => {

                let fromDate = new Date(from);
                let toDate = new Date(to);

                let conflict = bookings.some(b => {
                  let inDate = new Date(b.checkIn);
                  let outDate = new Date(b.checkOut);
                  return b.roomNumber === room &&
                         !(toDate < inDate || fromDate > outDate);
                });

                if (conflict) {
                  console.log("❌ Room already booked");
                  return menu();
                }

                bookings.push({
                  bookingId: bid,
                  userId,
                  roomNumber: room,
                  roomType: roomType.toUpperCase(),
                  city: city.toLowerCase(),
                  checkIn: from,
                  checkOut: to
                });

                console.log("✅ Room booked successfully");
                menu();
              });
            });
          });
        });
      });
    });
  });
}

function displayBookings() {
  console.log("\n📋 All Bookings:");
  console.table(bookings);
  menu();
}

menu();
