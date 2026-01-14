CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    profile_picture VARCHAR(255)
);

CREATE TABLE countries (
    name VARCHAR(100) PRIMARY KEY
);

CREATE TABLE reels (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    country VARCHAR(100) REFERENCES countries(name),
    video_name VARCHAR(255) NOT NULL,
    thumbnail_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Europa
INSERT INTO countries (name) VALUES
('Albania'), ('Andorra'), ('Austria'), ('Belarus'),
('Belgium'), ('Bosnia and Herzegovina'), ('Bulgaria'), ('Croatia'),
('Cyprus'), ('Czech Republic'), ('Denmark'), ('Estonia'),
('Finland'), ('France'), ('Germany'), ('Greece'),
('Hungary'), ('Iceland'), ('Ireland'), ('Italy'),
('Kosovo'), ('Latvia'), ('Liechtenstein'), ('Lithuania'),
('Luxembourg'), ('Malta'), ('Moldova'), ('Monaco'),
('Montenegro'), ('Netherlands'), ('North Macedonia'), ('Norway'),
('Poland'), ('Portugal'), ('Romania'), ('Russia'),
('San Marino'), ('Serbia'), ('Slovakia'), ('Slovenia'),
('Spain'), ('Sweden'), ('Switzerland'), ('Turkey'),
('Ukraine'), ('United Kingdom'), ('Vatican City')
ON CONFLICT (name) DO NOTHING;

-- Azja
INSERT INTO countries (name) VALUES
('Afghanistan'), ('Armenia'), ('Azerbaijan'), ('Bahrain'),
('Bangladesh'), ('Bhutan'), ('Brunei'), ('Cambodia'),
('China'), ('Georgia'), ('India'),
('Indonesia'), ('Iran'), ('Iraq'), ('Israel'),
('Japan'), ('Jordan'), ('Kazakhstan'), ('Kuwait'),
('Kyrgyzstan'), ('Laos'), ('Lebanon'),
('Malaysia'), ('Maldives'), ('Mongolia'), ('Myanmar'),
('Nepal'), ('North Korea'), ('Oman'), ('Pakistan'),
('Palestine'), ('Philippines'), ('Qatar'), ('Saudi Arabia'),
('Singapore'), ('South Korea'), ('Sri Lanka'), ('Syria'),
('Taiwan'), ('Tajikistan'), ('Thailand'), ('Timor-Leste'),
('Turkmenistan'), ('United Arab Emirates'), ('Uzbekistan'), ('Vietnam'),
('Yemen')
ON CONFLICT (name) DO NOTHING;

-- Ameryka Północna i Środkowa
INSERT INTO countries (name) VALUES
('Antigua and Barbuda'), ('Bahamas'), ('Barbados'), ('Belize'),
('Canada'), ('Costa Rica'), ('Cuba'), ('Dominica'),
('Dominican Republic'), ('El Salvador'), ('Grenada'), ('Guatemala'),
('Haiti'), ('Honduras'), ('Jamaica'), ('Mexico'),
('Nicaragua'), ('Panama'), ('Saint Kitts and Nevis'), ('Saint Lucia'),
('Saint Vincent and the Grenadines'), ('Trinidad and Tobago'), ('United States')
ON CONFLICT (name) DO NOTHING;

-- Ameryka Południowa
INSERT INTO countries (name) VALUES
('Argentina'), ('Bolivia'), ('Brazil'), ('Chile'),
('Colombia'), ('Ecuador'), ('Guyana'), ('Paraguay'),
('Peru'), ('Suriname'), ('Uruguay'), ('Venezuela')
ON CONFLICT (name) DO NOTHING;

-- Afryka
INSERT INTO countries (name) VALUES
('Algeria'), ('Angola'), ('Benin'), ('Botswana'),
('Burkina Faso'), ('Burundi'), ('Cabo Verde'), ('Cameroon'),
('Central African Republic'), ('Chad'), ('Comoros'), ('Democratic Republic of the Congo'),
('Republic of Congo'), ('Cote d''Ivoire'), ('Djibouti'), ('Egypt'),
('Equatorial Guinea'), ('Eritrea'), ('Eswatini'), ('Ethiopia'),
('Gabon'), ('Gambia'), ('Ghana'), ('Guinea'),
('Guinea-Bissau'), ('Kenya'), ('Lesotho'), ('Liberia'),
('Libya'), ('Madagascar'), ('Malawi'), ('Mali'),
('Mauritania'), ('Mauritius'), ('Morocco'), ('Mozambique'),
('Namibia'), ('Niger'), ('Nigeria'), ('Rwanda'),
('Sao Tome and Principe'), ('Senegal'), ('Seychelles'), ('Sierra Leone'),
('Somalia'), ('South Africa'), ('South Sudan'), ('Sudan'),
('Tanzania'), ('Togo'), ('Tunisia'), ('Uganda'),
('Zambia'), ('Zimbabwe')
ON CONFLICT (name) DO NOTHING;

-- Oceania
INSERT INTO countries (name) VALUES
('Australia'), ('Fiji'), ('Kiribati'), ('Marshall Islands'),
('Micronesia'), ('Nauru'), ('New Zealand'), ('Palau'),
('Papua New Guinea'), ('Samoa'), ('Solomon Islands'), ('Tonga'),
('Tuvalu'), ('Vanuatu')
ON CONFLICT (name) DO NOTHING;

-- Terytoria i wyspy
INSERT INTO countries (name) VALUES 
('Guadeloupe'),
('Martinique'),
('French Guiana'),
('Reunion'),
('Mayotte'),
('French Southern Territories'),

('Canary Islands'),
('Hawaii'),

('Aruba'),
('Curaçao'),
('Anguilla'),
('Bermuda'),
('Turks and Caicos Islands'),
('Greenland'),
('Western Sahara'),
('Faroe Islands'),
('Guam'),
('Saint-Martin'),
('Northern Mariana Islands'),
('Falkland Islands'),
('Cayman Islands'),
('New Caledonia'),
('Puerto Rico'),
('French Polynesia'),
('Sint Maarten')
ON CONFLICT (name) DO NOTHING;