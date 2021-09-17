<?php

defined('TYPO3_MODE') || die();

call_user_func(function () {

    \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
        \B13\Container\Tca\Registry::class)->configureContainer((
            new \B13\Container\Tca\ContainerConfiguration(
                    '50-50',
                    '50-50 Column Container',
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

    TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns(
        'tt_content',
        [
            'frame_class_extra' => [
                'exclude' => 1,
                'label' => 'LLL:EXT:lynx/Resources/Private/Language/locallang_be.xlf:frame.extra',
                'description' => '',
                'config' => [
                    'type' => 'select',
                    'renderType' => 'selectSingle',
                    'items' => [
                        ['Default', ''],
                    ],
                ],
            ],
            'breakpoint' => [
                'exclude' => 1,
                'label' => 'Breakpoint',
                'description' => '',
                'config' => [
                    'type' => 'select',
                    'renderType' => 'selectSingle',
                    'items' => [
                        ['XS', 'xs'],
                        ['SM', 'sm'],
                        ['MD', 'md'],
                        ['LG', 'lg'],
                        ['XL', 'xl'],
                        ['XXL', 'xxl'],
                    ],
                ],
            ]
        ]
    );

    TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes(
        'tt_content',
        'frame_class_extra, breakpoint',
        'appearance',
        'after:space_after_class'
    );

    TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToPalette(
        'tt_content',
        'frames',
        '--linebreak--, frame_class_extra, breakpoint'
    );

});
