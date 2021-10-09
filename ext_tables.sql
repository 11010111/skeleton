#
# Add SQL definition of database tables
#
CREATE TABLE tt_content
(
    container        VARCHAR(30) DEFAULT '' NOT NULL,
    breakpoint       VARCHAR(30) DEFAULT '' NOT NULL,
    padding_top      VARCHAR(30) DEFAULT '' NOT NULL,
    padding_bottom   VARCHAR(30) DEFAULT '' NOT NULL,
    background_color VARCHAR(30) DEFAULT '' NOT NULL,
    foreground_color VARCHAR(30) DEFAULT '' NOT NULL
);
