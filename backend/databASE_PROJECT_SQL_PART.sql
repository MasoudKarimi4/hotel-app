--i deleted booked-rooms and rent-room tables because its redudant

--2A)
--Creating the tables
CREATE TABLE hotel_chain(
	chain_id SERIAL PRIMARY KEY,
	address TEXT,
	email TEXT,
	phone_number TEXT
)

CREATE TABLE hotel(
	hotel_id SERIAL PRIMARY KEY,
	chain_id int, 
	rating  int,
	manager_id int, 
	num_rooms int,
	address TEXT,
	phone_number TEXT
)

CREATE TABLE employee(
	employee_id SERIAL PRIMARY KEY,
	name TEXT,
	sin int,
	hotel_id int REFERENCES hotel(hotel_id)
)



CREATE TABLE room(
	room_id SERIAL PRIMARY KEY,
	hotel_id int REFERENCES hotel(hotel_id),
	room_number int,
	price NUMERIC,
	capacity int,
	view TEXT,
	damages TEXT,
	extendable BOOLEAN
)

CREATE TABLE room_amenities(
	room_amenity_id int REFERENCES room(room_id),
	amenity TEXT
)

CREATE TABLE customer(
	ssn int PRIMARY KEY,
	name TEXT,
	address TEXT,
	email TEXT,
	date_of_registration DATE
)

CREATE TABLE booking(
	booking_id SERIAL PRIMARY KEY,
	customer_id int REFERENCES customer(ssn),
	room_id int REFERENCES room(room_id),
	date_of_booking DATE,
	check_in_date DATE,
	check_out_date DATE
)



CREATE TABLE renting(
	rent_id SERIAL PRIMARY KEY,
	customer_id int REFERENCES customer(ssn),
	employee_id int REFERENCES employee(employee_id),
	room_id int REFERENCES room(room_id),
	start_date DATE,
	end_date DATE
)

CREATE TABLE payment(
	payment_rent_id int REFERENCES renting(rent_id),
	date_of_transaction DATE,
	payment_info TEXT
)


CREATE TABLE booking_archives(
	booking_id SERIAL PRIMARY KEY,
	customer_id int ,
	room_id int ,
	date_of_booking DATE,
	check_in_date DATE,
	check_out_date DATE
)


CREATE TABLE renting_archives(
	rent_id SERIAL PRIMARY KEY,
	customer_id int ,
	employee_id int ,
	room_id int ,
	start_date DATE,
	end_date DATE
)

--add foreign keys for HOTEL
ALTER TABLE hotel 
ADD CONSTRAINT fk_chain_id --first foreign key
FOREIGN KEY (chain_id) REFERENCES hotel_chain(chain_id),
ADD CONSTRAINT fk_manager_id --second fk
FOREIGN KEY (manager_id) REFERENCES employee(employee_id) 

--foreign keys for employee
ALTER TABLE employee 
ADD CONSTRAINT fk_hotel_id
FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id)

--add constraints for room
ALTER TABLE room
ADD CONSTRAINT check_view --make sure view is either sea or mountain
CHECK (view IN ('mountain', 'sea'))

-- added name column to hotel
ALTER TABLE hotel
ADD COLUMN name TEXT;

--added role column to employee
ALTER TABLE employee
ADD COLUMN role TEXT;

--CONSTRAINTS 


ALTER TABLE customer ADD CONSTRAINT unique_customer_email UNIQUE (email);
ALTER TABLE hotel_chain ADD CONSTRAINT unique_chain_email UNIQUE (email);

ALTER TABLE hotel ADD CONSTRAINT check_rating CHECK (rating BETWEEN 1 AND 5);
ALTER TABLE room ADD CONSTRAINT check_price CHECK (price > 0);






--2B)

--inserting into hotelchain

INSERT INTO hotel_chain(address, email, phone_number)
VALUES('17 Terry Fox Drive, Ottawa, Canada', 'chain1@gmail.com', 6135235253);

INSERT INTO hotel_chain(address, email, phone_number)
VALUES('52 Larry Avenue, Washington', 'chain2@gmail.com', 9483726583);

INSERT INTO hotel_chain(address, email, phone_number)
VALUES('123 Blue Street, New York, NY', 'nychain@example.com', '2125550199');

INSERT INTO hotel_chain(address, email, phone_number)
VALUES('456 Green Road, Los Angeles, CA', 'lachain@example.com', '3105550234');

INSERT INTO hotel_chain(address, email, phone_number)
VALUES('789 Yellow Lane, Chicago, IL', 'chichain@example.com', '3125550456');





--inserting into HOTEL-CHAIN 1
-- Hotel 1
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(1, 4, NULL, 50, '100 Main Street, CityA', '123-456-7890');

-- Hotel 2 
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(1, 3, NULL, 30, '102 Main Street, CityA', '123-456-7891');

-- Hotel 3
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(1, 5, NULL, 80, '200 Side Avenue, CityB', '123-456-7892');

-- Hotel 4
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(1, 3, NULL, 40, '300 West Road, CityC', '123-456-7893');

-- Hotel 5
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(1, 4, NULL, 60, '400 East Street, CityD', '123-456-7894');

-- Hotel 6
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(1, 2, NULL, 25, '500 North Avenue, CityE', '123-456-7895');

-- Hotel 7
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(1, 5, NULL, 90, '600 South Road, CityF', '123-456-7896');

-- Hotel 8
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(1, 4, NULL, 70, '700 Central Blvd, CityG', '123-456-7897');

--inserting into HOTEL-CHAIN 2

-- Hotel 1 for Chain 2
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(2, 4, NULL, 55, '101 Park Street, CityH', '223-456-7890');

-- Hotel 2 for Chain 2
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(2, 3, NULL, 35, '103 Park Street, CityH', '223-456-7891');

-- Hotel 3 for Chain 2
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(2, 5, NULL, 85, '201 Lake Avenue, CityI', '223-456-7892');

-- Hotel 4 for Chain 2
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(2, 3, NULL, 45, '301 Hill Road, CityJ', '223-456-7893');

-- Hotel 5 for Chain 2
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(2, 4, NULL, 65, '401 River Street, CityK', '223-456-7894');

-- Hotel 6 for Chain 2
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(2, 2, NULL, 28, '501 Ocean Avenue, CityL', '223-456-7895');

-- Hotel 7 for Chain 2
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(2, 5, NULL, 92, '601 Mountain Road, CityM', '223-456-7896');

-- Hotel 8 for Chain 2
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(2, 4, NULL, 72, '701 Valley Blvd, CityN', '223-456-7897');

--inserting into HOTEL-CHAIN 3

-- Hotel 1 for Chain 3
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(3, 4, NULL, 10, '105 City Street, CityO', '323-456-7890');

-- Hotel 2 for Chain 3
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(3, 3, NULL, 5, '107 City Street, CityO', '323-456-7891');

-- Hotel 3 for Chain 3
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(3, 5, NULL, 7, '203 Avenue Road, CityP', '323-456-7892');

-- Hotel 4 for Chain 3
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(3, 3, NULL, 6, '305 Hill Street, CityQ', '323-456-7893');

-- Hotel 5 for Chain 3
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(3, 4, NULL, 9, '405 River Lane, CityR', '323-456-7894');

-- Hotel 6 for Chain 3
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(3, 2, NULL, 8, '505 Ocean Drive, CityS', '323-456-7895');

-- Hotel 7 for Chain 3
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(3, 5, NULL, 5, '605 Mountain Path, CityT', '323-456-7896');

-- Hotel 8 for Chain 3
INSERT INTO hotel(chain_id, rating, manager_id, num_rooms, address, phone_number)
VALUES(3, 4, NULL, 10, '705 Valley Avenue, CityU', '323-456-7897');

--inserting into HOTEL-CHAIN 4

INSERT INTO hotel(chain_id, name, rating, manager_id, num_rooms, address, phone_number)
VALUES
(4, 'Chain4 Hotel 1', 3, NULL, 6, '102 Broad Street, CityV', '423-456-7890'),
(4, 'Chain4 Hotel 2', 4, NULL, 7, '104 Broad Street, CityV', '423-456-7891'),
(4, 'Chain4 Hotel 3', 2, NULL, 8, '202 Park Avenue, CityW', '423-456-7892'),
(4, 'Chain4 Hotel 4', 5, NULL, 9, '302 Park Avenue, CityW', '423-456-7893'),
(4, 'Chain4 Hotel 5', 3, NULL, 10, '402 Lake Road, CityX', '423-456-7894'),
(4, 'Chain4 Hotel 6', 4, NULL, 5, '502 Lake Road, CityX', '423-456-7895'),
(4, 'Chain4 Hotel 7', 2, NULL, 6, '602 River Street, CityY', '423-456-7896'),
(4, 'Chain4 Hotel 8', 5, NULL, 7, '702 River Street, CityY', '423-456-7897');

--inserting into HOTEL-CHAIN 5

INSERT INTO hotel(chain_id, name, rating, manager_id, num_rooms, address, phone_number)
VALUES
(5, 'Chain5 Hotel 1', 4, NULL, 7, '103 High Street, CityZ', '523-456-7890'),
(5, 'Chain5 Hotel 2', 3, NULL, 8, '105 High Street, CityZ', '523-456-7891'),
(5, 'Chain5 Hotel 3', 5, NULL, 9, '203 Summit Avenue, CityAA', '523-456-7892'),
(5, 'Chain5 Hotel 4', 3, NULL, 10, '303 Summit Avenue, CityAA', '523-456-7893'),
(5, 'Chain5 Hotel 5', 4, NULL, 5, '403 Cliff Road, CityBB', '523-456-7894'),
(5, 'Chain5 Hotel 6', 2, NULL, 6, '503 Cliff Road, CityBB', '523-456-7895'),
(5, 'Chain5 Hotel 7', 5, NULL, 7, '603 Valley Street, CityCC', '523-456-7896'),
(5, 'Chain5 Hotel 8', 3, NULL, 8, '703 Valley Street, CityCC', '523-456-7897');





-- Insert sample employees with valid hotel_id values
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 1', 1001, 1, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 1', 1002, 1, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 1', 1003, 1, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 2', 2001, 2, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 2', 2002, 2, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 2', 2003, 2, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 3', 3001, 3, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 3', 3002, 3, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 3', 3003, 3, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 4', 4001, 4, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 4', 4002, 4, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 4', 4003, 4, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 5', 5001, 5, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 5', 5002, 5, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 5', 5003, 5, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 6', 6001, 6, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 6', 6002, 6, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 6', 6003, 6, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 7', 7001, 7, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 7', 7002, 7, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 7', 7003, 7, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 8', 8001, 8, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 8', 8002, 8, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 8', 8003, 8, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 9', 9001, 9, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 9', 9002, 9, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 9', 9003, 9, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 10', 10001, 10, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 10', 10002, 10, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 10', 10003, 10, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 11', 11001, 11, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 11', 11002, 11, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 11', 11003, 11, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 12', 12001, 12, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 12', 12002, 12, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 12', 12003, 12, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 13', 13001, 13, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 13', 13002, 13, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 13', 13003, 13, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 14', 14001, 14, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 14', 14002, 14, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 14', 14003, 14, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 15', 15001, 15, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 15', 15002, 15, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 15', 15003, 15, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 16', 16001, 16, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 16', 16002, 16, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 16', 16003, 16, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 17', 17001, 17, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 17', 17002, 17, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 17', 17003, 17, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 18', 18001, 18, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 18', 18002, 18, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 18', 18003, 18, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 19', 19001, 19, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 19', 19002, 19, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 19', 19003, 19, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 20', 20001, 20, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 20', 20002, 20, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 20', 20003, 20, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 21', 21001, 21, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 21', 21002, 21, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 21', 21003, 21, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 22', 22001, 22, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 22', 22002, 22, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 22', 22003, 22, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 23', 23001, 23, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 23', 23002, 23, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 23', 23003, 23, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 24', 24001, 24, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 24', 24002, 24, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 24', 24003, 24, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 25', 25001, 25, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 25', 25002, 25, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 25', 25003, 25, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 26', 26001, 26, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 26', 26002, 26, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 26', 26003, 26, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 27', 27001, 27, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 27', 27002, 27, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 27', 27003, 27, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 28', 28001, 28, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 28', 28002, 28, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 28', 28003, 28, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 29', 29001, 29, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 29', 29002, 29, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 29', 29003, 29, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 30', 30001, 30, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 30', 30002, 30, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 30', 30003, 30, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 31', 31001, 31, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 31', 31002, 31, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 31', 31003, 31, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 32', 32001, 32, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 32', 32002, 32, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 32', 32003, 32, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 33', 33001, 33, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 33', 33002, 33, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 33', 33003, 33, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 34', 34001, 34, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 34', 34002, 34, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 34', 34003, 34, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 35', 35001, 35, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 35', 35002, 35, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 35', 35003, 35, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 36', 36001, 36, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 36', 36002, 36, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 36', 36003, 36, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 37', 37001, 37, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 37', 37002, 37, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 37', 37003, 37, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 38', 38001, 38, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 38', 38002, 38, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 38', 38003, 38, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 39', 39001, 39, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 39', 39002, 39, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 39', 39003, 39, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Manager Hotel 40', 40001, 40, 'Manager');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1A Hotel 40', 40002, 40, 'Regular');
INSERT INTO employee(name, sin, hotel_id, role) VALUES ('Employee 1B Hotel 40', 40003, 40, 'Regular');

--insert respective managers into hotel 
UPDATE hotel SET manager_id = 1 WHERE hotel_id = 1;
UPDATE hotel SET manager_id = 4 WHERE hotel_id = 2;
UPDATE hotel SET manager_id = 7 WHERE hotel_id = 3;
UPDATE hotel SET manager_id = 10 WHERE hotel_id = 4;
UPDATE hotel SET manager_id = 13 WHERE hotel_id = 5;
UPDATE hotel SET manager_id = 16 WHERE hotel_id = 6;
UPDATE hotel SET manager_id = 19 WHERE hotel_id = 7;
UPDATE hotel SET manager_id = 22 WHERE hotel_id = 8;
UPDATE hotel SET manager_id = 25 WHERE hotel_id = 9;
UPDATE hotel SET manager_id = 28 WHERE hotel_id = 10;
UPDATE hotel SET manager_id = 31 WHERE hotel_id = 11;
UPDATE hotel SET manager_id = 34 WHERE hotel_id = 12;
UPDATE hotel SET manager_id = 37 WHERE hotel_id = 13;
UPDATE hotel SET manager_id = 40 WHERE hotel_id = 14;
UPDATE hotel SET manager_id = 43 WHERE hotel_id = 15;
UPDATE hotel SET manager_id = 46 WHERE hotel_id = 16;
UPDATE hotel SET manager_id = 49 WHERE hotel_id = 17;
UPDATE hotel SET manager_id = 52 WHERE hotel_id = 18;
UPDATE hotel SET manager_id = 55 WHERE hotel_id = 19;
UPDATE hotel SET manager_id = 58 WHERE hotel_id = 20;
UPDATE hotel SET manager_id = 61 WHERE hotel_id = 21;
UPDATE hotel SET manager_id = 64 WHERE hotel_id = 22;
UPDATE hotel SET manager_id = 67 WHERE hotel_id = 23;
UPDATE hotel SET manager_id = 70 WHERE hotel_id = 24;
UPDATE hotel SET manager_id = 73 WHERE hotel_id = 25;
UPDATE hotel SET manager_id = 76 WHERE hotel_id = 26;
UPDATE hotel SET manager_id = 79 WHERE hotel_id = 27;
UPDATE hotel SET manager_id = 82 WHERE hotel_id = 28;
UPDATE hotel SET manager_id = 85 WHERE hotel_id = 29;
UPDATE hotel SET manager_id = 88 WHERE hotel_id = 30;
UPDATE hotel SET manager_id = 91 WHERE hotel_id = 31;
UPDATE hotel SET manager_id = 94 WHERE hotel_id = 32;
UPDATE hotel SET manager_id = 97 WHERE hotel_id = 33;
UPDATE hotel SET manager_id = 100 WHERE hotel_id = 34;
UPDATE hotel SET manager_id = 103 WHERE hotel_id = 35;
UPDATE hotel SET manager_id = 106 WHERE hotel_id = 36;
UPDATE hotel SET manager_id = 109 WHERE hotel_id = 37;
UPDATE hotel SET manager_id = 112 WHERE hotel_id = 38;
UPDATE hotel SET manager_id = 115 WHERE hotel_id = 39;
UPDATE hotel SET manager_id = 118 WHERE hotel_id = 40;

-- adding three rooms per hotel. 
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (1, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (1, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (1, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (2, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (2, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (2, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (3, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (3, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (3, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (4, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (4, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (4, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (5, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (5, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (5, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (6, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (6, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (6, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (7, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (7, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (7, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (8, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (8, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (8, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (9, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (9, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (9, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (10, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (10, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (10, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (11, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (11, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (11, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (12, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (12, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (12, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (13, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (13, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (13, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (14, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (14, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (14, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (15, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (15, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (15, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (16, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (16, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (16, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (17, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (17, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (17, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (18, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (18, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (18, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (19, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (19, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (19, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (20, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (20, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (20, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (21, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (21, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (21, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (22, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (22, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (22, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (23, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (23, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (23, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (24, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (24, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (24, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (25, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (25, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (25, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (26, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (26, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (26, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (27, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (27, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (27, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (28, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (28, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (28, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (29, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (29, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (29, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (30, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (30, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (30, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (31, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (31, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (31, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (32, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (32, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (32, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (33, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (33, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (33, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (34, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (34, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (34, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (35, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (35, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (35, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (36, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (36, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (36, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (37, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (37, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (37, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (38, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (38, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (38, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (39, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (39, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (39, 3, 350, 4, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (40, 1, 150, 2, 'sea', NULL, FALSE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (40, 2, 250, 3, 'mountain', NULL, TRUE);
INSERT INTO room(hotel_id, room_number, price, capacity, view, damages, extendable) VALUES (40, 3, 350, 4, 'sea', NULL, FALSE);

--adding customers

INSERT INTO customer(ssn, name, address, email, date_of_registration)
VALUES
(10001, 'Alice Johnson', '123 Apple St, Newtown', 'alice.j@example.com', '2021-01-10'),
(10002, 'Bob Smith', '456 Orange Ave, Oldtown', 'bob.s@example.com', '2021-02-15'),
(10003, 'Carol White', '789 Banana Blvd, Westcity', 'carol.w@example.com', '2021-03-20'),
(10004, 'David Brown', '321 Grape Lane, Eastville', 'david.b@example.com', '2021-04-25'),
(10005, 'Eve Davis', '654 Lemon Road, Southtown', 'eve.d@example.com', '2021-05-30');

--adding bookings

INSERT INTO booking(customer_id, room_id, date_of_booking, check_in_date, check_out_date)
VALUES
(10001, 1, '2022-07-01', '2022-07-10', '2022-07-15'),
(10002, 4, '2022-07-05', '2022-07-12', '2022-07-17'),
(10003, 7, '2022-07-08', '2022-07-14', '2022-07-20');

INSERT INTO booking(customer_id, room_id, date_of_booking, check_in_date, check_out_date)
VALUES
(10004, 10, '2025-07-01', '2025-07-10', '2025-07-15');

--adding rentings

INSERT INTO renting(customer_id, employee_id, room_id, start_date, end_date)
VALUES
(10004, 1, 2, '2022-07-02', '2022-07-06'),
(10005, 2, 5, '2022-07-04', '2022-07-10'),
(10001, 3, 8, '2022-07-07', '2022-07-12');

--inserting payments 

INSERT INTO payment(payment_rent_id, date_of_transaction, payment_info)
VALUES
(1, '2022-07-06', 'Credit Card'),
(2, '2022-07-10', 'Debit Card'),
(3, '2022-07-12', 'Online Payment');

--adding room amenities
INSERT INTO room_amenities(room_amenity_id, amenity)
VALUES
(1, 'Free Wi-Fi'),
(2, 'Air Conditioning'),
(3, 'Mini Bar'),
(4, 'Ocean View'),
(5, 'Room Service'),
(6, 'Flat Screen TV'),
(7, 'Coffee Maker'),
(8, 'In-room Safe'),
(9, 'Daily Housekeeping'),
(10, 'Luxury Toiletries');


--2C)
--QUERIES 

--first query i did was to calculate the number rooms each hotel has. This query uses aggregation . 
SELECT hotel.hotel_id, hotel.name, COUNT(room.room_id) AS total_rooms
FROM room
INNER JOIN hotel ON room.hotel_id = hotel.hotel_id
GROUP BY hotel.hotel_id, hotel.name
ORDER BY hotel.hotel_id;

--Second query I did was to calculate the number of hotels in each hotel chain. This query uses aggreation. 
SELECT chain_id,COUNT(hotel_id) AS total_hotels
FROM hotel
GROUP BY chain_id
ORDER BY chain_id

--Third query IS TO  Find Hotels Without Any Bookings for a Given Time Period. it uses a nested query. 

SELECT hotel.hotel_id,hotel.name 
FROM hotel
WHERE NOT EXISTS(
	SELECT 1
	FROM booking
	JOIN room ON booking.room_id = room.room_id
	WHERE room.hotel_id = hotel.hotel_id
	AND check_in_date BETWEEN '2025-07-10' AND '2025-07-16'
)

--Fourth Query is to find all the rooms that have no damages
SELECT room_id
FROM room
WHERE damages IS NOT NULL

--5TH QUERY IS TO FIND ALL THE MANAGERS OF A HOTEL CHAIN
SELECT hotel.manager_id,employee.name
FROM employee
JOIN hotel ON employee.employee_id = hotel.manager_id

--2D)

--Creating my first trigger where each time a booking is created, its added in the archive 

CREATE OR REPLACE FUNCTION archive_booking()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO booking_archives (booking_id, customer_id, room_id, date_of_booking, check_in_date, check_out_date)
    VALUES (NEW.booking_id, NEW.customer_id, NEW.room_id, NEW.date_of_booking, NEW.check_in_date, NEW.check_out_date);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_after_booking_insert
AFTER INSERT ON booking
FOR EACH ROW
EXECUTE FUNCTION archive_booking();



--Creating my second trigger where each time a renting is created, its added in the archive 
CREATE OR REPLACE FUNCTION archive_renting()
RETURNs TRIGGER AS $$
BEGIN
	INSERT INTO renting_archives(rent_id,customer_id,employee_id,room_id,start_date,end_date)
	VALUES(NEW.rent_id,NEW.customer_id,NEW.employee_id,new.room_id,NEW.start_date,NEW.end_date);
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_after_renting_insert
AFTER INSERT ON renting
FOR EACH ROW
EXECUTE FUNCTION archive_renting();

INSERT INTO renting(customer_id, employee_id, room_id, start_date, end_date)
VALUES(10002, 5, 10, '2027-07-07', '2027-07-12');

--THIRD TRIGGER TO ADD A RANDOM MANAGER TO A NEWLY ADDED HOTEL.
CREATE OR REPLACE FUNCTION assign_manager_to_new_hotel()
RETURNS TRIGGER AS $$
DECLARE
    manager_id int;
BEGIN
    -- Select an eligible employee to be the manager
    SELECT employee_id INTO manager_id FROM employee
    WHERE role = 'Manager' AND hotel_id IS NULL
    LIMIT 1;

    -- Assign the manager to the new hotel
    IF FOUND THEN
        UPDATE hotel SET manager_id = manager_id WHERE hotel_id = NEW.hotel_id;
    ELSE
        RAISE NOTICE 'No available managers to assign.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_assign_manager
AFTER INSERT ON hotel
FOR EACH ROW
EXECUTE FUNCTION assign_manager_to_new_hotel();


--FOURTH TRIGGER SO THAT THE END DATE IS BEFORE START DATE

CREATE OR REPLACE FUNCTION validate_booking_dates()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if check-out date is after check-in date
    IF NEW.check_out_date <= NEW.check_in_date THEN
        RAISE EXCEPTION 'Check-out date must be after check-in date.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_validate_dates
BEFORE INSERT OR UPDATE ON booking
FOR EACH ROW
EXECUTE FUNCTION validate_booking_dates();

--PROCEDURE TO TRNASFORM BOOKING TO RENTING AND THEN DELETING THE RESPECTIVE BOOKING
CREATE OR REPLACE PROCEDURE transform_booking_to_renting(booking_id_param int)
LANGUAGE plpgsql AS $$
DECLARE
    v_customer_id int;
    v_room_id int;
    v_start_date DATE;
    v_end_date DATE;
    v_employee_id int; -- Assuming this is provided or determined by some logic
BEGIN
    -- Retrieve booking information
    SELECT customer_id, room_id, check_in_date, check_out_date INTO v_customer_id, v_room_id, v_start_date, v_end_date
    FROM booking
    WHERE booking_id = booking_id_param;

    -- Insert a new record into the renting table
    INSERT INTO renting (customer_id, room_id, start_date, end_date, employee_id)
    VALUES (v_customer_id, v_room_id, v_start_date, v_end_date, v_employee_id);

    -- Delete the booking record after transferring to renting
    DELETE FROM booking WHERE booking_id = booking_id_param;
END;
$$;
--2E)

--CREATING INDEX : 
-- I WILL PROBABLY QUERY THE ROOM A LOT IN BOOKINGS, TO CHECK INFORMATIN ABOUT THE ROOM . IF IT IS BOOKED OR NOT. OR OTHER INFO RELATED
CREATE INDEX idx_booking_room_id ON booking(room_id); 

-- I WILL NEED QUERIES ON ROOMS IN SPECIFIC HOTELS. EXAMPLE , COUNTING ROOMS PER HOTEL , OR ROOMS WITHOUT DAMAGES, ETC...
CREATE INDEX idx_room_hotel_id ON room(hotel_id);

--I WILL NEED TO QUERY THE PRICES A LOT SINCE CUSTOMER WILL PRIMARLY SEARCH HOTEL ON PRICES. 
CREATE INDEX idx_room_price ON room(price);
-- I WILL NEED TO CHECK THE CHECKING DATES AND CHECKOUTS DATES FOR ROOM AVAILABLITY A LOT 

CREATE INDEX idx_booking_check_in_date ON booking(check_in_date);
CREATE INDEX idx_booking_check_out_date ON booking(check_out_date);

-- WILL NEED TO QUERY EMPLOYEES A LOT FOR MANAGER PURPOSES AND DUE TO THE FACT THYRE LINKED TO RENTING AND BOOKINGS 
CREATE INDEX idx_employee_employee_id ON employee(employee_id);


--2F)
--VIEWS 

--view 1 . I assume area is the hotel 

CREATE VIEW available_rooms_per_hotel AS
SELECT h.hotel_id, h.name AS hotel_name, COUNT(r.room_id) AS available_rooms
FROM hotel h
JOIN room r ON h.hotel_id = r.hotel_id
LEFT JOIN booking b ON r.room_id = b.room_id
LEFT JOIN renting re ON r.room_id = re.room_id
WHERE b.booking_id IS NULL AND re.rent_id IS NULL
GROUP BY h.hotel_id, h.name;

--view 2.

CREATE VIEW total_room_capacity_per_hotel AS
SELECT h.hotel_id, h.name AS hotel_name, SUM(r.capacity) AS total_capacity
FROM hotel h
JOIN room r ON h.hotel_id = r.hotel_id
GROUP BY h.hotel_id, h.name;





SELECT * FROM available_rooms_per_hotel;
-- To see available rooms per area
SELECT * FROM available_rooms_per_area;

-- To see total room capacity per hotel
SELECT * FROM total_room_capacity_per_hotel;

select * from employee
select * from hotel
select * from hotel_chain
select * from room
select * from booking
select * from booking_archives
select * from renting
select * from customer
select * from renting_archives
