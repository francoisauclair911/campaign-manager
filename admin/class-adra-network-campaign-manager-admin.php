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
            'edit_pages',
            'adra-network-campaign-manager',
            [$this, 'my_plugin_options'],
            'dashicons-megaphone'
        );
    }
    
    function my_plugin_options()
    {
//        if (!current_user_can('manage_options')) {
//            wp_die(__('You do not have sufficient permissions to access this page.'));
//        }
        echo '<div id="app"></div>';
    }
    
    
    /**
     * Register the stylesheets for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_styles()
    {
        
        if ($this->is_develop_serve()) {
            wp_enqueue_style($this->plugin_name . '_dev', 'http://localhost:8080/css/app-admin.css', [], $this->version, 'all');
        } else {
            wp_enqueue_style($this->plugin_name, plugin_dir_url(__DIR__) . 'admin/dist/css/app-admin.css', [], $this->version, 'all');
        }
        
        
    }
    
    /**
     * Register the JavaScript for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts()
    {
        
        
        if ($this->is_develop_serve()) {
            wp_enqueue_script($this->plugin_name . '_dev', 'http://localhost:8080/js/app-admin.js', [], $this->version, false);
        } else {
            wp_enqueue_script($this->plugin_name . '_chunks', plugin_dir_url(__DIR__) . 'admin/dist/js/chunk-vendors-admin.js', [], $this->version, false);
            wp_enqueue_script($this->plugin_name, plugin_dir_url(__DIR__) . 'admin/dist/js/app-admin.js', [], $this->version, false);
        }
        
    }
    
    
    public function is_develop_serve()
    {
        if ($_SERVER["HTTP_HOST"] === 'wordpress-docker.test:9911') {
            return true;
        }
        return false;
    }
    
    function checkStatus($url)
    {
        $agent = "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8; pt-pt) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27";
        
        // initializes curl session
        $ch = curl_init();
        
        // sets the URL to fetch
        curl_setopt($ch, CURLOPT_URL, $url);
        
        // sets the content of the User-Agent header
        curl_setopt($ch, CURLOPT_USERAGENT, $agent);
        
        // make sure you only check the header - taken from the answer above
        curl_setopt($ch, CURLOPT_NOBODY, true);
        
        // follow "Location: " redirects
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        
        // return the transfer as a string
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        
        // disable output verbose information
        curl_setopt($ch, CURLOPT_VERBOSE, false);
        
        // max number of seconds to allow cURL function to execute
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        
        // execute
        curl_exec($ch);
        
        // get HTTP response code
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        curl_close($ch);
        
        if ($httpcode >= 200 && $httpcode < 300)
            return true;
        else
            return false;
    }
    
}
