<?php

namespace Elementor;

// use \Elementor\Plugin as Plugin;
if (!defined('ABSPATH')) {
    die(__('Direct Access is not allowed', 'team-section'));
}

final class Init_Elementor_Extension
{
    
    const VERSION = '1.0.0';
    const MINIMUM_ELEMENTOR_VERSION = '2.0.0';
    const MINIMUM_PHP_VERSION = '7.0';
    
    private static $_instance = null;
    
    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string $plugin_name The ID of this plugin.
     */
    private $plugin_name;
    
    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string $version The current version of this plugin.
     */
    private $version;
    
    public static function instance()
    {
        
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
        
    }
//    public function __construct($plugin_name, $version)
//    {
//        $this->plugin_name = $plugin_name;
//        $this->version = $version;
//    }
    public function __construct()
    {
        add_action('plugins_loaded', array($this, 'init'));
    }
    
    public function init()
    {
        
        load_plugin_textdomain('team-section', false, plugin_dir_path(__FILE__) . '/languages');
        
        // Check if Elementor installed and activated
        if (!did_action('elementor/loaded')) {
            add_action('admin_notices', array($this, 'admin_notice_missing_main_plugin'));
            return;
        }
        
        // Check for required Elementor version
        if (!version_compare(ELEMENTOR_VERSION, self::MINIMUM_ELEMENTOR_VERSION, '>=')) {
            add_action('admin_notices', array($this, 'admin_notice_minimum_elementor_version'));
            return;
        }
        
        // Check for required PHP version
        if (version_compare(PHP_VERSION, self::MINIMUM_PHP_VERSION, '<')) {
            add_action('admin_notices', array($this, 'admin_notice_minimum_php_version'));
            return;
        }
        add_action('elementor/widgets/widgets_registered', array($this, 'init_widgets'));
        add_action('elementor/elements/categories_registered', array($this, 'register_new_category'));
        
        // Register Widget Styles
        add_action(
            'elementor/frontend/after_enqueue_scripts',
            function () {
                wp_enqueue_script('adra-elementor-widgets', plugin_dir_url(__FILE__) . '/assets/js/main.js', array('jquery'), '1.0.0', true);
            }
        );
    }
    
    public function register_new_category($elements_manager)
    {
        
        $elements_manager->add_category(
            'Talib',
            array(
                'title' => __('Talib', 'team-section'),
                'icon' => 'fa fa-image',
            )
        );
    }
    
    public function init_widgets()
    {
        
        require_once __DIR__ . '/elementor/GenericWidget.php';
        // Register widget
        Plugin::instance()->widgets_manager->register_widget_type(new GenericWidget());
    }
    
    public function admin_notice_minimum_php_version()
    {
        
        if (isset($_GET['activate'])) {
            unset($_GET['activate']);
        }
        
        $message = sprintf(
        /* translators: 1: Plugin name 2: PHP 3: Required PHP version */
            esc_html__('"%1$s" requires "%2$s" version %3$s or greater.', 'team-section'),
            '<strong>' . esc_html__('Talib Elementor AddOn', 'team-section') . '</strong>',
            '<strong>' . esc_html__('PHP', 'team-section') . '</strong>',
            self::MINIMUM_PHP_VERSION
        );
        printf('<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message);
    }
    
    public function admin_notice_minimum_elementor_version()
    {
        
        if (isset($_GET['activate'])) {
            unset($_GET['activate']);
        }
        
        $message = sprintf(
        /* translators: 1: Plugin name 2: Elementor 3: Required Elementor version */
            esc_html__('"%1$s" requires "%2$s" version %3$s or greater.', 'team-section'),
            '<strong>' . esc_html__('Talib Elementor AddOn', 'team-section') . '</strong>',
            '<strong>' . esc_html__('Elementor', 'team-section') . '</strong>',
            self::MINIMUM_ELEMENTOR_VERSION
        );
        printf('<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message);
    }
    
    public function admin_notice_missing_main_plugin()
    {
        
        if (isset($_GET['activate'])) {
            unset($_GET['activate']);
        }
        
        $message = sprintf(
        /* translators: 1: Plugin name 2: Elementor */
            esc_html__('"%1$s" requires "%2$s" to be installed and activated.', 'team-section'),
            '<strong>' . esc_html__('Talib Elementor AddOn', 'team-section') . '</strong>',
            '<strong>' . esc_html__('Elementor', 'team-section') . '</strong>'
        );
        printf('<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message);
    }
    
    /*
public function includes() {
} */

}
Init_Elementor_Extension::instance();
