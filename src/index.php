<?php
/**
 * Plugin Name: S9S Personality Quiz
 * Plugin URI: https://signal9software.com/personality-quiz
 * Description: Convert traffic to leads with viral Buzzfeed style quizzes!
 * Version: 1.0.0
 * Author: Signal 9 Software
 * Author URI: https://signal9software.com
 * Text Domain: s9spq
 * Domain Path: languages
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */


    defined('ABSPATH') || exit;

    define('S9SPQ_PLUGIN_PATH', plugin_dir_path( __FILE__ ));
    define('S9SPQ_PLUGIN_URL', plugin_dir_url( __FILE__ ));

    function s9spq_get_script_url($name) {
        #FIXME better handle error state when js file not found
        $files = glob(S9SPQ_PLUGIN_PATH . $name . '.*.js');
        if (count($files) != 1) {
            die("$name must correlate to exactly 1 file; " . count($files) . ' found.');
        }
        return S9SPQ_PLUGIN_URL . basename($files[0]);
    }

    function s9spq_frontend_assets() {
        wp_enqueue_style('s9spq_frontend_css', S9SPQ_PLUGIN_URL . 'style.css', [], null);
        if (!is_admin()) {
            wp_enqueue_script('s9spq_frontend_script', s9spq_get_script_url('frontend'), ['wp-element'], null, true);
        }
    }
    add_action( 'enqueue_block_assets', 's9spq_frontend_assets' );

    function s9spq_admin_assets() {
        wp_enqueue_media();
        wp_enqueue_style('s9spq_admin_css', S9SPQ_PLUGIN_URL . 'style.css', [], null);
        wp_enqueue_script('s9spq_admin_script', s9spq_get_script_url('admin'), ['wp-element', 'wp-data', 'lodash'], null, true);
    }
    add_action( 'enqueue_block_editor_assets', 's9spq_admin_assets' );

?>
