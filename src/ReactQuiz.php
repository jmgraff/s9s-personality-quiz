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
            add_action('save_post', [$this, 'save_quiz']);
            remove_post_type_support('reactquiz_quiz', 'editor');
        }

        public function save_quiz($post_id) {
            if (isset($_POST['post_type']) 
                    && $_POST['post_type'] == 'reactquiz_quiz' 
                    && isset($_POST['reactquiz_data'])) {
                    $post_meta = get_post_meta($post_id, 'reactquiz_data');
                if ($post_meta) {
                    update_post_meta($post_id, 'reactquiz_data', $_POST['reactquiz_data']);
                } else {
                    add_post_meta($post_id, 'reactquiz_data', $_POST['reactquiz_data']);
                }
            }
        }

        public function meta_box_cb() {
            add_meta_box('reactquiz_edit_meta_box', 'Edit React Quiz', [$this, 'edit_meta_box'], null, 'normal');
            chdir(plugin_dir_path(__FILE__).'admin/static/js/');
            foreach (glob('*.js') as $file) {
                wp_enqueue_script($file, plugin_dir_url(__FILE__) . 'admin/static/js/' . $file, [], false, true);
            }
        }

        public function edit_meta_box($post) {
            $quizData = get_post_meta($post->ID, 'reactquiz_data');
            if (empty($quizData)) {
                $quizData = "";
            } else {
                $quizData = json_encode($quizData[0]);
            }
            
            echo "<pre>".print_r($quizData)."</pre>";
?>
                <script>window.quizData = <?php echo $quizData ?></script> 
                <div id="root">ReactApp Root</div>
<?php
        }

        public function shortcode($atts) {
            $rootElement = '<div id="root"></div>';
            return $rootElement;
        } 

        public function quiz_post_scripts() {
            global $post;
            if (isset($post) && $post->post_type == 'reactquiz_quiz') {
                chdir(plugin_dir_path(__FILE__).'frontend/build/static/js/');
                foreach (glob('*.js') as $file) {
                    wp_enqueue_script($file, plugin_dir_url(__FILE__) . 'frontend/build/static/js/' . $file, [], false, true);
                }
            }
        }
    }

    (new ReactQuiz())->register();
}
?>
