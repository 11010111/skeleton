#
# Add SQL definition of database tables
#
CREATE TABLE tt_content
(
  container           VARCHAR(30) DEFAULT '' NOT NULL,
  breakpoint          VARCHAR(30) DEFAULT '' NOT NULL,
  alignment           VARCHAR(30) DEFAULT '' NOT NULL,
  mt                  VARCHAR(30) DEFAULT '' NOT NULL,
  mb                  VARCHAR(30) DEFAULT '' NOT NULL,
  pt                  VARCHAR(30) DEFAULT '' NOT NULL,
  pb                  VARCHAR(30) DEFAULT '' NOT NULL,
  tablet_bp           VARCHAR(30) DEFAULT '' NOT NULL,
  tablet_mt           VARCHAR(30) DEFAULT '' NOT NULL,
  tablet_mb           VARCHAR(30) DEFAULT '' NOT NULL,
  tablet_pt           VARCHAR(30) DEFAULT '' NOT NULL,
  tablet_pb           VARCHAR(30) DEFAULT '' NOT NULL,
  desktop_bp          VARCHAR(30) DEFAULT '' NOT NULL,
  desktop_mt          VARCHAR(30) DEFAULT '' NOT NULL,
  desktop_mb          VARCHAR(30) DEFAULT '' NOT NULL,
  desktop_pt          VARCHAR(30) DEFAULT '' NOT NULL,
  desktop_pb          VARCHAR(30) DEFAULT '' NOT NULL,
  color               VARCHAR(30) DEFAULT '' NOT NULL,
  background          VARCHAR(30) DEFAULT '' NOT NULL,
  tag                 VARCHAR(30) DEFAULT '' NOT NULL,
  rte_width           VARCHAR(30) DEFAULT '' NOT NULL,
  tx_skeleton_content INT(11)     DEFAULT 0  NOT NULL
);

CREATE TABLE tx_skeleton_content
(
  uid              INT(11) unsigned    DEFAULT 0  NOT NULL auto_increment,
  pid              INT(11)             DEFAULT 0  NOT NULL,

  uid_foreign      INT(11) unsigned    DEFAULT 0  NOT NULL,
  sorting          INT(11) unsigned    DEFAULT 0  NOT NULL,
  sorting_foreign  INT(11) unsigned    DEFAULT 0  NOT NULL,

  image            INT(11)             DEFAULT 0  NOT NULL,
  title            VARCHAR(255)        DEFAULT '' NOT NULL,
  description      TEXT                               NULL,
  link             TEXT                               NULL,

  tstamp           INT(11) unsigned    DEFAULT 0  NOT NULL,
  crdate           INT(11) unsigned    DEFAULT 0  NOT NULL,
  deleted          TINYINT(4) unsigned DEFAULT 0  NOT NULL,
  hidden           TINYINT(4) unsigned DEFAULT 0  NOT NULL,
  sys_language_uid INT(11)             DEFAULT 0  NOT NULL,
  l18n_parent      INT(11)             DEFAULT 0  NOT NULL,
  l18n_diffsource  MEDIUMBLOB          DEFAULT '' NOT NULL,
  access_group     INT(11)             DEFAULT 0  NOT NULL,

  PRIMARY KEY (uid),
  KEY parent (pid)
);
