CREATE TABLE hotels (
    hotel_id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_name VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255) NOT NULL,
    hotel_location VARCHAR(255) NOT NULL,
    price_start DECIMAL(10, 2) NOT NULL,
    details_url VARCHAR(255)
);

CREATE TABLE hotel_rooms (
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    hotel_id INT,
    room_type VARCHAR(255),
    price_per_night DECIMAL(10, 2),
    FOREIGN KEY (hotel_id) REFERENCES hotels(hotel_id)
);

CREATE TABLE bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_id INT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    nights INT NOT NULL,
    guests INT NOT NULL,
    rooms INT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(20) NOT NULL,
    special_request TEXT,
    total_amount DECIMAL(10, 2) NOT NULL,
    booking_created_at DATETIME NOT NULL,
    booking_updated_at DATETIME NOT NULL,
    FOREIGN KEY (hotel_id) REFERENCES hotels(hotel_id)
);
