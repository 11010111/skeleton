<?php

namespace Konstantinschneider\Skeleton\ViewHelpers;

use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractTagBasedViewHelper;

/**
 * Class ContainerViewHelper
 *
 * @package Konstantinschneider\Skeleton\ViewHelpers
 */
class ContainerViewHelper extends AbstractTagBasedViewHelper {
    /**
     * @var string
     */
    protected $tagName = 'div';

    public function initializeArguments() {
        parent::initializeArguments();
        $this->registerUniversalTagAttributes();
        $this->registerArgument('as', 'string', 'Type');
        $this->registerArgument('render', 'array', 'Data');
        $this->registerArgument('wrap', 'string', 'Wrap Data');
    }

    public function render() {
        if ($this->hasArgument('render')) {
            $this->addArgumentClass('container');
            $this->addArgumentClass('alignment');

            if ($this->arguments['wrap'] == 'true' || (
                $this->arguments['render']['frame_class'] === 'none' && $this->arguments['render']['container'] !== ''
            )) {
                $this->addArgumentClass('frame_class');

                $this->addArgumentClass('mt', 'mt-');
                $this->addArgumentClass('mb', 'mb-');
                $this->addArgumentClass('pt', 'pt-');
                $this->addArgumentClass('pb', 'pb-');

                $this->addArgumentClass('tablet_mt', 'mt-', 'tablet_bp');
                $this->addArgumentClass('tablet_mb', 'mb-', 'tablet_bp');
                $this->addArgumentClass('tablet_pt', 'pt-', 'tablet_bp');
                $this->addArgumentClass('tablet_pb', 'pb-', 'tablet_bp');

                $this->addArgumentClass('desktop_mt', 'mt-', 'desktop_bp');
                $this->addArgumentClass('desktop_mb', 'mb-', 'desktop_bp');
                $this->addArgumentClass('desktop_pt', 'pt-', 'desktop_bp');
                $this->addArgumentClass('desktop_pb', 'pb-', 'desktop_bp');

                $this->addArgumentStyle('background', 'background-color');
                $this->addArgumentStyle('color', 'color');

                if ($this->arguments['render']['uid'] && !$this->tag->getAttribute('id')) {
                    $this->tag->addAttribute('id',  'c' . (array_key_exists('_LOCALIZED_UID', $this->arguments['render']) && !empty($this->arguments['render']['_LOCALIZED_UID']) ? $this->arguments['render']['_LOCALIZED_UID'] : $this->arguments['render']['uid']));
                }

                if ($this->arguments['render']['tag']) {
                    $this->tagName = $this->arguments['render']['tag'];
                }
            }
        }

        if ($this->hasArgument('as')) {
            $this->tagName = $this->arguments['as'];
        }

        $this->tag->setTagName($this->tagName);
        $this->tag->setContent($this->renderChildren());

        if (!$this->arguments['render']['container'] && !$this->tag->getAttribute('class')) {
            return $this->renderChildren();
        }

        return $this->tag->render();
    }

    protected function addArgumentClass($argumentName, $classPrefix = '', $breakpoint = null): void {
        if (empty($this->arguments['render'][$argumentName]) && strlen($this->arguments['render'][$argumentName]) === 0) {
            return;
        }

        $bp = $breakpoint ? $this->arguments['render'][$breakpoint] . ':' : '';
        $className = $bp . $classPrefix . $this->arguments['render'][$argumentName];

        if ($this->tag->getAttribute('class')) {
            $newClassName = $this->tag->getAttribute('class') . ' ' . $className;
            $this->tag->addAttribute('class', str_replace('  ', ' ', $newClassName));
        } else {
            $this->tag->addAttribute('class', $className);
        }
    }

    protected function addArgumentStyle($argumentName, $styleName): void {
        if (!$this->arguments['render'][$argumentName]) {
            return;
        }

        $style = $styleName . ':' . $this->arguments['render'][$argumentName] . ';';

        if ($this->tag->getAttribute('style')) {
            $newStyle = $this->tag->getAttribute('style') . ';' . $style;
            $this->tag->addAttribute('style', str_replace(';;', ';', $newStyle));
        } else {
            $this->tag->addAttribute('style', $style);
        }
    }
}
