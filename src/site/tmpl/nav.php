<?php
/**
 * Bs5test Joomla Component
 *
 * @copyright  Copyright (C) 2021 dGrammatiko. All rights reserved.
 * @license    GNU/GPL - http://www.gnu.org/copyleft/gpl.html
 */
defined('_JEXEC') or die;

use Joomla\CMS\Uri\Uri;
use Joomla\CMS\Factory;

$root = Uri::root(false);

Factory::getDocument()
    ->getWebAssetManager()
    ->addInlineScript(file_get_contents(__DIR__ . '/prism.js'), ['attributes' => ['type' => 'module']])
    ->addInlineStyle(file_get_contents(__DIR__ . '/prism.css'));

?>
<details open>
  <summary>Navigation</summary>
  <ul>
    <li><a href="<?php echo $root; ?>index.php?option=com_bs5test&view=home">Home</a></li>
    <li><a href="<?php echo $root; ?>index.php?option=com_bs5test&view=alerts">Alerts</a></li>
    <li><a href="<?php echo $root; ?>index.php?option=com_bs5test&view=carousel">Carousel</a></li>
    <li><a href="<?php echo $root; ?>index.php?option=com_bs5test&view=collapse">Collapse</a></li>
    <li><a href="<?php echo $root; ?>index.php?option=com_bs5test&view=dropdown">Dropdown</a></li>
    <li><a href="<?php echo $root; ?>index.php?option=com_bs5test&view=modal">Modal</a></li>
    <li><a href="<?php echo $root; ?>index.php?option=com_bs5test&view=popover">Popover</a></li>
    <li><a href="<?php echo $root; ?>index.php?option=com_bs5test&view=scrollspy">Scrollspy</a></li>
    <li><a href="<?php echo $root; ?>index.php?option=com_bs5test&view=tab">tab</a></li>
    <li><a href="<?php echo $root; ?>index.php?option=com_bs5test&view=toast">Toast</a></li>
    <li><a href="<?php echo $root; ?>index.php?option=com_bs5test&view=tooltip">Tooltip</a></li>
    <li><a href="<?php echo $root; ?>index.php?option=com_bs5test&view=accordion">Accordion (Collapse)</a></li>
  </ul>
</details>
<hr>
