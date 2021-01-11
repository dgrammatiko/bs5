<?php
/**
 * Bs5test Joomla Component
 *
 * @copyright  Copyright (C) 2021 Dimitris Grammatikogiannis. All rights reserved.
 * @license    GNU/GPL - http://www.gnu.org/copyleft/gpl.html
 */
defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Uri\Uri;
use Joomla\CMS\Factory;

include_once __DIR__ . '/../nav.php';

HTMLHelper::_('bootstrap.alert');

?>
<div class="alert alert-primary" role="alert">
	A simple primary alert—check it out!
</div>
<div class="alert alert-secondary" role="alert">
	A simple secondary alert—check it out!
</div>
<div class="alert alert-success" role="alert">
	A simple success alert—check it out!
</div>
<div class="alert alert-danger" role="alert">
	A simple danger alert—check it out!
</div>
<div class="alert alert-warning" role="alert">
	A simple warning alert—check it out!
</div>
<div class="alert alert-info" role="alert">
	A simple info alert—check it out!
</div>
<div class="alert alert-light" role="alert">
	A simple light alert—check it out!
</div>
<div class="alert alert-dark" role="alert">
	A simple dark alert—check it out!
</div>

<hr>
<div class="alert alert-success alert-dismissible" role="alert">
	<strong>Holy guacamole!</strong> You should check in on some of those fields below.
	<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

<div class="alert alert-danger alert-dismissible" role="alert">
	<strong>Holy guacamole!</strong> You should check in on some of those fields below.
	<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

<div class="alert alert-warning alert-dismissible" role="alert">
	<strong>Holy guacamole!</strong> You should check in on some of those fields below.
	<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

<div class="alert alert-info alert-dismissible" role="alert">
	<strong>Holy guacamole!</strong> You should check in on some of those fields below.
	<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
