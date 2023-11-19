<?php

defined('TYPO3') or die('Access denied.');

/***************
 * Add default RTE configuration
 */
$GLOBALS['TYPO3_CONF_VARS']['RTE']['Presets']['skeleton'] = 'EXT:skeleton/Configuration/RTE/Default.yaml';

/***************
 * Add global skeleton namespace
 */
$GLOBALS['TYPO3_CONF_VARS']['SYS']['fluid']['namespaces']['skeleton'] = ['Konstantinschneider\\Skeleton\\ViewHelpers'];
