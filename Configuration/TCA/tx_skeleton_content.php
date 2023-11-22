<?php

return [
  'ctrl' => [
    'title' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_db.xlf:tx_skeleton_content',
    'label' => 'title',
    'sortby' => 'sorting',
    'tstamp' => 'tstamp',
    'crdate' => 'crdate',
    'editlock' => 'editlock',
    'languageField' => 'sys_language_uid',
    'transOrigPointerField' => 'l18n_parent',
    'transOrigDiffSourceField'  => 'l18n_diffsource',
    'prependAtCopy' => 'LLL:EXT:lang/locallang_general.xlf:LGL.prependAtCopy',
    'copyAfterDuplFields' => 'sys_language_uid',
    'useColumnsForDefaultValues' => 'sys_language_uid',
    'delete' => 'deleted',
    'enablecolumns' => [
      'disabled' => 'hidden'
    ],
    'iconfile' => 'EXT:skeleton/Resources/Public/Icons/content-menu-card.svg'
  ],
  'interface' => [
    'showRecordFieldList' => 'image, title, description'
  ],
  'columns' => [
    'editlock' => [
      'displayCond' => 'HIDE_FOR_NON_ADMINS',
      'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_tca.xlf:editlock',
      'config' => [
        'type' => 'check',
        'renderType' => 'checkboxToggle',
      ],
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
            'invertStateDisplay' => true,
          ],
        ],
      ],
    ],
    'sys_language_uid' => [
      'exclude' => true,
      'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.language',
      'config' => [
        'type' => 'language',
      ],
    ],
    'l18n_parent' => [
      'displayCond' => 'FIELD:sys_language_uid:>:0',
      'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.l18n_parent',
      'config' => [
        'type' => 'select',
        'renderType' => 'selectSingle',
        'items' => [
          ['label' => '', 'value' => 0],
        ],
        'foreign_table' => 'tt_content',
        'foreign_table_where' => 'AND {#tt_content}.{#pid}=###CURRENT_PID### AND {#tt_content}.{#sys_language_uid} IN (-1,0)',
        'default' => 0,
      ],
    ],
    'l18n_diffsource' => [
      'config' => [
        'type' => 'passthrough',
      ],
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
        'maxitems' => '1',
      ],
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
        'default' => null,
        // 'allowedTypes' => ['page', 'url', 'record'],
        // 'appearance' => [
        //   'enableBrowser' => false,
        //   'browserTitle' => 'Browser title',
        //   'allowedFileExtensions' => ['jpg', 'png', 'pdf'],
        //   'allowedOptions' => ['params', 'rel', 'class', 'target', 'title']
        // ]
      ]
    ]
  ],
  'types' => [
    '0' => ['showitem' => 'image, assets, title, description, link']
  ]
];