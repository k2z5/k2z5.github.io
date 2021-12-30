SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT=0;
START TRANSACTION;
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE=NO_AUTO_VALUE_ON_ZERO */;
/*!40101 SET NAMES utf8 */;
CREATE TABLE `e2BlogActions` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `EntityID` int(10) unsigned NOT NULL DEFAULT '0',
  `Stamp` int(10) unsigned NOT NULL DEFAULT '0',
  `HitCount` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `EntityID` (`EntityID`,`Stamp`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

ALTER TABLE `e2BlogActions` DISABLE KEYS;
INSERT INTO `e2BlogActions` VALUES('2', '2', '1530273600', '4'), ('3', '2', '1530306000', '2'), ('4', '4', '1530381600', '3'), ('5', '2', '1530381600', '3'), ('7', '4', '1530784800', '1'), ('8', '4', '1530795600', '1'), ('9', '2', '1530795600', '1'), ('10', '1', '1530795600', '1'), ('11', '5', '1530795600', '2'), ('12', '2', '1530828000', '1'), ('13', '5', '1530838800', '1'), ('14', '1', '1530846000', '1'), ('15', '2', '1530878400', '1'), ('16', '1', '1530885600', '1'), ('17', '4', '1530918000', '1'), ('18', '6', '1531040400', '2'), ('19', '4', '1531040400', '3'), ('20', '2', '1531072800', '1'), ('21', '4', '1531072800', '1'), ('22', '2', '1531152000', '1'), ('23', '4', '1531155600', '1'), ('24', '2', '1531195200', '1'), ('25', '6', '1531202400', '1'), ('26', '4', '1531234800', '1');
ALTER TABLE `e2BlogActions` ENABLE KEYS;
CREATE TABLE `e2BlogAliases` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `EntityType` varchar(1) NOT NULL DEFAULT '',
  `EntityID` int(10) unsigned NOT NULL DEFAULT '0',
  `Alias` varchar(64) NOT NULL DEFAULT '',
  `Stamp` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `Alias` (`Alias`),
  KEY `EntityID` (`EntityID`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

ALTER TABLE `e2BlogAliases` DISABLE KEYS;
INSERT INTO `e2BlogAliases` VALUES('1', 'n', '1', 'otkrytie', '1528873810'), ('2', 't', '1', 'mobilnoe-menyu', '1530274010'), ('3', 'n', '2', 'sravnenie-saas-redaktorov-koda', '1530274149'), ('4', 't', '2', 'jquery', '1530382523'), ('5', 'n', '4', 'esche-odna-mobilnaya-mnogourovnevaya-menyushka', '1530382601'), ('6', 'n', '5', 'jquery-quiz', '1530797230'), ('7', 'n', '6', 'adaptivnoe-menyu-s-animaciey-css-blur-i-transition', '1531041025'), ('8', 't', '3', 'toggl-master', '1531249258');
ALTER TABLE `e2BlogAliases` ENABLE KEYS;
CREATE TABLE `e2BlogComments` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `NoteID` int(10) unsigned NOT NULL DEFAULT '0',
  `AuthorName` varchar(255) NOT NULL DEFAULT '',
  `AuthorEmail` varchar(255) NOT NULL DEFAULT '',
  `Text` mediumtext,
  `Reply` mediumtext,
  `IsVisible` tinyint(1) NOT NULL DEFAULT '1',
  `IsFavourite` tinyint(1) NOT NULL DEFAULT '0',
  `IsReplyVisible` tinyint(1) NOT NULL DEFAULT '0',
  `IsReplyFavourite` tinyint(1) NOT NULL DEFAULT '0',
  `IsAnswerAware` tinyint(1) NOT NULL DEFAULT '1',
  `IsSubscriber` tinyint(1) NOT NULL DEFAULT '0',
  `IsSpamSuspect` tinyint(1) NOT NULL DEFAULT '0',
  `IsNew` tinyint(1) NOT NULL DEFAULT '0',
  `Stamp` int(10) unsigned NOT NULL DEFAULT '0',
  `LastModified` int(10) unsigned NOT NULL DEFAULT '0',
  `ReplyStamp` int(10) unsigned NOT NULL DEFAULT '0',
  `ReplyLastModified` int(10) unsigned NOT NULL DEFAULT '0',
  `IP` varchar(15) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `NoteID` (`NoteID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `e2BlogKeywords` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Keyword` varchar(255) NOT NULL DEFAULT '',
  `OriginalAlias` varchar(64) NOT NULL DEFAULT '',
  `Description` mediumtext,
  `Uploads` mediumtext,
  `IsFavourite` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

ALTER TABLE `e2BlogKeywords` DISABLE KEYS;
INSERT INTO `e2BlogKeywords` VALUES('1', 'мобильное меню', 'mobilnoe-menyu', '', NULL, '0'), ('2', 'jquery', 'jquery', '', NULL, '0'), ('3', 'toggl master', 'toggl-master', '', NULL, '0');
ALTER TABLE `e2BlogKeywords` ENABLE KEYS;
CREATE TABLE `e2BlogNotes` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) NOT NULL DEFAULT '',
  `Text` mediumtext,
  `FormatterID` varchar(32) NOT NULL DEFAULT 'neasden',
  `OriginalAlias` varchar(64) NOT NULL DEFAULT '',
  `Uploads` mediumtext,
  `IsPublished` tinyint(1) NOT NULL DEFAULT '0',
  `IsCommentable` tinyint(1) NOT NULL DEFAULT '0',
  `IsVisible` tinyint(1) NOT NULL DEFAULT '1',
  `IsFavourite` tinyint(1) NOT NULL DEFAULT '0',
  `Stamp` int(10) unsigned NOT NULL DEFAULT '0',
  `LastModified` int(10) unsigned NOT NULL DEFAULT '0',
  `Offset` int(11) NOT NULL DEFAULT '0',
  `IsDST` tinyint(1) NOT NULL DEFAULT '0',
  `IsIndexed` tinyint(1) NOT NULL DEFAULT '0',
  `IsExternal` tinyint(1) NOT NULL DEFAULT '0',
  `SourceID` int(10) unsigned NOT NULL DEFAULT '0',
  `SourceNoteID` int(10) unsigned NOT NULL DEFAULT '0',
  `SourceNoteURL` varchar(255) NOT NULL DEFAULT '',
  `SourceNoteJSONURL` varchar(255) NOT NULL DEFAULT '',
  `SourceNoteData` mediumtext,
  PRIMARY KEY (`ID`),
  KEY `Stamp` (`Stamp`),
  FULLTEXT KEY `Title` (`Title`,`Text`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

ALTER TABLE `e2BlogNotes` DISABLE KEYS;
INSERT INTO `e2BlogNotes` VALUES('1', 'Открытие', 'Привет! Основная идея на 2ю половину 2018 года - продолжение интенсивного движения в направления цели \"Стать веб-разработчиком с нуля\". Что сделано? \r\n1. Пройден курс \"Базовых HTML/CSS\" от HTMLAcademy (в ноябре - декабре 2017 года). Задан определенный ритм в прохождении обучения основам. Сверстано несколько сайтов (gremlin.cf, nerds, sedona, device, zvereva.tk, osteopathe.ml)\r\n2. Пройден и успешно защищен диплом по курсу \"Продвинутый HTML/CSS\" февраль 2018 года. Параллельно взят первый проект в работу.\r\n3. Завершен проект any.gift. Верстка, javascript реализация. Дизайн о Максима. Итоги: суммарно 700 часов рабочего времени, 4 месяца, 6  часов в неделю включая выходные дни, 140 рублей час доход. Бесценный опыт, который еще предстоит проанализировать и уяснить.\r\n4. Планы на 2018 год: обучение плюс работа. \r\n - jquery\r\n - bootstrap\r\n - работа удаленка желательно постоянка\r\n - markdown, jekyll, etc.\r\n - автоматизация сборок, sass.', 'neasden', 'otkrytie', 'a:0:{}', '1', '0', '1', '0', '1528873810', '1528873800', '10800', '0', '0', '0', '0', '0', '', '', ''), ('2', 'jsFiddle vs Codepen', 'Конец месяца.. Я начал погружаться в Jquery & Bootstrap.. И сразу возникла потребность сохранять где-то кусочки кода.\r\nСамому копипастить код в разном оформлении с разными тегами конечно не комильфо, выбрал готовые редакторы- CodePen и jsFiddle. Последний изначально нравился больше, но в силу некоторых причин в итоге отпал...\r\nСейчас вы все сами увидите:\r\n	<iframe width=\"100%\" height=\"300\" src=\"//jsfiddle.net/wanndrueakk/6ftgp458/3/embedded/\" allowfullscreen=\"allowfullscreen\" allowpaymentrequest frameborder=\"0\"></iframe>\r\n	\r\n	\r\n<iframe height=\'265\' scrolling=\'no\' title=\'mobile-menu\' src=\'//codepen.io/wanndrueakk/embed/BVvZYy/?height=265&theme-id=0&default-tab=css,result&embed-version=2\' frameborder=\'no\' allowtransparency=\'true\' allowfullscreen=\'true\' style=\'width: 100%;\'>See the Pen <a href=\'https://codepen.io/wanndrueakk/pen/BVvZYy/\'>mobile-menu</a> by w3n0 (<a href=\'https://codepen.io/wanndrueakk\'>@wanndrueakk</a>) on <a href=\'https://codepen.io\'>CodePen</a>.\r\n</iframe>\r\nВ первом для того чтобы перейти на результат, нужно сделать лишний щелчок мышью... И размерчик не тот. Во втором все наглядно..\r\nНа удивление в обоих вариантах почти не оказалось навязчивой рекламы и других \"обвесов\" связанных с бесплатностью тарифа... Возможно, как-нибудь мне и понадобиться платный вариант, но пока этого мне более чем достаточно. Итак, по-моему достойное меню, которое можно использовать и переделывать (совместно с поиском или без) с упором на финансы и консалтинг. ', 'neasden', 'sravnenie-saas-redaktorov-koda', 'a:0:{}', '1', '0', '1', '0', '1530274149', '1530274123', '10800', '0', '1', '0', '0', '0', '', '', ''), ('3', 'Исследование сайтов', '#Авито\r\n\r\n##Переход на мобильную версию: 640px и only screen\r\n<code>\r\n<link rel=\"alternate\" media=\"only screen and (max-width: 640px)\" href=\"https://m.avito.ru/moskva\">\r\n</code>\r\n\r\n##Ширина десктопной версии c с центровкой: 964px\r\n<code>\r\n.col-12 {\r\n    width: 964px;\r\n}\r\n</code>\r\n##Глобальные настройки шрифта\r\n<code>\r\nfont: 13px/1.5 Arial,\'Helvetica Neue\',Helvetica,sans-serif;\r\n</code>\r\n\r\n##Минимальный отступ от края: 18px\r\n##Наличие резиновости: отсутствует\r\n\r\n#Investing\r\n##Минимальный отступ от края: отсутствует (все в край)\r\n##Ширина десктопной версии c с центровкой: 9/70/px\r\n##Переход на мобильную версию: 640px и only screen\r\n<code>\r\n<link rel=\"alternate\" media=\"only screen and (max-width: 640px)\" href=\"https://m.investing.com\">\r\n</code>\r\n\r\n##Глобальные настройки шрифта\r\n<code>\r\n    font-family: Arial,Helvetica,\"Nimbus Sans L\",sans-serif;\r\n    font-size: 12px;\r\n    color: #333;\r\n</code>\r\n##Наличие резиновости: отсутствует\r\n\r\n#Finance.Yahoo.com\r\n## Ширина: 1200px\r\n\r\n#Tradingview.com\r\nАдаптив!\r\nПереход на мобильную версию: 1020px\r\nвторой брейкпоинт: 768px\r\nОтдельной версии для мобильных нет.', 'neasden', 'issledovanie-saytov', 'a:0:{}', '0', '0', '1', '0', '1530308777', '1530310714', '10800', '0', '1', '0', '0', '0', '', '', ''), ('4', 'Еще одна многоуровневая мобильная менюшка', '<iframe height=\'265\' scrolling=\'no\' title=\'ZRwQBx\' src=\'//codepen.io/wanndrueakk/embed/ZRwQBx/?height=265&theme-id=0&default-tab=html,result&embed-version=2\' frameborder=\'no\' allowtransparency=\'true\' allowfullscreen=\'true\' style=\'width: 100%;\'>See the Pen <a href=\'https://codepen.io/wanndrueakk/pen/ZRwQBx/\'>ZRwQBx</a> by w3n0 (<a href=\'https://codepen.io/wanndrueakk\'>@wanndrueakk</a>) on <a href=\'https://codepen.io\'>CodePen</a>.\r\n</iframe>', 'neasden', 'esche-odna-mobilnaya-mnogourovnevaya-menyushka', 'a:0:{}', '1', '0', '1', '0', '1530382565', '1530382601', '10800', '0', '1', '0', '0', '0', '', '', ''), ('5', 'jQuery quiz', 'Вот, прошел:\r\n\r\njQuery_quiz.PNG\r\n\r\nЗдесь чуть все более печально. Начинаю учится.\r\nBootstrap_quiz.PNG', 'neasden', 'jquery-quiz', 'a:2:{i:0;s:15:\"jQuery_quiz.PNG\";i:1;s:18:\"Bootstrap_quiz.PNG\";}', '1', '0', '1', '0', '1530796338', '1530797230', '10800', '0', '1', '0', '0', '0', '', '', ''), ('6', 'Адаптивное меню с анимацией css blur и transition', '<iframe height=\'265\' scrolling=\'no\' title=\'Красивое меню с blur и transition\' src=\'//codepen.io/wanndrueakk/embed/dKxKOj/?height=265&theme-id=0&default-tab=css,result&embed-version=2\' frameborder=\'no\' allowtransparency=\'true\' allowfullscreen=\'true\' style=\'width: 100%;\'>See the Pen <a href=\'https://codepen.io/wanndrueakk/pen/dKxKOj/\'>Красивое меню с blur и transition</a> by w3n0 (<a href=\'https://codepen.io/wanndrueakk\'>@wanndrueakk</a>) on <a href=\'https://codepen.io\'>CodePen</a>.\r\n</iframe>', 'neasden', 'adaptivnoe-menyu-s-animaciey-css-blur-i-transition', '', '1', '0', '1', '0', '1531041025', '1531040999', '10800', '0', '0', '0', '0', '0', '', '', ''), ('7', 'Toggl master - 47%', 'Хуже чем в прошлый раз?\r\n\r\nToggl_test_today.PNG', 'neasden', 'toggl-master-47', 'a:1:{i:0;s:20:\"Toggl_test_today.PNG\";}', '0', '0', '1', '0', '1531249258', '1531249258', '10800', '0', '0', '0', '0', '0', '', '', NULL);
ALTER TABLE `e2BlogNotes` ENABLE KEYS;
CREATE TABLE `e2BlogNotesKeywords` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `NoteID` int(10) unsigned NOT NULL DEFAULT '0',
  `KeywordID` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `NoteID` (`NoteID`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

ALTER TABLE `e2BlogNotesKeywords` DISABLE KEYS;
INSERT INTO `e2BlogNotesKeywords` VALUES('1', '2', '1'), ('2', '4', '2'), ('3', '4', '1'), ('4', '5', '2'), ('5', '6', '2'), ('6', '6', '1'), ('7', '7', '3');
ALTER TABLE `e2BlogNotesKeywords` ENABLE KEYS;
CREATE TABLE `e2BlogSources` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `TrueID` int(10) unsigned NOT NULL DEFAULT '0',
  `Title` varchar(255) NOT NULL DEFAULT '',
  `AuthorName` varchar(255) NOT NULL DEFAULT '',
  `URL` varchar(255) NOT NULL DEFAULT '',
  `PictureURL` varchar(255) NOT NULL DEFAULT '',
  `IsWhiteListed` tinyint(1) NOT NULL DEFAULT '0',
  `IsTrusted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

COMMIT;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
