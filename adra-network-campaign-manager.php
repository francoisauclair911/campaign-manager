<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://adra.org/
 * @since             1.0.0
 * @package           Adra_Network_Campaign_Manager
 *
 * @wordpress-plugin
 * Plugin Name:       ADRA Campaign Manager Plugin
 * Plugin URI:        https://adra.org/
 * Description:       Campaign Manager, Displays and Generates Form for ADRA Campaigns
 * Version:           3.0.5
 * Author:            Francois Auclair
 * Author URI:        https://profile.mtldigital.ca/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       adra-network-campaign-manager
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'ADRA_NETWORK_CAMPAIGN_MANAGER_VERSION', '3.0.5' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-adra-network-campaign-manager-activator.php
 */
function activate_adra_network_campaign_manager() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-adra-network-campaign-manager-activator.php';
	Adra_Network_Campaign_Manager_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-adra-network-campaign-manager-deactivator.php
 */
function deactivate_adra_network_campaign_manager() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-adra-network-campaign-manager-deactivator.php';
	Adra_Network_Campaign_Manager_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_adra_network_campaign_manager' );
register_deactivation_hook( __FILE__, 'deactivate_adra_network_campaign_manager' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-adra-network-campaign-manager.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_adra_network_campaign_manager() {

	$plugin = new Adra_Network_Campaign_Manager();
	$plugin->run();

}
run_adra_network_campaign_manager();
