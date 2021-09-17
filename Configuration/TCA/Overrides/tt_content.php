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

});
