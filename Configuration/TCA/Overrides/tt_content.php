<?php

defined('TYPO3_MODE') || die();

call_user_func(function () {

    \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
        \B13\Container\Tca\Registry::class)->configureContainer(
        new \B13\Container\Tca\ContainerConfiguration(
            '100',
            '100%',
            '1 Column Container',
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
            '50-50',
            '50% - 50%',
            '2 Columns Container',
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
            '25-75',
            '25% - 75%',
            '2 Columns Container',
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
            '75-25',
            '75% - 25%',
            '2 Columns Container',
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
            '33-66',
            '33% - 66%',
            '2 Columns Container',
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
            '66-33',
            '66% - 33%',
            '2 Columns Container',
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
            '33-33-33',
            '33% - 33% - 33%',
            '3 Columns Container',
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
            '20-80',
            '20% - 80%',
            '2 Columns Container',
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
            '80-20',
            '80% - 20%',
            '2 Columns Container',
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
                        ['Full Width', 'full']
                    ]
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
        'breakpoint, container, padding_top, padding_bottom, background_color, foreground_color',
        'appearance',
        'after:space_after_class'
    );

    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToPalette(
        'tt_content',
        'frames',
        'container, --linebreak--, breakpoint, padding_top, padding_bottom, --linebreak--, background_color, foreground_color'
    );

});
