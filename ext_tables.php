<?php

defined('TYPO3_MODE') || die();

/**
 * Development Mode CSS FILES
 */
if (!\TYPO3\CMS\Core\Core\Environment::getContext()->isProduction()) {
    $GLOBALS['TBE_STYLES']['skins']['skeleton'] = [
        'name' => 'Development',
        'stylesheetDirectories' => [
            'css' => 'EXT:skeleton/Resources/Public/Css/Development/'
        ]
    ];
}
