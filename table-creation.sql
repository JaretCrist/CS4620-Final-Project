CREATE TABLE sources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    publisher TEXT,
    date TEXT,
    photo_url TEXT
);

CREATE TABLE spells (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    source INTEGER,
    school TEXT,
    casting_time TEXT,
    range TEXT,
    components TEXT,
    duration TEXT,
    description TEXT,
    classes TEXT,
    FOREIGN KEY (source) REFERENCES sources(id)
);

CREATE TABLE monsters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    actions TEXT,
    ac TEXT,
    hp TEXT,
    spd TEXT,
    str TEXT,
    dex TEXT,
    con TEXT,
    int TEXT,
    wis TEXT,
    cha TEXT,
    extras TEXT,
    senses TEXT,
    languages TEXT,
    cr TEXT,
    source INTEGER,
    image TEXT,
    FOREIGN KEY (source) REFERENCES sources(id)
);

CREATE TABLE items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    source INTEGER,
    type TEXT,
    description TEXT,
    FOREIGN KEY (source) REFERENCES sources(id)
);

CREATE TABLE races (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    parent TEXT,
    source INTEGER,
    details TEXT,
    FOREIGN KEY (source) REFERENCES sources(id)
);
