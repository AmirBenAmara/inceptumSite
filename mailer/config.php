<?php
/**
 * Mailer config file.
 *
 * @author ThemeBucket <themebucket@gmail.com>
 * @version 0.1.0
 */

return array(
    /**
     * Email settings
     */
    'mailer' => array(
        'subject'    => 'Website Contact Form',
        'from_email' => 'from@example.com',
        'from_name'  => 'Jane Doe',
        'to_email'   => 'to@example.com',
        'to_name'    => '' // Optional 
        ),

    /**
     * Fields map
     */
    'fields_map' => array(
        'DEFAULT' => array(
            'name'    => 'Name',
            'email'   => 'Email',
            'message' => 'Message',
            ),

        'FORM2' => array(
            'name'    => 'Name',
            'email'   => 'Email',
            'message' => 'Message',
            'phone'   => 'Phone Number'
            ),
        )
    );