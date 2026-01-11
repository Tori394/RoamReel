CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    enabled BOOLEAN DEFAULT TRUE
);

CREATE TABLE reels (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    country VARCHAR(5),
    video_name VARCHAR(255) NOT NULL,
    thumbnail_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);