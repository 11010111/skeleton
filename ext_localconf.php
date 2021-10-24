<?php

defined('TYPO3_MODE') || die();

/***************
 * Add default RTE configuration
 */
$GLOBALS['TYPO3_CONF_VARS']['RTE']['Presets']['skeleton'] = 'EXT:skeleton/Configuration/RTE/Default.yaml';

/***************
 * PageTS
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
    '<INCLUDE_TYPOSCRIPT: source="FILE:EXT:skeleton/Configuration/TsConfig/Page/All.tsconfig">'
);

/***************
 * Backend Css
 */
\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
    \TYPO3\CMS\Core\Page\PageRenderer::class
)->addCssFile('EXT:skeleton/Resources/Public/Css/backend.css');

$GLOBALS['TCA']['tt_content_draw_item']['ctrl']['previewRenderer'] = \Vendor\Skeleton\PreviewRenderer::class;
