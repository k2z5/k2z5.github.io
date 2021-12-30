<?php
class DB
{
    protected static $instance = null;

    public function __construct() {}
    public function __clone() {}

    public static function instance()
    {
        if (self::$instance === null) {
            try {
                $opt  = array(
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => true,
//                     PDO::ATTR_PERSISTENT => true
//                     PDO::ATTR_STATEMENT_CLASS    => array('myPDOStatement'),
                );
                $dsn = 'mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset='.DB_CHAR;
                self::$instance = new PDO($dsn, DB_USER, DB_PASS, $opt);
                self::instance()->exec("set names ".DB_CHAR);
            } catch (PDOException $e) {
                file_put_contents(__DIR__.'/PDOErrors.txt', $e->getMessage()."\n", FILE_APPEND);
                exit('Ошибка подключения к базе данных!');
            }
            }
        return self::$instance;
    }

    public static function __callStatic($method, $args)
    {
        return call_user_func_array(array(self::instance(), $method), $args);
    }

    public static function run($sql, $args = null)
    {
            try {
                $data = self::instance()->prepare($sql);
                $data->execute($args);
                return $data;
            } catch (PDOException $e) {
                file_put_contents(__DIR__.'/PDOErrors.txt', $e->getMessage()."\n", FILE_APPEND);
                return false;
            }
    }

    public static function filter($str)
    {
        return self::instance()->quote($str);
    }

    public static function lastId()
    {
        return self::instance()->lastInsertId();
    }

}

class myPDOStatement extends PDOStatement
{
    function execute($data = array())
    {
        parent::execute($data);
        return $this;
    }
}
