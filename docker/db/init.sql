CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    profile_picture VARCHAR(255)
);

CREATE TABLE countries (
    code VARCHAR(5) PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE reels (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    country_code VARCHAR(5) REFERENCES countries(code),
    video_name VARCHAR(255) NOT NULL,
    thumbnail_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO countries (code, name) VALUES
('AL', 'Albania'),
('AD', 'Andorra'),
('AT', 'Austria'),
('BY', 'Belarus'),
('BE', 'Belgium'),
('BA', 'Bosnia and Herzegovina'),
('BG', 'Bulgaria'),
('HR', 'Croatia'),
('CY', 'Cyprus'),
('CZ', 'Czech Republic'),
('DK', 'Denmark'),
('EE', 'Estonia'),
('FI', 'Finland'),
('FR', 'France'),
('DE', 'Germany'),
('GR', 'Greece'),
('HU', 'Hungary'),
('IS', 'Iceland'),
('IE', 'Ireland'),
('IT', 'Italy'),
('XK', 'Kosovo'),
('LV', 'Latvia'),
('LI', 'Liechtenstein'),
('LT', 'Lithuania'),
('LU', 'Luxembourg'),
('MT', 'Malta'),
('MD', 'Moldova'),
('MC', 'Monaco'),
('ME', 'Montenegro'),
('NL', 'Netherlands'),
('MK', 'North Macedonia'),
('NO', 'Norway'),
('PL', 'Poland'),
('PT', 'Portugal'),
('RO', 'Romania'),
('RU', 'Russia'),
('SM', 'San Marino'),
('RS', 'Serbia'),
('SK', 'Slovakia'),
('SI', 'Slovenia'),
('ES', 'Spain'),
('SE', 'Sweden'),
('CH', 'Switzerland'),
('TR', 'Turkey'),
('UA', 'Ukraine'),
('GB', 'United Kingdom'),
('VA', 'Vatican City')
ON CONFLICT (code) DO NOTHING;