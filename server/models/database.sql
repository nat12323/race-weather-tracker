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


-- Alter table to optimize for PostGIS Capabilities
ALTER TABLE upcoming_races 
ADD COLUMN geom GEOMETRY(Point, 4326);

UPDATE upcoming_races 
SET geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326);

CREATE INDEX idx_races_geom ON upcoming_races USING GIST(geom);


-- User table for user authentication
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);