<?php

defined('TYPO3_MODE') || die();

call_user_func(function () {

    \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
        \B13\Container\Tca\Registry::class)->configureContainer(
        new \B13\Container\Tca\ContainerConfiguration(
            '100',
            '100% Container',
            '1 Column',
            [
                [
                    ['name' => '100%', 'colPos' => 201]
                ]
            ]
        )
    );

    \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
        \B13\Container\Tca\Registry::class)->configureContainer(
        new \B13\Container\Tca\ContainerConfiguration(
            '50-50',
            '50% - 50% Container',
            '2 Columns',
            [
                [
                    ['name' => '50%', 'colPos' => 201],
                    ['name' => '50%', 'colPos' => 202]
                ]
            ]
        )
    );

    \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
        \B13\Container\Tca\Registry::class)->configureContainer(
        new \B13\Container\Tca\ContainerConfiguration(
            '25-75',
            '25% - 75% Container',
            '2 Columns',
            [
                [
                    ['name' => '25%', 'colPos' => 201],
                    ['name' => '75%', 'colPos' => 202]
                ]
            ]
        )
    );

    \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
        \B13\Container\Tca\Registry::class)->configureContainer(
        new \B13\Container\Tca\ContainerConfiguration(
            '75-25',
            '75% - 25% Container',
            '2 Columns',
            [
                [
                    ['name' => '75%', 'colPos' => 201],
                    ['name' => '25%', 'colPos' => 202]
                ]
            ]
        )
    );

    \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
        \B13\Container\Tca\Registry::class)->configureContainer(
        new \B13\Container\Tca\ContainerConfiguration(
            '33-66',
            '33% - 66% Container',
            '2 Columns',
            [
                [
                    ['name' => '33%', 'colPos' => 201],
                    ['name' => '66%', 'colPos' => 202]
                ]
            ]
        )
    );

    \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
        \B13\Container\Tca\Registry::class)->configureContainer(
        new \B13\Container\Tca\ContainerConfiguration(
            '66-33',
            '66% - 33%',
            '2 Columns',
            [
                [
                    ['name' => '66%', 'colPos' => 201],
                    ['name' => '33%', 'colPos' => 202]
                ]
            ]
        )
    );

    \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
        \B13\Container\Tca\Registry::class)->configureContainer(
        new \B13\Container\Tca\ContainerConfiguration(
            '33-33-33',
            '33% - 33% - 33% Container',
            '3 Columns',
            [
                [
                    ['name' => '33%', 'colPos' => 201],
                    ['name' => '33%', 'colPos' => 202],
                    ['name' => '33%', 'colPos' => 203]
                ]
            ]
        )
    );

    \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
        \B13\Container\Tca\Registry::class)->configureContainer(
        new \B13\Container\Tca\ContainerConfiguration(
            '20-80',
            '20% -80% Container',
            '2 Columns',
            [
                [
                    ['name' => '20%', 'colPos' => 201],
                    ['name' => '80%', 'colPos' => 202]
                ]
            ]
        )
    );

    \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
        \B13\Container\Tca\Registry::class)->configureContainer(
        new \B13\Container\Tca\ContainerConfiguration(
            '80-20',
            '80% - 20%',
            '2 Columns',
            [
                [
                    ['name' => '80%', 'colPos' => 201],
                    ['name' => '20%', 'colPos' => 202]
                ]
            ]
        )
    );

    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns(
        'tt_content',
        [
            'container' => [
                'exclude' => 1,
                'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:container',
                'description' => '',
                'config' => [
                    'type' => 'select',
                    'renderType' => 'selectSingle',
                    'items' => [
                        ['Content', 'content'],
                        ['Full Width', 'full']
                    ],
                ],
                'displayCond' => [
                    'OR' => [
                        'FIELD:CType:=:100',
                        'FIELD:CType:=:50-50',
                        'FIELD:CType:=:25-75',
                        'FIELD:CType:=:75-25',
                        'FIELD:CType:=:33-66',
                        'FIELD:CType:=:66-33',
                        'FIELD:CType:=:33-33-33',
                        'FIELD:CType:=:20-80',
                        'FIELD:CType:=:80-20'
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
                ],
                'displayCond' => [
                    'OR' => [
                        'FIELD:CType:=:50-50',
                        'FIELD:CType:=:25-75',
                        'FIELD:CType:=:75-25',
                        'FIELD:CType:=:33-66',
                        'FIELD:CType:=:66-33',
                        'FIELD:CType:=:33-33-33',
                        'FIELD:CType:=:20-80',
                        'FIELD:CType:=:80-20'
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
                ],
                'displayCond' => [
                    'AND' => [
                        'FIELD:container:=:full'
                    ]
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
                ],
                'displayCond' => [
                    'AND' => [
                        'FIELD:container:=:full'
                    ]
                ]
            ]
        ]
    );

    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes(
        'tt_content',
        'container, breakpoint, background_color, foreground_color',
        'appearance',
        'after:space_after_class'
    );

    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToPalette(
        'tt_content',
        'frames',
        '--linebreak--, container, breakpoint, --linebreak--, background_color, foreground_color'
    );

});
