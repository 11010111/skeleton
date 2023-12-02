<?php

declare(strict_types=1);

namespace KSNC\Skeleton\Preview;

use TYPO3\CMS\Backend\Preview\StandardContentPreviewRenderer;
use TYPO3\CMS\Backend\View\BackendLayout\Grid\GridColumnItem;

final class RecordPreviewRenderer extends StandardContentPreviewRenderer
{
    public function renderPageModulePreviewFooter(GridColumnItem $item): string
    {
        $info = [];
        $record = $item->getRecord();
        $fields = [
          'starttime',
          'endtime',
          'fe_group',
          'frame_class',
          'container',
          'breakpoint',
          'alignment',
          'mt',
          'mb',
          'pt',
          'pb',
          'tablet_bp',
          'tablet_mt',
          'tablet_mb',
          'tablet_pt',
          'tablet_pb',
          'desktop_bp',
          'desktop_mt',
          'desktop_mb',
          'desktop_pt',
          'desktop_pb',
          'background',
          'color',
          'tag'
        ];

        $this->getProcessedValue($item, implode(',', $fields), $info);

        if (!empty($GLOBALS['TCA']['tt_content']['ctrl']['descriptionColumn']) && !empty($record[$GLOBALS['TCA']['tt_content']['ctrl']['descriptionColumn']])) {
            $info[] = htmlspecialchars($record[$GLOBALS['TCA']['tt_content']['ctrl']['descriptionColumn']]);
        }

        foreach($info as &$field) {
          $field = '<span>' . $field . '</span>';
        }

        if (!empty($info)) {
            return join('', $info);
        }

        return '';
    }
}
