<?php

/**
 * Extension Manager/Repository config file for ext "skeleton".
 */
$EM_CONF[$_EXTKEY] = [
  'title' => 'Skeleton',
  'description' => 'TYPO3 Website Distribution Template',
  'category' => 'templates',
  'constraints' => [
    'depends' => [
      'typo3' => '^12.1',
      'fluid_styled_content' => '^12.1',
      'rte_ckeditor' => '^12.1'
    ],
    'conflicts' => [
    ],
  ],
  'autoload' => [
    'psr-4' => [
      'KSNC\\Skeleton\\' => 'Classes',
    ],
  ],
  'state' => 'stable',
  'uploadfolder' => 0,
  'createDirs' => '',
  'clearCacheOnLoad' => 1,
  'author' => 'Konstantin Schneider',
  'author_email' => 'schneider.konstantin@outlook.com',
  'author_company' => 'Private',
  'version' => '2.0.0',
];
