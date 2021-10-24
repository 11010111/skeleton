<?php

namespace Vendor\Skeleton;

use TYPO3\CMS\Backend\Preview\PreviewRendererInterface;
use TYPO3\CMS\Backend\View\BackendLayout\Grid\GridColumnItem;

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
        $row = '';

        if ($item['breakpoint']) {
            $row = '<strong>Breakpoint</strong> ' . $item['breakpoint'];
        }

        return $row;
    }

    public function wrapPageModulePreview(string $previewHeader, string $previewContent, GridColumnItem $item): string
    {
        return '';
    }
}
