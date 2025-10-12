CREATE DATABASE weather_app;

CREATE TABLE upcoming_races (
  id SERIAL PRIMARY KEY,
  race_name VARCHAR(255) NOT NULL,
  race_type VARCHAR(100),  -- 'Spartan', 'Tough Mudder', etc.
  race_date DATE NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,  -- e.g., 40.7128
  longitude DECIMAL(11, 8) NOT NULL, -- e.g., -74.0060
  address VARCHAR(500),
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  description TEXT,
  website_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
);