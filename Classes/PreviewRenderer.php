<?php

namespace Vendor\Skeleton;

use TYPO3\CMS\Backend\Preview\StandardContentPreviewRenderer;
use TYPO3\CMS\Backend\View\BackendLayout\Grid\GridColumnItem;

class PreviewRenderer extends StandardContentPreviewRenderer
{
    public function renderPageModulePreviewFooter(GridColumnItem $item): string
    {
        echo $item;
        return parent::renderPageModulePreviewFooter($item);
    }
}
