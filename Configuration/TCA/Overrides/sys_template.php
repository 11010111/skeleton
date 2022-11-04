<?php

defined('TYPO3') or die('Access denied.');

call_user_func(function () {
    /**
     * Temporary variables
     */
    $extensionKey = 'skeleton';

    /**
     * Default TypoScript for Skeleton
     */
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
        $extensionKey,
        'Configuration/TypoScript',
        'Skeleton'
    );
});
