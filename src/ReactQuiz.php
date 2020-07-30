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
            //custom-post-type
            add_action('init', [$this, 'add_post_type']);
            add_action('init', 'flush_rewrite_rules');

            //make post type show up on homepage
            add_action('pre_get_posts', [$this, 'show_post_type']);
            //render the post
            add_filter('the_content', [$this, 'the_content']);
            //quiz post scripts
            add_action('wp_enqueue_scripts', [$this, 'add_scripts']);
        }

        function the_content($content) {
            $post = get_post();
            if ($post->post_type == "reactquiz_quiz") {
                $quiz_meta = get_post_meta($post->ID, 'reactquiz_data');
                $quizData = "''";
                if (isset($quiz_meta) && !empty($quiz_meta)) {
                    $quizData = json_encode($quiz_meta[0]);
                }
                $myContent = "<script>window.quizData = $quizData;</script>";
                $myContent .= '<div id="root">Loading...</div>';
                return $myContent;
            }
        }

        function show_post_type($query) {
            if ( is_home() && $query->is_main_query() ) {
                $query->set( 'post_type', array( 'post', 'page', 'reactquiz_quiz' ) );
            }
            return $query;
        }

        public function add_post_type() {
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
            add_action('save_post', [$this, 'save']);
            remove_post_type_support('reactquiz_quiz', 'editor');
        }

        public function save($post_id) {
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
            add_meta_box('add_meta_box', 'Edit React Quiz', [$this, 'add_meta_box'], null, 'normal');

            chdir(plugin_dir_path(__FILE__).'admin/static/js/');
            foreach (glob('*.js') as $file) {
                wp_enqueue_script($file, plugin_dir_url(__FILE__) . 'admin/static/js/' . $file, [], false, true);
            }
            chdir(plugin_dir_path(__FILE__).'admin/static/css/');
            foreach (glob('*.css') as $file) {
                wp_enqueue_style($file, plugin_dir_url(__FILE__) . 'admin/static/css/' . $file);
            }
        }

        public function add_meta_box($post) {
            $quizData = get_post_meta($post->ID, 'reactquiz_data');
            if (!empty($quizData)) {
                $quizData = json_encode($quizData[0]);
            } else {
                $quizData = "''";
            }

            ?>
                <script>window.quizData = <?php echo $quizData ?></script>
                <div id="root">ReactApp Root</div>
            <?php

        }

        public function add_scripts() {
            global $post;
            if (isset($post) && $post->post_type == 'reactquiz_quiz') {
                chdir(plugin_dir_path(__FILE__).'frontend/static/js/');
                foreach (glob('*.js') as $file) {
                    wp_enqueue_script($file, plugin_dir_url(__FILE__) . 'frontend/static/js/' . $file, [], false, true);
                }
                chdir(plugin_dir_path(__FILE__).'frontend/static/css/');
                foreach (glob('*.css') as $file) {
                    wp_enqueue_style($file, plugin_dir_url(__FILE__) . 'frontend/static/css/' . $file);
                }
            }
        }
    }

    (new ReactQuiz())->register();
}
?>
