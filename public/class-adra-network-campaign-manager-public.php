<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://adra.org/
 * @since      1.0.0
 *
 * @package    Adra_Network_Campaign_Manager
 * @subpackage Adra_Network_Campaign_Manager/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Adra_Network_Campaign_Manager
 * @subpackage Adra_Network_Campaign_Manager/public
 * @author     Francois Auclair <info@mtldigital.ca>
 */
class Adra_Network_Campaign_Manager_Public
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
    
    
    protected $args;
    
    private $shortcode_name;
    
    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param      string $plugin_name The name of the plugin.
     * @param      string $version The version of this plugin.
     */
    public function __construct($plugin_name, $version)
    {
        
        $this->plugin_name = $plugin_name;
        $this->version = $version;
        $this->shortcode_name = 'campaign-manager';
        
        add_shortcode('campaign-manager', [$this, 'render_frontend']);
        
    }
    
    
    /**
     * Render frontend app
     *
     * @param  array $atts
     * @param  string $content
     *
     * @return string
     */
    public function render_frontend($atts, $content = '')
    {
        
        $data = json_encode($atts, JSON_HEX_APOS);
        
        $content .= "<div id='app' data-adra='{$data}'></div>";
        
        return $content;
    }
    
    /**
     * Register the stylesheets for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_styles()
    {
        if (!$this->is_shortcode_present()){
            return;
        }
        if ($this->is_develop_serve()) {
            wp_enqueue_style($this->plugin_name . '_dev', 'http://localhost:2323/css/app-public.css', [], $this->version, 'all');
        } else {
            wp_enqueue_style($this->plugin_name, plugin_dir_url(__DIR__) . 'public/dist/css/app-public.css', [], $this->version, 'all');
        }
        
    }
    
    /**
     * Register the JavaScript for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts()
    {
        
        if (!$this->is_shortcode_present()){
            return;
        }
        if ($this->is_develop_serve()) {
            return  wp_enqueue_script($this->plugin_name . '_dev', 'http://localhost:2323/js/app-public.js', [], $this->version, true);
    
        }
        if ($this->is_shortcode_present()) {
            wp_enqueue_script($this->plugin_name . '_chunks', plugin_dir_url(__DIR__) . 'public/dist/js/chunk-vendors-public.js', [], $this->version, true);
            wp_enqueue_script($this->plugin_name, plugin_dir_url(__DIR__) . 'public/dist/js/app-public.js', [], $this->version, true);
        }
        
        return;
        
        
    }
    
    public function is_shortcode_present() {
        global $post;
        return has_shortcode( $post->post_content, $this->shortcode_name);
    }
    
    private function is_develop_serve()
    {
        if (getenv('APPLICATION_ENV') === 'development') {
            return true;
        }
        return false;
    }
    
    
}
