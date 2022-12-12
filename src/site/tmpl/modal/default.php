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

HTMLHelper::_('bootstrap.renderModal');
?>

<h1>Plain HTML example from the Bootstrap docs</h1>

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

<hr>

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>

<hr>

<h2>The Joomla way (eg: PHP)</h2>

<p>Render the modal with the helper function (js behaviour attached automatically)</p>
<pre>
<code class="language-php">
echo HTMLHelper::_(
  'bootstrap.renderModal',
  'myModal',
  [
    'title'       => 'Some Title',
    'backdrop'    => 'static',
    'url'         => Uri::root(false),
    'height'      => '400px',
    'width'       => '800px',
    'bodyHeight'  => 70,
    'modalWidth'  => 80,
    'footer'      => '< button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close< /button>',
  ]
);
</code>
<code>Render the initiator BUTTON</code>
<code class="language-markup">
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
  Launch demo modal
</button>
</code>
</pre>

<?php
echo HTMLHelper::_(
  'bootstrap.renderModal',
  'myModal',
  [
    'title'       => 'Some Title',
    'backdrop'    => 'static',
    'url'         => Uri::root(false) . 'index.php?option=com_bs5test&view=home',
    'height'      => '400px',
    'width'       => '800px',
    'bodyHeight'  => 70,
    'modalWidth'  => 80,
    'footer'      => '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>',
  ]
);
?>

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
  Launch demo modal
</button>
