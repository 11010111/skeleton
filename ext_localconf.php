<?php

defined('TYPO3') or die('Access denied.');

/***************
 * Add default RTE configuration
 */
$GLOBALS['TYPO3_CONF_VARS']['RTE']['Presets']['skeleton'] = 'EXT:skeleton/Configuration/RTE/Default.yaml';

/***************
 * Add global skeleton namespace
 */
$GLOBALS['TYPO3_CONF_VARS']['SYS']['fluid']['namespaces']['skeleton'] = ['KSNC\\Skeleton\\ViewHelpers'];

/***************
 * Add backend CSS
 */
$GLOBALS['TYPO3_CONF_VARS']['BE']['stylesheets']['skeleton'] = 'EXT:skeleton/Resources/Public/Css/backend.css';

/***************
 * Disable Errors
 */
$GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '';
