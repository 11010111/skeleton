<?php

/**
 * Extension Manager/Repository config file for ext "skeleton".
 */
$EM_CONF[$_EXTKEY] = [
    'title' => 'Skeleton',
    'description' => 'Website Distribution',
    'category' => 'templates',
    'constraints' => [
        'depends' => [
            'typo3' => '^11.5',
            'fluid_styled_content' => '^11.5',
            'rte_ckeditor' => '^11.5'
        ],
        'conflicts' => [
        ],
    ],
    'autoload' => [
        'psr-4' => [
            'Vendor\\Skeleton\\' => 'Classes',
        ],
    ],
    'state' => 'stable',
    'uploadfolder' => 0,
    'createDirs' => '',
    'clearCacheOnLoad' => 1,
    'author' => 'Konstantin Schneider',
    'author_email' => 'schneider.konstantin@outlook.com',
    'author_company' => '',
    'version' => '1.0.12',
];
