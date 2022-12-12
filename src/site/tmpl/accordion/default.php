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


?>
<h2>Accordion</h2>

<?php echo HTMLHelper::_('bootstrap.startAccordion', 'collapseTypes', array('active' => 'slide1')); ?>

<?php echo HTMLHelper::_('bootstrap.addSlide', 'collapseTypes', 'Accordion Item #1', 'collapse1'); ?>
<p>One Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
<?php echo HTMLHelper::_('bootstrap.endSlide'); ?>

<?php echo HTMLHelper::_('bootstrap.addSlide', 'collapseTypes', 'Accordion Item #2', 'collapse2'); ?>
<p>Two Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
<?php echo HTMLHelper::_('bootstrap.endSlide'); ?>

<?php echo HTMLHelper::_('bootstrap.addSlide', 'collapseTypes', 'Accordion Item #3', 'collapse3'); ?>
<p>Three Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
<?php echo HTMLHelper::_('bootstrap.endSlide'); ?>

<?php echo HTMLHelper::_('bootstrap.endAccordion'); ?>

<h3>Start the tabs</h3>
<pre><code class="language-php">
echo HTMLHelper::_(
  'bootstrap.startAccordion',  // call the function startAccordion from the Bootstrap class
  'collapseTypes',             // The Accordion class
  ['active' => 'slide1']       // Parameters for the accordion
);
</code></pre>

<h4>For every tab repeat: </h4>
<p>Initiate the tab</p>
<pre><code class="language-php">
HTMLHelper::_(
  'bootstrap.addSlide', // call the function addSlide from the Bootstrap class
  'collapseTypes',      // The Accordion class
  'Accordion Item #1',  // The HTML for the Button
  'collapse1'           // The id of the current pane
);
</code></pre>

<p>Include the tab contents</p>
<pre><code class="language-markup">
<div>Your tab content goes here</div>
</code></pre>

<p>Terminate the tab</p>
<pre><code class="language-php">
echo HTMLHelper::_(
  'bootstrap.endSlide' // call the function endSlide from the Bootstrap class
);
</code></pre>


<h3> Finally you need to terminate the tabs</h3>
<pre><code class="language-php">
echo HTMLHelper::_(
  'bootstrap.endAccordion' // call the function endSlide from the Bootstrap class
);
</code></pre>
