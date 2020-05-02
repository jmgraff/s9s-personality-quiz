<?php

/**
* Plugin Name: React Quiz
* Plugin URI: https://reactquiz.com/wordpress
* Description: Create viral React.js content for your WordPress website with BuzzFeed style quizzes! 
* Version: 1.0.0
* Author: Signal 9 Software
* Author URI: https://signal9software.com
* License: GPL2
*/

if (!class_exists('ReactQuiz')) {
  class ReactQuiz {
    private $shortcode_name = 'reactquiz';

    public function register() {
      //shortcode
      add_shortcode($this->shortcode_name, [$this, 'shortcode']);

      //quiz post scripts
      add_action('wp_enqueue_scripts', [$this, 'quiz_post_scripts']);

      //custom-post-type
      add_action('init', [$this, 'reactquiz_custom_post_type']);
    }

    public function reactquiz_custom_post_type() {
      $args = array(
        'labels' => array(
          'name' => 'React Quizzes',
          'singular_name' => 'React Quiz'
        ),
        'public' => true,
        'has_archive' => true,
        'show_ui' => true,
        'register_meta_box_cb' => [$this, 'meta_box_cb']
      );

      register_post_type('reactquiz_quiz', $args);
      remove_post_type_support('reactquiz_quiz', 'editor');
    }

    public function meta_box_cb() {
      add_meta_box('reactquiz_edit_meta_box', 'Edit React Quiz', [$this, 'edit_meta_box'], null, 'normal');

      chdir(plugin_dir_path(__FILE__).'admin/build/static/js/');
      foreach (glob('*.js') as $file) {
        wp_enqueue_script($file, plugin_dir_url(__FILE__) . 'admin/build/static/js/' . $file, [], false, true);
      }
    }

    public function edit_meta_box() {
      echo '<div id="root">ReactApp Root</div>';
    }
/*
    public function admin_menu() {
      global $reactquiz_menu_page;
      $reactquiz_menu_page = add_menu_page('ReactQuiz Menu', 'React Quiz', 'manage_options', 'reactquiz-menu-page', [$this, 'test_init']);
    }

    public function test_init() {
      echo '<div id="root"></div>';
    }
*/
    public function shortcode($atts) {
      $rootElement = '<div id="root"></div>';
      return $rootElement;
    } 

    public function quiz_post_scripts() {
      global $post;
      if (isset($post) && has_shortcode($post->post_content, $this->shortcode_name)) {
        chdir(plugin_dir_path(__FILE__).'frontend/build/static/js/');
        foreach (glob('*.js') as $file) {
          wp_enqueue_script($file, plugin_dir_url(__FILE__) . 'frontend/build/static/js/' . $file, [], false, true);
        }
      }
    }
/*
    public function admin_scripts($hook) {
      global $reactquiz_menu_page;
      if ($hook != $reactquiz_menu_page) return;
      chdir(plugin_dir_path(__FILE__).'admin/build/static/js/');
      foreach (glob('*.js') as $file) {
        wp_enqueue_script($file, plugin_dir_url(__FILE__) . 'admin/build/static/js/' . $file, [], false, true);
      }
    }
*/
  }

  (new ReactQuiz())->register();
}

?>
