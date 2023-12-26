-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2023 at 12:40 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id_comment` int(11) NOT NULL,
  `created_by` varchar(30) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `id_user_fk` int(11) NOT NULL,
  `id_topic_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id_comment`, `created_by`, `content`, `created_at`, `id_user_fk`, `id_topic_fk`) VALUES
(36, 'marinap', 'je shume e mire marina', '2023-01-30 21:16:37', 1, 3),
(37, 'marinap', 'ghjkl', '2023-01-30 23:56:27', 1, 2),
(38, 'marinap', 'po', '2023-01-31 00:01:04', 1, 5),
(39, 'test1', 'yes\r\n', '2023-01-31 00:13:02', 13, 6),
(40, 'test1', 'aaaaaaaaaaaaaaa', '2023-01-31 10:13:33', 13, 2);

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `id_donation` int(11) NOT NULL,
  `donator_name` varchar(30) NOT NULL,
  `donator_surname` varchar(30) NOT NULL,
  `donator_email` varchar(255) NOT NULL,
  `phone_number` varchar(8) NOT NULL,
  `prefix` varchar(5) NOT NULL DEFAULT '+3556',
  `card_number` varchar(40) NOT NULL,
  `animal_type` varchar(30) NOT NULL,
  `message` varchar(255) NOT NULL,
  `id_user_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`id_donation`, `donator_name`, `donator_surname`, `donator_email`, `phone_number`, `prefix`, `card_number`, `animal_type`, `message`, `id_user_fk`) VALUES
(10, 'fghjk', 'ghj', 'ghj@gmail.com', '+3556912', '+3556', '1234', 'zgjedhje', 'wert', 1),
(11, 'Marina', 'Petani', 'm@gmail.com', '+3556912', '+3556', '1234', 'zgjedhje', 'hjk', 1),
(12, 'Marina', 'Petani', 'm@gmail.com', '+3556912', '+3556', '1234', 'zgjedhje', 'dfgh', 1),
(13, 'Marina', 'Petani', 'm@gmail.com', '+3556912', '+3556', '1234', 'qenushi_coco', 'nm', 1),
(14, 'ghjk', 'wsedf', 'm@gmail.com', '+3556345', '+3556', '34', 'qenushi_coco', 'ert', 1),
(15, 'Marina', 'Petani', 'm@gmail.com', '+3556', '+3556', '1234', 'qenushi_coco', 'wert', 1),
(16, 'Gerind111', 'Tershana', 'gerindt@gmail.com', '+3556974', '+3556', '11112222', 'qenushi_coco', 'adasda', 37);

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

CREATE TABLE `topics` (
  `id_topic` int(11) NOT NULL,
  `topic_name` varchar(30) NOT NULL,
  `content` text NOT NULL,
  `topic_img` varchar(255) NOT NULL,
  `created_by` varchar(30) NOT NULL,
  `id_user_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`id_topic`, `topic_name`, `content`, `topic_img`, `created_by`, `id_user_fk`) VALUES
(1, 'INTO THE WILD', '', 'photos/wild.jpg', 'marinap', 1),
(2, 'OH LA LA DANS MON ZOO', '<br>Zoo Park Tirana 2022, një hapësirë e transformuar dhe e përkryer për argëtimin e fëmijëve, është rikonceptuar si një mjedis i përshtatshëm për kafshët. Një hapësirë e veçantë në Zoo Park i është dedikuar klasave didaktike. Këto mjedise do të mirëpresin nxënës dhe studentë duke u ofruar mundësi për të eksploruar botën e larmishme të kafshëve. U rihap në Qershor 2022. <br>\r\nVizita në Kopshtin Zoologjik do të jetë një aktivitet që zgjat gjithë ditën, ku përfshihen zona pikniku përgjatë itinerareve të lëvizjes, hapësira të gjelbra të lira nga strukturat dhe të veçuara për vizitorët.<br>\r\n\r\nÇmimi i biletës:<br>\r\n• Për të rritur:<br>\r\nTarifë e plotë: 300 lekë <br>\r\nTarifë e pjesshme: 200 lekë<br>\r\n• Për fëmijë:<br>\r\nTarifë e plotë: 200 lekë<br>\r\nTarifë e pjesshme: 100 lekë<br>\r\n\r\n• Karta e Studentit: Studentët tarifohen me 50% të pagesës, pas paraqitjes së Kartës së Studentit.<br>\r\n\r\nKy mjedis i ri që i është shtuar Tiranës është padyshim një nga investimet më të diskutueshmë dhe një investim që dhe njëherë mund të vërtetojë se sa të aftë ose jo jemi ne për t’` kujdesur për botën e egër në një qytet të industrializuar. Por nuk harrohet lehtë se ky projekt vjen pas skandalit me kopshin zoologjik të Fierit dhe Tiranës të cilët u mbyllën sepse nuk plotësonin kushtet optimale të mbajtjes së kafshëvë duke i çuar ato drejt degradimit fizik. Por u dha një mundësi e re, e cila do pak kohë për të parë sa do funksionojë. <br>\r\nA e keni vizituar deri tani kopshtin e ri zoologjik? Si ju është dukur? Çfarë mendoni për të shkuarën dhe vijimësinë e këtij projekti?\r\n\r\n       ', 'photos/zoo.jpg', 'marinap', 1),
(3, 'PURRFECT BUT IN DANGER', '<br><b>“Në një botë të përsosur çdo qen do të kishte një shtëpi dhe çdo shtepi do të kishte një qen.”</b><br>\r\nÇfarë është tepër shqetësuese përveç mizorisë ndaj kafshëvë që nuk merr vëmendje mjaftueshëm në mediat tona është sesi zonat ku 4-putroshat tanë luajnë apo thjesht lëvizin po helmohen çdo ditë. S`është i largët rasti kur zona e ish-Ekspozitës në Tiranë apo zona e Liqenit Artificial u helmua dhe shumë qenusha mund të jenë dëmtuar nga kjo pakujdesi apo ligësi.<br>\r\nMë poshtë është paraqitur legjislacioni me nenin e përditësuar 207 i cili ka shtuar katër pika që dënon rreptësisht keqtrajtimin e kafshëve. Lexojeni me vëmendje që ta dini sesi mund të mbroni shokun tuaj apo të denonconi keqbërësit. A ka të tjera gjëra që i shqetësojnë kafshët tuaja shtëpiake? Ndani mendimet tuaja në sektorin e komenteve më poshtë.\r\n<br>\r\nNë Fletoren Zyrtare janë bërë ndryshime në nenin 207, në të cilin bashkëngjiten nenet 207/a, 207/b, 207/c dhe 207/ç, të cilat i lexoni në vijim: <br>\r\n<b>Braktisja e kafshës së shoqërimit: </b>Kur nga braktisja e kafshës së shoqërimit ose nga mosvendosja e maskës mbrojtëse kafshës së shoqërimit, në ambiente publike ose në mjedise të hapura për publikun, kanë ardhur pasoja në dëm të shëndetit të një personi, dënohet me gjobë ose burgim deri në gjashtë muaj.\r\nKur nga vepra penale ka ardhur plagosja e rëndë e një personi, dënohet me burgim nga një deri në pesë vjet. Kur nga vepra penale ka ardhur vdekja e një personi, dënohet me burgim nga tre deri në dhjetë vjet.<br>\r\n<b>Vrasja me dashje e kafshës së shoqërimit: </b> Vrasja me dashje e kafshës së shoqërimit dënohet me gjobë ose me burgim deri në gjashtë muaj.<br>\r\n<b>Keqtrajtimi i kafshës: </b> Keqtrajtimi ose torturimi i një kafshe, duke i shkaktuar dëmtime të përhershme shëndetësore, dënohet me gjobë ose me burgim deri në tre muaj. Kur vepra ka sjellë si pasojë vdekjen e kafshës, dënohet me burgim deri në gjashtë muaj.<br>\r\n<b>Ndeshjet ndërmjet kafshëve: </b>Promovimi, organizimi ose drejtimi i ndeshjeve ndërmjet kafshëve që shkaktojnë vuajtjen ose torturimin e kafshëve, dënohet me gjobë ose me burgim deri në tre muaj. Dhënia e kafshëve për ndeshje, rritja ose trajnimi i kafshëve me qëllim përdorimin apo shitjen për ndeshje, dënohet me gjobë ose me burgim deri në gjashtë muaj.<br>\r\nVënia e basteve në ndeshje të zhvilluara midis kafshëve, dënohet me gjobë ose me burgim deri në dy muaj. Kur vepra ka sjellë si pasojë vdekjen e kafshës, dënohet me burgim deri në gjashtë muaj. \r\n', 'photos/paw.jpeg', 'marinap', 1),
(4, 'ANGRY FISH', '', 'photos/fish.jpeg', 'marinap', 1),
(5, 'CHIRP CHIRP', '<br>7 speciet më të rrezikuara të shpendëve në botë<br>\r\nZogjtë luajnë një rol kritik në ruajtjen e ekosistemeve natyrore. Ato ndihmojnë në pjalmimin e bimëve,  shpërndajnë farat dhe mbështesin ekuilibrin delikat midis bimës dhe barngrënësit, grabitqarit dhe gjahut. Por aktivitetet njerëzore po copëzojnë habitatet natyrore të zogjve duke kërcënuar mbijetesën e specieve të panumërta. Këta janë vetëm shtatë nga speciet më të rrezikuara të shpendëve në botë që kanë nevojë urgjente për t\'u shpëtuar.<br>\r\n1. Kakapo<br>\r\nKakapo i njohur gjithashtu si papagalli buf, një papagall nate në Zelandën e Re. Historikisht, ata bredhin nëpër Polinezi dhe Zelandën e Re, por sot, speciet e zogjve të rrezikuar në mënyrë kritike janë të kufizuara në vetëm dy ishuj të vegjël në brigjet e Zelandës së Re jugore. Kanë mbetur vetëm rreth 140. Megjithë përpjekjet, duke filluar nga më shumë se 125 vjet më parë, diversiteti gjenetik mbetet i ulët brenda popullatës kakapo dhe është ende jashtëzakonisht i prekshëm ndaj zhdukjes, veçanërisht me shpërthimet e sëmundjeve.<br>\r\n2. Kiwi<br>\r\nZelanda e Re është gjithashtu shtëpia e një specie tjetër të rrezikuar në mënyrë kritike, kiwi, me vetëm pesë specie të mbetura në natyrë. Ashtu si kakapo, kiwi kishte pak mbrojtje kundër grabitqarëve pushtues. Masat e dedikuara të ruajtjes kanë rritur shifrat në rreth 1600 në natyrë sot, duke përfshirë një strategji: shkencëtarët mbledhin vezë kiwi për t\'u inkubuar në një laborator. Vezët zëvendësohen me ato artificiale të printuara 3D përpara se vezët e vërteta t\'i kthehen nënës kur të vijë koha për t\'u çelur. Megjithatë, jo të gjitha llojet e kiwit po ruhen me sukses. Lloji rowi për shembull konsiderohet \"i cenueshëm\" nga Bashkimi Ndërkombëtar për Ruajtjen e Natyrës (IUCN) me vetëm 400 individë të mbetur.<br>\r\n3. Condor<br>\r\nPavarësisht se është zogu më i madh i egër i njohur në Amerikën e Veriut - me një hapje krahësh prej 9.5 këmbë dhe me peshë deri në 25 paund - dhe historikisht duke filluar nga Kalifornia në Florida dhe Kanadaja Perëndimore në Meksikën Veriore, Kondori i Kalifornisë tani gjendet kryesisht në shtetet e Kalifornisë , Arizona dhe Utah. Për shkak të helmimit të shfrenuar nga plumbi, ku zogjtë shpesh gëlltisin fragmente plumbash të mbetura në trupat e gjahut dhe konsumit të pesticideve DDT, i cili zvogëloi trashësinë e lëvozhgës së vezëve, speciet e shpendëve janë shtyrë në prag të zhdukjes. Në vitet 1980, mbetën vetëm gjashtë individë në natyrë. Shërbimi i Peshkut dhe Kafshëve të Egra në SHBA prezantoi një program rikuperimi, i cili përfundimisht ndihmoi në rritjen e numrit të popullsisë deri në mbi 500.<br>\r\n4. Hyacinth Macaw<br>\r\nKy papagall blu është papagalli më i madh fluturues në botë. Ndonëse dikur ishin përhapur gjerësisht në të gjithë Brazilin, tani gjenden kryesisht në zona të vogla si p.sh. në shtetin e Pará. Pastrimi i tokës dhe shpyllëzimi në Amazonë ka qenë kërcënimi i vetëm më i madh për speciet, duke hequr vazhdimisht habitatet dhe burimet natyrore të çmuara të specieve. Gjuetia pa leje dhe tregtia ekzotike e kafshëve shtëpiake rezultuan gjithashtu në të paktën 10,000 zogj të kapur në vitet 1980. Sot, vlerësimet tregojnë rreth 2000-6500 individë të mbetur në natyrë.<br>\r\n5. Mariana Fruit Dove <br>\r\nVendas dhe endemik në territorin e ishullit amerikan të Guam dhe Ishujt e Marianas Veriore, respektivisht dhe zogu zyrtar i këtij të fundit, pëllumbi Mariana u zhduk deri në vitet 1980 për shkak të specieve pushtuese. Në të gjithë ishujt e tjerë, popullsia totale e pëllumbave ra në mijëra për shkak të grabitjes dhe humbjes së habitatit. Pavarësisht nga programet e mbarështimit të kryera nga disa kopshte zoologjike, duke përfshirë kopshtin zoologjik St. Louis, pëllumbi mbetet i kategorizuar si i rrezikuar në Listën e Kuqe të IUCN.<br>\r\n6. Struci i Afrikës së Veriut <br>\r\nBrenda shekullit të kaluar, zogu më i madh në të gjithë shkretëtirën e Saharasë u bë një pamje e rrallë dhe e kufizuar në katër vende (Kameruni, Çadi, Republika e Afrikës Qendrore dhe Senegali). Struci i Afrikës Veriore humbi 99.8% të gamës së tij historike dhe një pjesë të madhe të popullsisë për shkak të kombinimit të humbjes së habitatit nga shndërrimi i tokës, konkurrenca ushqimore nga kullotja e bagëtive, shkretëtirëzimi, si dhe gjuetia pa leje për pendët, mishin dhe vezët. Ka pasur përpjekje të mëdha për të rivendosur speciet, duke përfshirë importimin dhe rifutjen e më shumë strucave në parqet kombëtare në rajon, si dhe rehabilitimin e habitatit për të përmirësuar rrethimin dhe menaxhimin e bagëtive.<br>\r\n7. Burrowing Owl<br>\r\nBufi është një nga speciet më të vogla të bufëve dhe mund të gjendet më së shumti në livadhet e Kanadasë. Humbja dhe fragmentimi i habitatit të shkaktuar nga njeriu, duke përfshirë shndërrimin e tokës për prodhimin e të korrave, kanë bërë që popullsia e saj të bjerë në më pak se 1000 çifte në vend. Fermerët kanë reduktuar në mënyrë drastike gjahun e bufëve. Përdorimi i pesticideve në bujqësi po dëmton gjithashtu mbijetesën e specieve; një numër i madh kanë vdekur nga gëlltitja indirekte e kimikateve toksike kur konsumojnë kufomat e kafshëve.\r\n', 'photos/bir.jpg', 'marinap', 1),
(6, 'ANIMAL CRUELTY', '<br>Numri tronditës i rasteve të mizorisë së kafshëve të raportuara çdo ditë është vetëm maja e ajsbergut - shumica e rasteve nuk raportohen kurrë. Ndryshe nga krimet e dhunshme kundër njerëzve, rastet e abuzimit me kafshët nuk përpilohen nga agjencitë shtetërore, duke e bërë të vështirë llogaritjen se sa të zakonshme janë ato. Megjithatë, ne mund të përdorim informacionin që është në dispozicion për t\'u përpjekur të kuptojmë dhe parandalojmë rastet e abuzimit. <br>\r\nKush abuzon me kafshët?<br> \r\nMizoria dhe neglizhenca i kalojnë të gjithë kufijtë social dhe ekonomik dhe raportet e mediave sugjerojnë se abuzimi me kafshët është i zakonshëm si në zonat rurale ashtu edhe në ato urbane. Mizoria e qëllimshme ndaj kafshëve është e lidhur ngushtë me krime të tjera, duke përfshirë dhunën ndaj njerëzve. Ata që vuajnë nga një çrregullim mund të imponojnë neglizhencë të rëndë mbi kafshët. Neglizhenca serioze e kafshëve është shpesh një tregues i njerëzve që kanë nevojë për shërbime të shëndetit social ose mendor. Viktimat më të zakonshme, abuzimi i të cilave raportohet më shpesh janë qentë, macet, kuajt dhe bagëtitë.<br>\r\nMizoria e organizuar si lufta e qenve, lufta me gjela dhe forma të tjera të mizorisë së organizuar ndaj kafshëve shkojnë paralelisht me krime të tjera. Dhjetra vrasje kanë ndodhur në përleshje gjelash dhe qensh. <br>\r\nMizori tjetër është përdorimi i kafshëve për tregti duke i mohuar kështu habitatin e tyre natyror. Ndryshimi i habitatit të një specieje është një nga faktorët kryesor që çon në zhdukjen e saj. Kjo gjë bëhet për përfitime monetare.<br>\r\nMizoria më shqetësuese e të gjithave është përdorimi i kafshëve si mjete testuese për prodhimin e produkteve kozmetike dhe jo vetëm. Më poshtë mund të ndiqni një film të shkurtër të prodhuar nga Jeff Vespa dhe më pas të ndani mendimin tuaj në komente ose duke denoncuar raste të abuzimit të kafshëve kur ju keni qënë dëshmitar. <br>\r\n<a href=\"https://youtu.be/G393z8s8nFY\">SAVE RALPH</a>\r\n', 'photos/photo6.jpg', 'marinap', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `cf_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `name`, `surname`, `username`, `password`, `is_admin`, `cf_password`) VALUES
(1, 'Marina', 'Petani', 'marinap', '827ccb0eea8a706c4c34a16891f84e7b', 1, '827ccb0eea8a706c4c34a16891f84e7b'),
(13, 'test1', 'test1', 'test1', '5a105e8b9d40e1329780d62ea2265d8a', 0, '5a105e8b9d40e1329780d62ea2265d8a'),
(35, 'ghjk', 'dsfg', 'fghj', '202cb962ac59075b964b07152d234b70', 0, '202cb962ac59075b964b07152d234b70'),
(36, 'mari', 'petani', 'marip', '8f97d571a06ce5b55088fceeea0adba7', 0, '8f97d571a06ce5b55088fceeea0adba7'),
(37, 'Gerind', 'Tershana', 'GerindT', '716df29d06d787b72aaa67898d0ac5a0', 0, '716df29d06d787b72aaa67898d0ac5a0'),
(45, 'ger', 'ter', 'gerter', '81dc9bdb52d04dc20036dbd8313ed055', 0, '81dc9bdb52d04dc20036dbd8313ed055');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `id_topic_fk` (`id_topic_fk`),
  ADD KEY `id_user_fk` (`id_user_fk`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id_donation`),
  ADD KEY `id_user_fk` (`id_user_fk`);

--
-- Indexes for table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`id_topic`),
  ADD KEY `id_user_fk` (`id_user_fk`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id_donation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `id_topic` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id_topic_fk`) REFERENCES `topics` (`id_topic`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`id_user_fk`) REFERENCES `users` (`id_user`);

--
-- Constraints for table `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`id_user_fk`) REFERENCES `users` (`id_user`);

--
-- Constraints for table `topics`
--
ALTER TABLE `topics`
  ADD CONSTRAINT `topics_ibfk_1` FOREIGN KEY (`id_user_fk`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
