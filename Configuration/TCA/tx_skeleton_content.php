<?php

return [
  'ctrl' => [
    'iconfile' => 'EXT:skeleton/Resources/Public/Icons/content/content-default.svg',
    'title' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_db.xlf:tx_skeleton_content',
    'label' => 'title',
    'label_alt' => 'image, description, link',
    'sortby' => 'sorting',
    'tstamp' => 'tstamp',
    'crdate' => 'crdate',
    'editlock' => 'editlock',
    'type' => 'uid_foreign:CType',
    'languageField' => 'sys_language_uid',
    'transOrigPointerField' => 'l18n_parent',
    'transOrigDiffSourceField'  => 'l18n_diffsource',
    'prependAtCopy' => 'LLL:EXT:lang/locallang_general.xlf:LGL.prependAtCopy',
    'copyAfterDuplFields' => 'sys_language_uid',
    'useColumnsForDefaultValues' => 'sys_language_uid',
    'searchFields' => 'image, title, description, link',
    'delete' => 'deleted',
    'enablecolumns' => [
      'disabled' => 'hidden'
    ]
  ],
  'interface' => [
    'showRecordFieldList' => 'title, description'
  ],
  'columns' => [
    'uid_foreign' => [
      'config' => [
        'type' => 'select',
        'renderType' => 'selectSingle',
        'foreign_table' => 'tt_content',
        'foreign_table_where' => 'AND {#tt_content}.{#uid}=###REC_FIELD_uid_foreign###',
        'minitems' => 1,
        'maxitems' => 1,
        'size' => 1
      ],
    ],
    'editlock' => [
      'displayCond' => 'HIDE_FOR_NON_ADMINS',
      'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_tca.xlf:editlock',
      'config' => [
        'type' => 'check',
        'renderType' => 'checkboxToggle'
      ]
    ],
    'hidden' => [
      'exclude' => true,
      'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.visible',
      'config' => [
        'type' => 'check',
        'renderType' => 'checkboxToggle',
        'items' => [
          [
            'label' => '',
            'invertStateDisplay' => true
          ]
        ]
      ]
    ],
    'sys_language_uid' => [
      'exclude' => true,
      'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.language',
      'config' => [
        'type' => 'language'
      ]
    ],
    'l18n_parent' => [
      'displayCond' => 'FIELD:sys_language_uid:>:0',
      'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.l18n_parent',
      'config' => [
        'type' => 'select',
        'renderType' => 'selectSingle',
        'items' => [
          ['label' => '', 'value' => 0]
        ],
        'foreign_table' => 'tt_content',
        'foreign_table_where' => 'AND {#tt_content}.{#pid}=###CURRENT_PID### AND {#tt_content}.{#sys_language_uid} IN (-1,0)',
        'default' => 0
      ]
    ],
    'l18n_diffsource' => [
      'config' => [
        'type' => 'passthrough'
      ]
    ],
    'image' => [
      'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.images',
      'config' => [
        'type' => 'file',
        'allowed' => 'common-image-types',
        'appearance' => [
          'createNewRelationLinkTitle' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:images.addFileReference',
          'showPossibleLocalizationRecords' => true,
        ],
        'maxitems' => 1
      ]
    ],
    'title' => [
      'exclude' => 1,
      'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_db.xlf:tx_skeleton_content.title',
      'config' => [
        'type' => 'input',
        'size' => '50',
        'eval' => 'trim'
      ]
    ],
    'description' => [
      'exclude' => 1,
      'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_db.xlf:tx_skeleton_content.description',
      'config' => [
        'type' => 'text',
        'eval' => 'trim',
        'enableRichtext' => true,
        'richtextConfiguration' => 'skeleton'
      ]
    ],
    'link' => [
      'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_db.xlf:tx_skeleton_content.link',
      'config' => [
        'type' => 'link',
        'size' => 50,
        'nullable' => 'true',
        'default' => null
      ]
    ]
  ],
  'types' => [
    '0' => ['showitem' => 'uid_foreign, image, title, description, link'],
    'skeleton_card' => ['showitem' => 'uid_foreign, image, title, description, link'],
    'skeleton_accordion' => ['showitem' => 'uid_foreign, image, title, description, link'],
    'skeleton_footer' => ['showitem' => 'uid_foreign, link'],
  ]
];
