-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: localhost
-- 生成日時: 2023 年 11 月 27 日 08:37
-- サーバのバージョン： 10.4.28-MariaDB
-- PHP のバージョン: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `pokeca_shop`
--
CREATE DATABASE IF NOT EXISTS `pokeca_shop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pokeca_shop`;

-- --------------------------------------------------------

--
-- テーブルの構造 `card_data`
--

CREATE TABLE `card_data` (
  `card_id` int(11) NOT NULL,
  `card_name` varchar(50) NOT NULL,
  `type` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `card_data`
--

INSERT INTO `card_data` (`card_id`, `card_name`, `type`, `price`, `stock`, `image`) VALUES
(1, 'ブラッキー　058/095', 8, 200, 5, '035350_P_BURAKKI.jpg'),
(2, 'ダイゴの決断　102/096 SR', 1, 18800, 5, '035729_T_DAIGONOKETSUDAN.jpg'),
(3, 'セレビィ　005/021', 2, 200, 5, '038869_P_SEREBII.jpg'),
(4, 'リーフィア　003/067', 2, 200, 5, '041364_P_RIFUIA.jpg'),
(5, 'マグマラシ　010/067', 3, 200, 5, '041371_P_MAGUMARASHI.jpg'),
(6, 'イーブイ　054/067', 12, 200, 5, '041482_P_IBUI.jpg'),
(7, 'ニンフィア　035/071', 6, 200, 5, '041716_P_NINFUIA.jpg'),
(8, 'スイクンV　215/172 SAR', 13, 1580, 5, '042865_P_SUIKUNV.jpg'),
(9, 'シャワーズ　134/165 ', 4, 200, 5, '043455_P_SHIXYAWAZU.jpg'),
(10, 'サンダース　135/165 ', 5, 200, 5, '043456_P_SANDASU.jpg'),
(11, 'ブースター　136/165 ', 3, 200, 5, '043612_P_BUSUTA.jpg'),
(12, 'エーフィ　046/108 ', 6, 200, 5, '043888_P_EFUI.jpg'),
(13, 'ヨーギラス　055/108 ', 7, 200, 5, '043897_P_YOGIRASU.jpg'),
(14, 'キハダ　023/030 ', 1, 200, 5, '044015_T_KIHADA.jpg'),
(15, '頂への雪道　034/038', 1, 200, 5, '044068_T_ITADAKIHENOYUKIDOU.jpg'),
(16, 'カビゴンドール　059/066', 1, 200, 5, '044305_T_KABIGONDORU.jpg'),
(17, 'チリ　083/062 SR', 1, 4480, 5, '044399_T_CHIRI.jpg'),
(18, 'フシギソウ　002/049', 2, 200, 5, '044473_P_FUSHIGISOU.jpg'),
(19, 'マッスグマ　023/049', 12, 200, 5, '044494_P_MASSUGUMA.jpg'),
(20, 'フシギダネ　050/049', 2, 200, 5, '044521_P_FUSHIGIDANE.jpg'),
(21, 'ヒトカゲ　051/049', 3, 200, 5, '044522_P_HITOKAGE.jpg'),
(22, 'レパルダス　048/066', 8, 200, 5, '044294_P_REPARUDASU.jpg'),
(23, 'アブソル　267/414', 8, 200, 5, '040421_P_ABUSORU.jpg'),
(24, 'グラエナ　017/039', 8, 200, 5, '030017_P_GURAENA.jpg'),
(25, 'モルペコ　062/098', 8, 200, 5, '042154_P_MORUPEKO.jpg'),
(26, 'ジラーチ　050/076', 9, 200, 5, '038456_P_JIRACHI.jpg'),
(27, 'コバルオン　040/060', 9, 200, 5, '035201_P_KOBARUON.jpg'),
(28, 'トゲデマル　069/098', 9, 200, 5, '042161_P_TOGEDEMARU.jpg'),
(29, 'エアームド　033/052', 9, 200, 5, '035432_P_EAMUDO.jpg'),
(30, 'アローラサンドパン　052/095', 9, 200, 5, '037116_P_ARORASANDOPAN.jpg'),
(31, 'ニンフィア　067/096', 10, 200, 5, '030442_P_NINFIA.jpg'),
(32, 'マリルリ　063/095', 10, 200, 5, '035355_P_MARIRURI.jpg'),
(33, 'アローラキュウコン　056/095', 10, 200, 5, '037120_P_ARORAKYUUKON.jpg'),
(34, 'ゼルネアス　036/050', 10, 200, 5, '034115_P_ZERUNEASU.jpg'),
(35, 'トゲチック　035/055', 10, 200, 5, '036180_P_TOGECHIKKU.jpg'),
(36, 'キバゴ　317/414', 11, 200, 5, '040788_P_KIBAGO.jpg'),
(37, 'レシラム　051/078', 11, 200, 5, '030906_P_RESHIRAMU.jpg'),
(38, 'ハクリュー　067/094', 11, 200, 5, '036814_P_HAKURYU.jpg'),
(39, 'ラティアス　105/172', 11, 200, 5, '042366_P_RATEIASU.jpg'),
(40, 'ラティオス　075/100', 11, 200, 5, '040037_P_RATEIOSU.jpg'),
(41, 'ルカリオ　060/139', 7, 200, 5, '043762_P_RUKARIO.jpg'),
(42, 'サンド　027/165', 7, 200, 5, '043509_P_SANDO.jpg'),
(43, 'カラカラ　104/165', 7, 200, 5, '043582_P_KARAKARA.jpg'),
(44, 'リオル　008/023', 7, 200, 5, '042710_P_RIORU.jpg'),
(45, 'パッチール　058/066', 12, 200, 5, '044304_P_PATCHIRU.jpg'),
(46, 'イエッサン　063/078', 12, 200, 5, '042687_P_IESSAN.jpg'),
(47, 'エネコロロ　082/100', 12, 200, 5, '040044_P_ENEKORORO.jpg'),
(48, 'ミュウ　005/038', 6, 200, 5, '044039_P_MIXYUU.jpg'),
(49, 'ミミッキュ　050/100', 6, 200, 5, '041854_P_MIMIKKIXYU.jpg'),
(50, 'ムウマ　034/073', 6, 200, 5, '042999_P_MUUMA.jpg'),
(51, 'グレイシア　385/SM-P', 4, 1080, 5, '037183_P_GUREISHIA.jpg'),
(52, 'モココ　134/414', 5, 200, 5, '040617_P_MOKOKO.jpg'),
(53, 'ゼラオラ　014/030', 5, 200, 5, '042239_P_ZERAORA.jpg'),
(54, 'ワンパチ　153/414', 5, 200, 5, '040386_P_WANPACHI.jpg'),
(55, 'モルペコ　024/053', 5, 200, 5, '039841_P_MORUPEKO.jpg'),
(56, 'ミロカロス　145/S-P', 4, 200, 5, '038842_P_MIROKAROSU.jpg'),
(57, 'スイクンV　024/172 RR', 4, 200, 5, '042285_P_SUIKUNV.jpg'),
(58, 'フローゼル　102/414', 4, 200, 5, '040587_P_FUROZERU.jpg'),
(59, 'キュウコンEX　038/165 RR', 3, 200, 5, '043359_P_KIXYUUKONEX.jpg'),
(60, 'ポニータ　077/165', 3, 200, 5, '043555_P_PONITA.jpg'),
(61, 'リーフィアV　071/069 SR', 13, 25800, 5, '039883_P_RIFIAV.jpg'),
(62, 'アママイコ　007/070', 2, 200, 5, '038069_P_AMAMAIKO.jpg'),
(63, 'グレイシアV　077/069 SR', 13, 25800, 5, '039889_P_GUREISHIAV.jpg'),
(64, 'パオジアンEX　093/071 SAR', 13, 7480, 5, '043686_P_PAOJIANEX.jpg'),
(65, 'ギラティナV　111/100 SR', 13, 74800, 5, '042086_P_GIRATEINAV.jpg');

-- --------------------------------------------------------

--
-- テーブルの構造 `card_type`
--

CREATE TABLE `card_type` (
  `type_id` int(11) NOT NULL,
  `type_name` varchar(10) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `card_type`
--

INSERT INTO `card_type` (`type_id`, `type_name`, `type`) VALUES
(1, 'トレーナーズ', 'trainers'),
(2, '草', 'Grass'),
(3, '炎', 'Fire'),
(4, '水', 'Water'),
(5, '雷', 'Electric'),
(6, '超', 'Psychic'),
(7, '闘', 'Fighting'),
(8, '悪', 'Dark'),
(9, '鋼', 'Steel'),
(10, 'フェアリー', 'Fairy'),
(11, 'ドラゴン', 'Dragon'),
(12, '無色', 'Normal'),
(13, 'SAR', 'SAR');

-- --------------------------------------------------------

--
-- テーブルの構造 `customer_data`
--

CREATE TABLE `customer_data` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `pass` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `customer_data`
--

INSERT INTO `customer_data` (`customer_id`, `name`, `address`, `mail`, `pass`) VALUES
(1, '田中太郎', '大阪府', 'aaa@aaa.com', 'aaaa'),
(2, '鈴木', '大阪府', 'bbb@bbb.com', 'bbbb'),
(3, '寿　司', '福岡県北九州市若松区', 'ccc@ccc.com', 'cccc');

-- --------------------------------------------------------

--
-- テーブルの構造 `order_data`
--

CREATE TABLE `order_data` (
  `order_id` int(11) NOT NULL,
  `order_number` int(11) NOT NULL,
  `customer` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `order_item`
--

CREATE TABLE `order_item` (
  `order_number` int(11) NOT NULL,
  `card_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `card_data`
--
ALTER TABLE `card_data`
  ADD PRIMARY KEY (`card_id`),
  ADD KEY `type` (`type`);

--
-- テーブルのインデックス `card_type`
--
ALTER TABLE `card_type`
  ADD PRIMARY KEY (`type_id`);

--
-- テーブルのインデックス `customer_data`
--
ALTER TABLE `customer_data`
  ADD PRIMARY KEY (`customer_id`);

--
-- テーブルのインデックス `order_data`
--
ALTER TABLE `order_data`
  ADD PRIMARY KEY (`order_id`) USING BTREE,
  ADD KEY `customer` (`customer`);

--
-- テーブルのインデックス `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`order_number`,`card_id`),
  ADD KEY `card_id` (`card_id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `card_data`
--
ALTER TABLE `card_data`
  MODIFY `card_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- テーブルの AUTO_INCREMENT `card_type`
--
ALTER TABLE `card_type`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- テーブルの AUTO_INCREMENT `customer_data`
--
ALTER TABLE `customer_data`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- テーブルの AUTO_INCREMENT `order_data`
--
ALTER TABLE `order_data`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `card_data`
--
ALTER TABLE `card_data`
  ADD CONSTRAINT `card_data_ibfk_1` FOREIGN KEY (`type`) REFERENCES `card_type` (`type_id`);

--
-- テーブルの制約 `order_data`
--
ALTER TABLE `order_data`
  ADD CONSTRAINT `order_data_ibfk_1` FOREIGN KEY (`customer`) REFERENCES `customer_data` (`customer_id`);

--
-- テーブルの制約 `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `card_data` (`card_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
