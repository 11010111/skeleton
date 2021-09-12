<?php

/**
 * Extension Manager/Repository config file for ext "skeleton".
 */
$EM_CONF[$_EXTKEY] = [
    'title' => 'Skeleton',
    'description' => 'Website Template Skeleton',
    'category' => 'templates',
    'constraints' => [
        'depends' => [
            'typo3' => '10.2.0-11.9.99',
            'fluid_styled_content' => '10.2.0-11.9.99',
            'rte_ckeditor' => '10.2.0-11.9.99',
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
    'version' => '1.0.0',
];
