#
# Add SQL definition of database tables
#
CREATE TABLE tt_content
(
    container        VARCHAR(30) DEFAULT '' NOT NULL,
    breakpoint       VARCHAR(30) DEFAULT '' NOT NULL,
    alignment        VARCHAR(30) DEFAULT '' NOT NULL,
    mt               VARCHAR(30) DEFAULT '' NOT NULL,
    mb               VARCHAR(30) DEFAULT '' NOT NULL,
    pt               VARCHAR(30) DEFAULT '' NOT NULL,
    pb               VARCHAR(30) DEFAULT '' NOT NULL,
    tablet_bp        VARCHAR(30) DEFAULT '' NOT NULL,
    tablet_mt        VARCHAR(30) DEFAULT '' NOT NULL,
    tablet_mb        VARCHAR(30) DEFAULT '' NOT NULL,
    tablet_pt        VARCHAR(30) DEFAULT '' NOT NULL,
    tablet_pb        VARCHAR(30) DEFAULT '' NOT NULL,
    desktop_bp       VARCHAR(30) DEFAULT '' NOT NULL,
    desktop_mt       VARCHAR(30) DEFAULT '' NOT NULL,
    desktop_mb       VARCHAR(30) DEFAULT '' NOT NULL,
    desktop_pt       VARCHAR(30) DEFAULT '' NOT NULL,
    desktop_pb       VARCHAR(30) DEFAULT '' NOT NULL,
    color            VARCHAR(30) DEFAULT '' NOT NULL,
    background       VARCHAR(30) DEFAULT '' NOT NULL,
    tag              VARCHAR(30) DEFAULT '' NOT NULL
);
