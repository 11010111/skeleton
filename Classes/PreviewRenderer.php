<?php

use TYPO3\CMS\Backend\Preview\PreviewRendererInterface;
use TYPO3\CMS\Backend\View\BackendLayout\Grid\GridColumnItem;

class PreviewRenderer implements PreviewRendererInterface {

    public function renderPageModulePreviewHeader(GridColumnItem $item): string
    {
        //
    }

    public function renderPageModulePreviewContent(GridColumnItem $item): string
    {
        //
    }

    public function renderPageModulePreviewFooter(GridColumnItem $item): string
    {
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($item->getColumn());
    }

    public function wrapPageModulePreview(string $previewHeader, string $previewContent, GridColumnItem $item): string
    {
        //
    }
}
