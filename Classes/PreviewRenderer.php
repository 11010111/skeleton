<?php

namespace Vendor\Skeleton;

use TYPO3\CMS\Backend\Preview\PreviewRendererInterface;
use TYPO3\CMS\Backend\View\BackendLayout\Grid\GridColumnItem;
use TYPO3\CMS\Extbase\Utility\DebuggerUtility;

class PreviewRenderer implements PreviewRendererInterface {

    public function renderPageModulePreviewHeader(GridColumnItem $item): string
    {
        return '';
    }

    public function renderPageModulePreviewContent(GridColumnItem $item): string
    {
        return '';
    }

    public function renderPageModulePreviewFooter(GridColumnItem $item): string
    {
        DebuggerUtility::var_dump($item);

        return 'Test';
    }

    public function wrapPageModulePreview(string $previewHeader, string $previewContent, GridColumnItem $item): string
    {
        return 'Test';
    }
}
