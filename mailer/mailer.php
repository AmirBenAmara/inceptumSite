<?php
require 'PHPMailer/PHPMailerAutoload.php';

class AlienMailer
{
    /**
     * PHPMailer instance
     * @var object
     */
    private $mailer;

    /**
     * Input fields map with email field name
     * @var array
     */
    private $fieldsMap;

    /**
     * Mailer email configurations
     * @var array
     */
    private $config;

    /**
     * Primary setup
     */
    public function __construct()
    {
        $this->mailer    = new PHPMailer();

        $config          = require('config.php');
        $this->fieldsMap = $config['fields_map'];
        $this->config    = $config['mailer'];
    }

    /**
     * Send email
     * @return void
     */
    public function sendMail()
    {
        $template = $this->createTemplate();

        $this->mailer->setFrom($this->config['from_email'], $this->config['from_name']);
        $this->mailer->addAddress($this->config['to_email'], $this->config['to_name']);
        $this->mailer->Subject = $this->config['subject'];
        $this->mailer->Body    = $template;

        if(!$this->mailer->send()) {
            $this->sendResponse(array('success' => false));
        } else {
            $this->sendResponse(array('success' => true));
        }
    }

    /**
     * Create email template string form user input.
     * @return string Email string
     */
    private function createTemplate()
    {
        $template = '';
        $id = $this->getMapId();

        foreach ($this->fieldsMap[$id] as $field => $value)
        {
            $fieldValue = $this->getPostData($field, '[Empty]');
            $template  .= "{$value}: {$fieldValue}\n";
        }

        return $template;
    }

    private function getMapId()
    {
        return $this->getPostData('id', 'DEFAULT');
    }

    private function getPostData($field, $default)
    {
        return (isset($_POST[$field]) && $_POST[$field]) ? $_POST[$field] : $default;
    }


    private function sendResponse($response)
    {
        @header( 'Content-Type: application/json; charset=UTF-8' );
        echo json_encode($response);
        die();
    }

}

$alienMailer = new AlienMailer;
$alienMailer->sendMail();
