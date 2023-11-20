<?php

defined('TYPO3') or die('Access denied.');


\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns(
    'tt_content',
    [
        'container' => [
            'exclude' => 1,
            'onChange' => 'reload',
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:container',
            'description' => 'Container',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Default', '']
                ]
            ]
        ],
        'breakpoint' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:breakpoint',
            'description' => 'Container Breakpoint',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle'
            ]
        ],
        'alignment' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:alignment',
            'description' => 'Container Alignment',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Default', '']
                ]
            ]
        ],
        'mt' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:mt',
            'description' => 'Mobile',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Default', '']
                ]
            ]
        ],
        'mb' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:mb',
            'description' => 'Mobile',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Default', '']
                ]
            ]
        ],
        'pt' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:pt',
            'description' => 'Mobile',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Default', '']
                ]
            ]
        ],
        'pb' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:pb',
            'description' => 'Mobile',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Default', '']
                ]
            ]
        ],
        'tablet_bp' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:breakpoint',
            'description' => 'Tablet Breakpoint',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle'
            ]
        ],
        'tablet_mt' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:mt',
            'description' => 'Tablet',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Default', '']
                ]
            ]
        ],
        'tablet_mb' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:mb',
            'description' => 'Tablet',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Default', '']
                ]
            ]
        ],
        'tablet_pt' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:pt',
            'description' => 'Tablet',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Default', '']
                ]
            ]
        ],
        'tablet_pb' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:pb',
            'description' => 'Tablet',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Default', '']
                ]
            ]
        ],
        'desktop_bp' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:breakpoint',
            'description' => 'Desktop Breakpoint',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle'
            ]
        ],
        'desktop_mt' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:mt',
            'description' => 'Desktop',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Default', '']
                ]
            ]
        ],
        'desktop_mb' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:mb',
            'description' => 'Desktop',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Default', '']
                ]
            ]
        ],
        'desktop_pt' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:pt',
            'description' => 'Desktop',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Default', '']
                ]
            ]
        ],
        'desktop_pb' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:pb',
            'description' => 'Desktop',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Default', '']
                ]
            ]
        ],
        'background' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:background',
            'description' => 'Background',
            'config' => [
                'type' => 'input',
                'renderType' => 'colorpicker',
                'size' => 10,
            ]
        ],
        'color' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:color',
            'description' => 'Color',
            'config' => [
                'type' => 'input',
                'renderType' => 'colorpicker',
                'size' => 10,
            ]
        ],
        'tag' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang_be.xlf:tag',
            'description' => 'HTML Tag',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Default', '']
                ]
            ]
        ]
    ]
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes(
    'tt_content',
    'container, breakpoint, alignment, mt, mb, pt, pb, tablet_bp, tablet_mt, tablet_mb, tablet_pt, tablet_pb, desktop_bp, desktop_mt, desktop_mb, desktop_pt, desktop_pb, background, color, tag',
    'appearance',
    'after:space_after_class'
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToPalette(
    'tt_content',
    'frames',
    'container, breakpoint, alignment, --linebreak--, mt, mb, pt, pb, --linebreak--, tablet_bp, --linebreak--, tablet_mt, tablet_mb, tablet_pt, tablet_pb, --linebreak--, desktop_bp, --linebreak--, desktop_mt, desktop_mb, desktop_pt, desktop_pb, --linebreak--, background, color, tag'
);

// CUSTOM CONTENT
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'label' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang.xlf:skeleton_text.label',
        'description' => 'LLL:EXT:skeleton/Resources/Private/Language/locallang.xlf:skeleton_text.description',
        'value' => 'skeleton_text',
        'icon' => 'content-text',
        'group' => 'common'
    ],
    'textmedia',
    'after'
);

$GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes']['skeleton_text'] = 'skeleton-text';

$GLOBALS['TCA']['tt_content']['types']['skeleton_text'] = [
    'showitem' => '
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
            --palette--;;general,
            header; Internal title (not displayed),
            bodytext;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:bodytext_formlabel,
        --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
            --palette--;;frames,
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
            --palette--;;hidden,
            --palette--;;access
    ',
    'columnsOverrides' => [
        'bodytext' => [
            'config' => [
                'enableRichtext' => true,
                'richtextConfiguration' => 'skeleton'
            ]
        ]
    ]
];
