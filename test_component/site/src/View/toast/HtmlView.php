<?php
/**
 * Bs5test Joomla Component
 *
 * @copyright  Copyright (C) 2021 dGrammatiko. All rights reserved.
 * @license    GNU/GPL - http://www.gnu.org/copyleft/gpl.html
 */
namespace Ttc\Component\Bs5test\Site\View\Toast;

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;

/**
 * Default HTML view class
 *
 * @since  1.0
 */
class HtmlView extends BaseHtmlView
{
  /**
   * Display the view
   *
   * @param   string  $tpl  The name of the template file to parse
   *
   * @return  mixed  A string if successful, otherwise a JError object.
   *
   * @since   1.0
   */
  public function display($tpl = null) {
    $app = Factory::getApplication();

    $params = $app->getParams();

    $title = $params->get('page_title', '');

    if (empty($title)) {
      $title = $app->get('sitename');
    } elseif ($app->get('sitename_pagetitles', 0) == 1) {
      $title = Text::sprintf('JPAGETITLE', $app->get('sitename'), $title);
    } elseif ($app->get('sitename_pagetitles', 0) == 2) {
      $title = Text::sprintf('JPAGETITLE', $title, $app->get('sitename'));
    }

    $this->document->setTitle($title);

    if ($params->get('menu-meta_description')) {
      $this->document->setDescription($params->get('menu-meta_description'));
    }

    if ($params->get('menu-meta_keywords')) {
      $this->document->setMetaData('keywords', $params->get('menu-meta_keywords'));
    }

    if ($params->get('robots')) {
      $this->document->setMetaData('robots', $params->get('robots'));
    }

    return parent::display($tpl);
  }
}
