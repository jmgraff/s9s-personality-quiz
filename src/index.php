<?php
/**
 * Plugin Name: __PRODUCT_NAME__
 * Description: Create viral content with this Buzzfeed style personality quiz!
 * Version: 1.0.0
 * Author: Signal 9 Software
 * Author URI: https://signal9software.com
 * Text Domain: s9spq
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

    defined('ABSPATH') || exit;

    define('S9SPQ_PLUGIN_PATH', plugin_dir_path( __FILE__ ));
    define('S9SPQ_PLUGIN_URL', plugin_dir_url( __FILE__ ));

    function s9spq_get_script_url($name) {
        #FIXME better handle error state when js file not found (should never happen in release builds though)
        $files = glob(S9SPQ_PLUGIN_PATH . $name . '.*.js');
        if (count($files) != 1) {
            die("$name must correlate to exactly 1 file; " . count($files) . ' found.');
        }
        return S9SPQ_PLUGIN_URL . basename($files[0]);
    }

    function s9spq_frontend_assets() {
        if (!is_admin()) {
            wp_enqueue_script('s9spq_frontend_script', s9spq_get_script_url('frontend'), ['wp-element'], null, true);
        }
    }
    add_action( 'enqueue_block_assets', 's9spq_frontend_assets' );

    function s9spq_admin_assets() {
        wp_enqueue_media();
        wp_enqueue_script('s9spq_admin_script', s9spq_get_script_url('admin'), ['wp-element', 'wp-data', 'lodash'], null, true);
    }
    add_action( 'enqueue_block_editor_assets', 's9spq_admin_assets' );
?>
