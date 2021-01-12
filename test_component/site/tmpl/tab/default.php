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

<?php echo JHtml::_('bootstrap.startTabSet', '.myTab', ['active' => 'first']); ?>

<?php echo JHtml::_('bootstrap.addTab', '.myTab', 'first', 'first'); ?>
<p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
<?php echo JHtml::_('bootstrap.endTab'); ?>

<?php echo JHtml::_('bootstrap.addTab', '.myTab', 'second', 'second'); ?>
<p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
<?php echo JHtml::_('bootstrap.endTab'); ?>

<?php echo JHtml::_('bootstrap.addTab', '.myTab', 'third', 'third'); ?>
<p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
<?php echo JHtml::_('bootstrap.endTab'); ?>

<?php echo JHtml::_('bootstrap.endTabSet'); ?>


<h3>Start the tabs</h3>
<pre><code class="language-php">
echo JHtml::_('bootstrap.startTabSet', '.myTab', ['active' => 'first']);
</code></pre>

<h4>For every tab repeat: </h4>
<p>Initiate the tab</p>
<pre><code class="language-php">
echo JHtml::_('bootstrap.addTab', '.myTab', 'first', 'first');
</code></pre>

<p>Include the tab contents</p>
<pre><code class="language-markup">
Your tab content goes here
</code></pre>

<p>Terminate the tab</p>
<pre><code class="language-php">
echo JHtml::_('bootstrap.endTab');
</code></pre>


<h3> Finally you need to terminate the tabs</h3>
<pre><code class="language-php">
echo JHtml::_('bootstrap.endTabSet');
</code></pre>
