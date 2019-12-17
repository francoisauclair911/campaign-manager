<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://adra.org/
 * @since      1.0.0
 *
 * @package    Adra_Network_Campaign_Manager
 * @subpackage Adra_Network_Campaign_Manager/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Adra_Network_Campaign_Manager
 * @subpackage Adra_Network_Campaign_Manager/admin
 * @author     Francois Auclair <info@mtldigital.ca>
 */
class Adra_Network_Campaign_Manager_Admin
{
    
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
    
    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param      string $plugin_name The name of this plugin.
     * @param      string $version The version of this plugin.
     */
    public function __construct($plugin_name, $version)
    {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
    }
    
    
    function my_plugin_menu()
    {
        add_menu_page(
            'Campaign Manager',
            'Campaign Manager',
            'read',
            'adra-network-campaign-manager',
            [$this, 'my_plugin_options'],
            'dashicons-megaphone'
        );
    }
    
    function my_plugin_options()
    {
        echo '<div id="app"></div>';
    }
    
    
    /**
     * Register the stylesheets for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_styles($hook)
    {
        if ($hook != 'toplevel_page_adra-network-campaign-manager') {
            return;
        }
        if ($this->is_develop_serve()) {
            return wp_enqueue_style($this->plugin_name . '_dev', 'http://localhost:3232/css/app-admin.css', [], $this->version, 'all');
        }
        return wp_enqueue_style($this->plugin_name, plugin_dir_url(__DIR__) . 'admin/dist/css/app-admin.css', [], $this->version, 'all');
        
        
    }
    
    /**
     * Register the JavaScript for the admin area.
     *
     * @since    1.0.0
     * @param $hook
     */
    public function enqueue_scripts($hook)
    {
        if ($hook != 'toplevel_page_adra-network-campaign-manager') {
            return;
        }
        
        if ($this->is_develop_serve()) {
            wp_enqueue_script($this->plugin_name . '_dev', 'http://localhost:3232/js/app-admin.js', [], $this->version, false);
        } else {
            wp_enqueue_script($this->plugin_name . '_chunks', plugin_dir_url(__DIR__) . 'admin/dist/js/chunk-vendors-admin.js', [], $this->version, false);
            wp_enqueue_script($this->plugin_name, plugin_dir_url(__DIR__) . 'admin/dist/js/app-admin.js', [], $this->version, false);
        }
        
    }
    
    
    public function is_develop_serve()
    {
        $currentDomain = (end(explode(".", $_SERVER['HTTP_HOST'])));
        $possibleDomains = ['test', 'loc', 'local', 'dev'];
        return (in_array($currentDomain, $possibleDomains));
    }
    
    
}
