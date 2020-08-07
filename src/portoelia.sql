CREATE TABLE customers
(
    customer_id INT NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
    customer_gender BOOLEAN,
    customer_firstname VARCHAR
    (100) NOT NULL,
    customer_lastname VARCHAR
    (100) NOT NULL,
    customer_telephone VARCHAR
    (100) NOT NULL,
    customer_email VARCHAR
    (100) NOT NULL,
    customer_comment VARCHAR
    (255)
    customer_privacy BOOLEAN,
);

    CREATE TABLE reservations
    (
        reservation_id INT NOT NULL
        AUTO_INCREMENT PRIMARY KEY,
    reservation_code VARCHAR
        (100) NOT NULL,
    reservation_quantity INT NOT NULL,
    reservation_date VARCHAR
        (100) NOT NULL,
    reservation_time VARCHAR
        (100) NOT NULL,
    customer_id INT,
    FOREIGN KEY
        (customer_id) REFERENCES customers
        (customer_id)
);