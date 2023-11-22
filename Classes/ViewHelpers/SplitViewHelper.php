<?php

namespace Konstantinschneider\Skeleton\ViewHelpers;

use Closure;
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;

/**
 * Class SplitViewHelper
 *
 * @package Konstantinschneider\Skeleton\ViewHelpers
 */
class SplitViewHelper extends AbstractViewHelper
{
  /**
   * @inheritDoc
   */
  public function initializeArguments()
  {
    $this->registerArgument('separator', 'string', 'The separator', true);
    $this->registerArgument('string', 'string', 'The string', true);
    $this->registerArgument('limit', 'int', 'The limit');
  }

  /**
   * @inheritDoc
   */
  public static function renderStatic(
    array                     $arguments,
    Closure                   $renderChildrenClosure,
    RenderingContextInterface $renderingContext
  )
  {
    if (empty($arguments['limit'])) {
      return explode($arguments['separator'], $arguments['string']);
    } else {
      return explode($arguments['separator'], $arguments['string'], $arguments['limit']);
    }
  }
}
