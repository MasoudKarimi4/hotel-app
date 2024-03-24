CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);




/*THINGS TO ADD

Constraints for ROOM:
	- view (we should only be able to put mountain or sea or city)
	- damages 

constraints for room_amenities
	- amenity (we should have a list of the possible words(amenities) that it can take)

constraints for PAYMENT
	- maybe for payment_info 

*/

CREATE TABLE hotel_chain(
	chain_id SERIAL PRIMARY KEY,
	num_hotels int,
	address VARCHAR(30),
	email VARCHAR(30),
	phone_number int
)

CREATE TABLE hotel(
	hotel_id SERIAL PRIMARY KEY,
	chain_id int, 
	rating  int,
	manager_id int, 
	num_rooms int,
	address VARCHAR(30),
	phone_number int
)

CREATE TABLE employee(
	employee_id SERIAL PRIMARY KEY,
	name VARCHAR(30),
	sin int,
	hotel_id int REFERENCES hotel(hotel_id)
)

CREATE TABLE room(
	room_id SERIAL PRIMARY KEY,
	room_number int,
	price NUMERIC(10, 2),
	capacity int,
	view VARCHAR(20),
	damages VARCHAR (50),
	extendable BOOLEAN
)

CREATE TABLE room_amenities(
	room_amenity_id int REFERENCES room(room_id),
	amenity VARCHAR(20)
)

CREATE TABLE customer(
	ssn SERIAL PRIMARY KEY,
	name VARCHAR(30),
	address VARCHAR(50),
	email VARCHAR(40),
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

CREATE TABLE booked_rooms(
	booking_id int REFERENCES booking(booking_id),
	room_id int REFERENCES room(room_id) 
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
	payment_id int REFERENCES renting(rent_id),
	date_of_transaction DATE,
	payment_info VARCHAR(50)
)

CREATE TABLE rent_room(
	rent_id int REFERENCES renting(rent_id),
	room_id
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

