# Race Weather Tracker

A full-stack running and obstacle course event tracking application that helps athletes discover races and plan for race-day weather conditions.

## Overview

Race Weather Tracker combines obstacle course racing (OCR) events with thousands of running events across North America. Users can browse events on an interactive map, filter by location and date, view weather forecasts, and contribute their own OCR events to the community database.

## Features

- **User Authentication** - Secure account creation and login with JWT tokens and bcrypt password hashing
- **Interactive Race Map** - Explore hundreds of events displayed on a dynamic Leaflet map
- **Dual Data Sources** - Curated OCR database + RunReg API for running events
- **Weather Integration** - 7-day forecasts from the National Weather Service API
- **Smart Filters** - Filter by race type, state, and date range
- **Create Events** - Add new obstacle course races to the database
- **Real-time Updates** - Map automatically refreshes with new data

## 🛠️ Tech Stack

### PERN Stack
- **PostgreSQL** - Database with PostGIS extension for geospatial data
- **Express.js** - RESTful API with MVC architecture
- **React** - Interactive frontend with Vite
- **Node.js** - Backend runtime environment

### Key Technologies
- **Authentication:** JWT tokens, bcrypt
- **Mapping:** Leaflet, React-Leaflet
- **HTTP Client:** Axios
- **Routing:** React Router
- **Styling:** Inline styles with responsive design

## Database

### PostgreSQL Schema
- **Users Table** - User authentication with hashed passwords
- **Races Table** - Obstacle course race events with geospatial coordinates

Built custom database for OCR tracking since no comprehensive OCR API was available. The database supports full CRUD operations, though only Create is exposed in the UI for data integrity.

## External APIs

### RunReg API
Fetches thousands of upcoming running events, marathons, and races across North America to display alongside OCR events.

### National Weather Service (NWS) API
Provides 7-day weather forecasts based on the latitude/longitude coordinates of each race location.

## CRUD Operations

### Implemented
- **Create** - Add new OCR events via form submission
- **Read** - View all races from database and API
- **Update** - Backend route available (admin use case)
- **Delete** - Backend route available (admin use case)

*Note: Update and Delete routes exist but are not exposed in the UI. Future scaling would implement administrative accounts to utilize these features.*

## Getting Started

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- Git

### Installation

1. Clone the repository
```bash
