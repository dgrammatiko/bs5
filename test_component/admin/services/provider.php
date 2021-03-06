<?php
defined('_JEXEC') or die;

use Joomla\CMS\Dispatcher\ComponentDispatcherFactoryInterface;
use Joomla\CMS\Extension\ComponentInterface;
use Joomla\CMS\Extension\MVCComponent;
use Joomla\CMS\Extension\Service\Provider\ComponentDispatcherFactory;
use Joomla\CMS\Extension\Service\Provider\MVCFactory;
use Joomla\CMS\MVC\Factory\MVCFactoryInterface;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;

/**
 * The cache service provider.
 *
 * @since  4.0.0
 */
return new class implements ServiceProviderInterface
{
  /**
   * Registers the service provider with a DI container.
   *
   * @param   Container  $container  The DI container.
   *
   * @return  void
   *
   * @since   4.0.0
   */
  public function register(Container $container)
  {
    $container->registerServiceProvider(new MVCFactory('\\Ttc\\Component\\Bs5test'));
    $container->registerServiceProvider(new ComponentDispatcherFactory('\\Ttc\\Component\\Bs5test'));

    $container->set(
      ComponentInterface::class,
      function (Container $container)
      {
        $component = new MVCComponent($container->get(ComponentDispatcherFactoryInterface::class));

        $component->setMVCFactory($container->get(MVCFactoryInterface::class));

        return $component;
      }
    );
  }
};
