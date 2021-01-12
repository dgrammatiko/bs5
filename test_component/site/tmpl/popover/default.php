<?php
/**
 * Bs5test Joomla Component
 *
 * @copyright  Copyright (C) 2021 dGrammatiko. All rights reserved.
 * @license    GNU/GPL - http://www.gnu.org/copyleft/gpl.html
 */
defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Uri\Uri;
use Joomla\CMS\Factory;

include_once __DIR__ . '/../nav.php';

HTMLHelper::_('bootstrap.popover');

?>

<div class="bd-example">
  <button type="button" class="btn btn-lg btn-danger" data-bs-toggle="popover" title="" data-bs-content="And here's some amazing content. It's very engaging. Right?" data-bs-original-title="Popover title">Click to toggle popover</button>
</div>
