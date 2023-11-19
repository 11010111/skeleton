<?php

namespace Konstantinschneider\Skeleton\ViewHelpers;

use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractTagBasedViewHelper;

/**
 * Class WrapperViewHelper
 *
 * @package Konstantinschneider\Skeleton\ViewHelpers
 */
class WrapperViewHelper extends AbstractTagBasedViewHelper {
    /**
     * @var string
     */
    protected string $tagName = 'div';

    public function initializeArguments() {
        parent::initializeArguments();
        $this->registerUniversalTagAttributes();
        $this->registerArgument('as', 'string', 'Type');
        $this->registerArgument('render', 'array', 'Data');
    }

    public function render() {
        if ($this->hasArgument('render')) {
            addArgumentClass('frame_class');

            addArgumentClass('mt', 'mt-');
            addArgumentClass('mb', 'mb-');
            addArgumentClass('pt', 'pt-');
            addArgumentClass('pb', 'pb-');

            addArgumentClass('tablet_mt', 'mt-', 'tablet_bp');
            addArgumentClass('tablet_mb', 'mb-', 'tablet_bp');
            addArgumentClass('tablet_pt', 'pt-', 'tablet_bp');
            addArgumentClass('tablet_pb', 'pb-', 'tablet_bp');

            addArgumentClass('desktop_mt', 'mt-', 'desktop_bp');
            addArgumentClass('desktop_mb', 'mb-', 'desktop_bp');
            addArgumentClass('desktop_pt', 'pt-', 'desktop_bp');
            addArgumentClass('desktop_pb', 'pb-', 'desktop_bp');

            addArgumentStyle('background', 'background-color');
            addArgumentStyle('color', 'color');

            if ($this->arguments['render']['tag']) {
                $this->tagName = $this->arguments['render']['tag'];
            }

            if ($this->arguments['render']['uid'] && !$this->tag->getAttribute('id')) {
                $this->tag->addAttribute('id',  'w' . $this->arguments['render']['uid']);
            }
        }

        if ($this->hasArgument('as')) {
            $this->tagName = $this->arguments['as'];
        }

        $this->tag->setTagName($this->tagName);
        $this->tag->setContent($this->renderChildren());

        return $this->tag->render();
    }

    protected function addArgumentClass($argumentName, $classPrefix = '', $breakpoint = null): void {
        if (!$this->argument['render'][$argumentName] && $this->argument['render'][$argumentName] !== '0') {
            return;
        }

        $bp = $breakpoint ? $this->argument['render'][$breakpoint] . ':' : '';
        $className = $bp . $classPrefix . $this->arguments['render'][$argumentName];

        if ($this->tag->getAttribute('class')) {
            $newClassName = $this->tag->getAttribute('class') . ' ' . $className;
            $this->tag->addAttribute('class', str_replace('  ', ' ', $newClassName));
        } else {
            $this->tag->addAttribute('class', $className);
        }
    }

    protected function addArgumentStyle($argumentName, $styleName): void {
        if (!$this->argument['render'][$argumentName]) {
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
