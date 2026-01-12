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
('AL', 'Albania'), ('AD', 'Andorra'), ('AT', 'Austria'), ('BY', 'Belarus'),
('BE', 'Belgium'), ('BA', 'Bosnia and Herzegovina'), ('BG', 'Bulgaria'), ('HR', 'Croatia'),
('CY', 'Cyprus'), ('CZ', 'Czech Republic'), ('DK', 'Denmark'), ('EE', 'Estonia'),
('FI', 'Finland'), ('FR', 'France'), ('DE', 'Germany'), ('GR', 'Greece'),
('HU', 'Hungary'), ('IS', 'Iceland'), ('IE', 'Ireland'), ('IT', 'Italy'),
('XK', 'Kosovo'), ('LV', 'Latvia'), ('LI', 'Liechtenstein'), ('LT', 'Lithuania'),
('LU', 'Luxembourg'), ('MT', 'Malta'), ('MD', 'Moldova'), ('MC', 'Monaco'),
('ME', 'Montenegro'), ('NL', 'Netherlands'), ('MK', 'North Macedonia'), ('NO', 'Norway'),
('PL', 'Poland'), ('PT', 'Portugal'), ('RO', 'Romania'), ('RU', 'Russia'),
('SM', 'San Marino'), ('RS', 'Serbia'), ('SK', 'Slovakia'), ('SI', 'Slovenia'),
('ES', 'Spain'), ('SE', 'Sweden'), ('CH', 'Switzerland'), ('TR', 'Turkey'),
('UA', 'Ukraine'), ('GB', 'United Kingdom'), ('VA', 'Vatican City')
ON CONFLICT (code) DO NOTHING;

INSERT INTO countries (code, name) VALUES
('AF', 'Afghanistan'), ('AM', 'Armenia'), ('AZ', 'Azerbaijan'), ('BH', 'Bahrain'),
('BD', 'Bangladesh'), ('BT', 'Bhutan'), ('BN', 'Brunei'), ('KH', 'Cambodia'),
('CN', 'China'), ('GE', 'Georgia'), ('HK', 'Hong Kong'), ('IN', 'India'),
('ID', 'Indonesia'), ('IR', 'Iran'), ('IQ', 'Iraq'), ('IL', 'Israel'),
('JP', 'Japan'), ('JO', 'Jordan'), ('KZ', 'Kazakhstan'), ('KW', 'Kuwait'),
('KG', 'Kyrgyzstan'), ('LA', 'Laos'), ('LB', 'Lebanon'), ('MO', 'Macau'),
('MY', 'Malaysia'), ('MV', 'Maldives'), ('MN', 'Mongolia'), ('MM', 'Myanmar'),
('NP', 'Nepal'), ('KP', 'North Korea'), ('OM', 'Oman'), ('PK', 'Pakistan'),
('PS', 'Palestine'), ('PH', 'Philippines'), ('QA', 'Qatar'), ('SA', 'Saudi Arabia'),
('SG', 'Singapore'), ('KR', 'South Korea'), ('LK', 'Sri Lanka'), ('SY', 'Syria'),
('TW', 'Taiwan'), ('TJ', 'Tajikistan'), ('TH', 'Thailand'), ('TL', 'Timor-Leste'),
('TM', 'Turkmenistan'), ('AE', 'United Arab Emirates'), ('UZ', 'Uzbekistan'), ('VN', 'Vietnam'),
('YE', 'Yemen')
ON CONFLICT (code) DO NOTHING;

INSERT INTO countries (code, name) VALUES
('AG', 'Antigua and Barbuda'), ('BS', 'Bahamas'), ('BB', 'Barbados'), ('BZ', 'Belize'),
('CA', 'Canada'), ('CR', 'Costa Rica'), ('CU', 'Cuba'), ('DM', 'Dominica'),
('DO', 'Dominican Republic'), ('SV', 'El Salvador'), ('GD', 'Grenada'), ('GT', 'Guatemala'),
('HT', 'Haiti'), ('HN', 'Honduras'), ('JM', 'Jamaica'), ('MX', 'Mexico'),
('NI', 'Nicaragua'), ('PA', 'Panama'), ('KN', 'Saint Kitts and Nevis'), ('LC', 'Saint Lucia'),
('VC', 'Saint Vincent and the Grenadines'), ('TT', 'Trinidad and Tobago'), ('US', 'United States')
ON CONFLICT (code) DO NOTHING;

INSERT INTO countries (code, name) VALUES
('AR', 'Argentina'), ('BO', 'Bolivia'), ('BR', 'Brazil'), ('CL', 'Chile'),
('CO', 'Colombia'), ('EC', 'Ecuador'), ('GY', 'Guyana'), ('PY', 'Paraguay'),
('PE', 'Peru'), ('SR', 'Suriname'), ('UY', 'Uruguay'), ('VE', 'Venezuela')
ON CONFLICT (code) DO NOTHING;

INSERT INTO countries (code, name) VALUES
('DZ', 'Algeria'), ('AO', 'Angola'), ('BJ', 'Benin'), ('BW', 'Botswana'),
('BF', 'Burkina Faso'), ('BI', 'Burundi'), ('CV', 'Cabo Verde'), ('CM', 'Cameroon'),
('CF', 'Central African Republic'), ('TD', 'Chad'), ('KM', 'Comoros'), ('CD', 'Congo (DRC)'),
('CG', 'Congo (Republic)'), ('CI', 'Cote d''Ivoire'), ('DJ', 'Djibouti'), ('EG', 'Egypt'),
('GQ', 'Equatorial Guinea'), ('ER', 'Eritrea'), ('SZ', 'Eswatini'), ('ET', 'Ethiopia'),
('GA', 'Gabon'), ('GM', 'Gambia'), ('GH', 'Ghana'), ('GN', 'Guinea'),
('GW', 'Guinea-Bissau'), ('KE', 'Kenya'), ('LS', 'Lesotho'), ('LR', 'Liberia'),
('LY', 'Libya'), ('MG', 'Madagascar'), ('MW', 'Malawi'), ('ML', 'Mali'),
('MR', 'Mauritania'), ('MU', 'Mauritius'), ('MA', 'Morocco'), ('MZ', 'Mozambique'),
('NA', 'Namibia'), ('NE', 'Niger'), ('NG', 'Nigeria'), ('RW', 'Rwanda'),
('ST', 'Sao Tome and Principe'), ('SN', 'Senegal'), ('SC', 'Seychelles'), ('SL', 'Sierra Leone'),
('SO', 'Somalia'), ('ZA', 'South Africa'), ('SS', 'South Sudan'), ('SD', 'Sudan'),
('TZ', 'Tanzania'), ('TG', 'Togo'), ('TN', 'Tunisia'), ('UG', 'Uganda'),
('ZM', 'Zambia'), ('ZW', 'Zimbabwe')
ON CONFLICT (code) DO NOTHING;

INSERT INTO countries (code, name) VALUES
('AU', 'Australia'), ('FJ', 'Fiji'), ('KI', 'Kiribati'), ('MH', 'Marshall Islands'),
('FM', 'Micronesia'), ('NR', 'Nauru'), ('NZ', 'New Zealand'), ('PW', 'Palau'),
('PG', 'Papua New Guinea'), ('WS', 'Samoa'), ('SB', 'Solomon Islands'), ('TO', 'Tonga'),
('TV', 'Tuvalu'), ('VU', 'Vanuatu')
ON CONFLICT (code) DO NOTHING;