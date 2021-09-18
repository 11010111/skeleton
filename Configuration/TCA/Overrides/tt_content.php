<?php

defined('TYPO3_MODE') || die();

call_user_func(function () {

    \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
        \B13\Container\Tca\Registry::class)->configureContainer((
            new \B13\Container\Tca\ContainerConfiguration(
                    '100',
                    '100',
                    'Insert an element with full width of content',
                    [
                        [
                            ['name' => '100%', 'colPos' => 201]
                        ]
                    ]
                )
            )
    );

    \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
        \B13\Container\Tca\Registry::class)->configureContainer((
            new \B13\Container\Tca\ContainerConfiguration(
                    '50-50',
                    '50-50',
                    'Insert an element dividing the content area into two columns',
                    [
                        [
                            ['name' => '50% Left', 'colPos' => 201],
                            ['name' => '50% Right', 'colPos' => 202]
                        ]
                    ]
                )
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
            'color_picker' => [
                'exclude' => 1,
                'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:color_picker',
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
        'container, breakpoint, color_picker',
        'appearance',
        'after:space_after_class'
    );

    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToPalette(
        'tt_content',
        'frames',
        '--linebreak--, container, breakpoint, --linebreak--, color_picker'
    );

});
