<?php

defined('TYPO3') or die('Access denied.');

\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
    \B13\Container\Tca\Registry::class)->configureContainer(
    new \B13\Container\Tca\ContainerConfiguration(
        'c100',
        '100%',
        '1 Column',
        [
            [
                ['name' => '100%', 'colspan' => 1, 'colPos' => 201]
            ]
        ]
    )
);

\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
    \B13\Container\Tca\Registry::class)->configureContainer(
    new \B13\Container\Tca\ContainerConfiguration(
        'c50-50',
        '50% - 50%',
        '2 Columns',
        [
            [
                ['name' => '50%', 'colspan' => 1, 'colPos' => 201],
                ['name' => '50%', 'colspan' => 1, 'colPos' => 202]
            ]
        ]
    )
);

\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
    \B13\Container\Tca\Registry::class)->configureContainer(
    new \B13\Container\Tca\ContainerConfiguration(
        'c25-75',
        '25% - 75%',
        '2 Columns',
        [
            [
                ['name' => '25%', 'colspan' => 3, 'colPos' => 201],
                ['name' => '75%', 'colspan' => 7, 'colPos' => 202]
            ]
        ]
    )
);

\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
    \B13\Container\Tca\Registry::class)->configureContainer(
    new \B13\Container\Tca\ContainerConfiguration(
        'c75-25',
        '75% - 25%',
        '2 Columns',
        [
            [
                ['name' => '75%', 'colspan' => 7, 'colPos' => 201],
                ['name' => '25%', 'colspan' => 3, 'colPos' => 202]
            ]
        ]
    )
);

\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
    \B13\Container\Tca\Registry::class)->configureContainer(
    new \B13\Container\Tca\ContainerConfiguration(
        'c33-66',
        '33% - 66%',
        '2 Columns',
        [
            [
                ['name' => '33%', 'colspan' => 3, 'colPos' => 201],
                ['name' => '66%', 'colspan' => 6, 'colPos' => 202]
            ]
        ]
    )
);

\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
    \B13\Container\Tca\Registry::class)->configureContainer(
    new \B13\Container\Tca\ContainerConfiguration(
        'c66-33',
        '66% - 33%',
        '2 Columns',
        [
            [
                ['name' => '66%', 'colspan' => 6, 'colPos' => 201],
                ['name' => '33%', 'colspan' => 3, 'colPos' => 202]
            ]
        ]
    )
);

\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
    \B13\Container\Tca\Registry::class)->configureContainer(
    new \B13\Container\Tca\ContainerConfiguration(
        'c33-33-33',
        '33% - 33% - 33%',
        '3 Columns',
        [
            [
                ['name' => '33%', 'colspan' => 1, 'colPos' => 201],
                ['name' => '33%', 'colspan' => 1, 'colPos' => 202],
                ['name' => '33%', 'colspan' => 1, 'colPos' => 203]
            ]
        ]
    )
);

\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
    \B13\Container\Tca\Registry::class)->configureContainer(
    new \B13\Container\Tca\ContainerConfiguration(
        'c20-80',
        '20% - 80%',
        '2 Columns',
        [
            [
                ['name' => '20%', 'colspan' => 2, 'colPos' => 201],
                ['name' => '80%', 'colspan' => 8, 'colPos' => 202]
            ]
        ]
    )
);

\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
    \B13\Container\Tca\Registry::class)->configureContainer(
    new \B13\Container\Tca\ContainerConfiguration(
        'c80-20',
        '80% - 20%',
        '2 Columns',
        [
            [
                ['name' => '80%', 'colspan' => 8, 'colPos' => 201],
                ['name' => '20%', 'colspan' => 2, 'colPos' => 202]
            ]
        ]
    )
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns(
    'tt_content',
    [
        'container' => [
            'exclude' => 1,
            'onChange' => 'reload',
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:container',
            'description' => '',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Content', 'content'],
                    ['Full Width', 'full'],
                    ['Full Width (Padding)', 'full-padding']
                ]
            ]
        ],
        'breakpoint' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:breakpoint',
            'description' => '',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle'
            ]
        ],
        'padding_top' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:padding_top',
            'description' => '',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Default', '']
                ]
            ]
        ],
        'padding_bottom' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:padding_bottom',
            'description' => '',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Default', '']
                ]
            ]
        ],
        'background_color' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:background_color',
            'description' => '',
            'config' => [
                'type' => 'input',
                'renderType' => 'colorpicker',
                'size' => 10,
            ]
        ],
        'foreground_color' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:foreground_color',
            'description' => '',
            'config' => [
                'type' => 'input',
                'renderType' => 'colorpicker',
                'size' => 10,
            ]
        ]
    ]
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes(
    'tt_content',
    'breakpoint, container, padding_top, padding_bottom, background_color, foreground_color',
    'appearance',
    'after:space_after_class'
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToPalette(
    'tt_content',
    'frames',
    'container, --linebreak--, breakpoint, padding_top, padding_bottom, --linebreak--, background_color, foreground_color'
);
