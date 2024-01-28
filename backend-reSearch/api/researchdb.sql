-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2024 at 03:10 PM
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
-- Database: `researchdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `CategoryID` int(11) NOT NULL,
  `CategoryName` varchar(255) NOT NULL,
  `CategoryColor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`CategoryID`, `CategoryName`, `CategoryColor`) VALUES
(1, 'NLP', 'info'),
(2, 'AI', 'purple'),
(3, 'ML', 'gray'),
(4, 'DL', 'success'),
(5, 'Computer Vision', 'indigo'),
(6, 'ROBOTICS', 'warning'),
(7, 'IOT', 'pink');

-- --------------------------------------------------------

--
-- Table structure for table `categorytopaper`
--

CREATE TABLE `categorytopaper` (
  `PaperID` int(11) NOT NULL,
  `CategoryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categorytopaper`
--

INSERT INTO `categorytopaper` (`PaperID`, `CategoryID`) VALUES
(1, 1),
(19, 1),
(20, 1),
(21, 1),
(22, 1),
(23, 1),
(24, 1),
(25, 1),
(27, 1),
(28, 1),
(29, 1),
(32, 1),
(36, 1),
(39, 1),
(42, 1),
(1, 2),
(19, 2),
(20, 2),
(22, 2),
(23, 2),
(26, 2),
(27, 2),
(31, 2),
(32, 2),
(33, 2),
(38, 2),
(3, 3),
(4, 3),
(20, 3),
(22, 3),
(30, 3),
(33, 3),
(34, 3),
(35, 3),
(36, 3),
(37, 3),
(38, 3),
(40, 3),
(42, 3),
(20, 4),
(22, 4),
(25, 4),
(30, 4),
(34, 4),
(36, 4),
(37, 4),
(39, 4),
(40, 4),
(22, 5),
(25, 5),
(26, 5),
(34, 5),
(37, 5),
(43, 5),
(21, 6),
(22, 6),
(24, 6),
(26, 6),
(28, 6),
(42, 6),
(43, 6),
(44, 6),
(22, 7),
(24, 7),
(28, 7),
(40, 7),
(41, 7),
(22, 8),
(25, 8),
(29, 8);

-- --------------------------------------------------------

--
-- Table structure for table `categorytouser`
--

CREATE TABLE `categorytouser` (
  `UserID` int(11) NOT NULL,
  `CategoryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categorytouser`
--

INSERT INTO `categorytouser` (`UserID`, `CategoryID`) VALUES
(15, 1),
(15, 2),
(14, 3),
(15, 3),
(14, 4),
(15, 4),
(15, 5),
(15, 6),
(15, 7),
(15, 8);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `CommentID` int(11) NOT NULL,
  `CommentText` varchar(255) NOT NULL,
  `PaperID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `CreatedAt` date NOT NULL DEFAULT current_timestamp(),
  `UpdatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `UserID` int(11) NOT NULL,
  `PaperID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`UserID`, `PaperID`) VALUES
(13, 1),
(13, 3),
(13, 4),
(13, 15),
(13, 18),
(13, 20),
(13, 27),
(13, 30),
(14, 29),
(16, 33),
(17, 33),
(17, 34),
(17, 35),
(17, 36),
(17, 37),
(17, 38);

-- --------------------------------------------------------

--
-- Table structure for table `papers`
--

CREATE TABLE `papers` (
  `PaperID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Authors` varchar(255) NOT NULL,
  `Content` longtext NOT NULL,
  `Abstract` longtext NOT NULL,
  `IsVerified` tinyint(1) NOT NULL DEFAULT 0,
  `VerifiedDate` date DEFAULT NULL,
  `PaperFile` varchar(255) NOT NULL,
  `CreatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `papers`
--

INSERT INTO `papers` (`PaperID`, `UserID`, `Title`, `Authors`, `Content`, `Abstract`, `IsVerified`, `VerifiedDate`, `PaperFile`, `CreatedAt`) VALUES
(33, 16, 'Deep Residual Learning for Image Recognition', 'Kaiming He Xiangyu Zhang,Shaoqing Ren Jian Sun', 'Deeper neural networks have been proven to be more challenging to train due to issues like vanishing gradients and difficulties in capturing meaningful representations. To address these challenges, the authors of the paper introduce a novel approach called the residual learning framework. This framework is designed to facilitate the training of significantly deeper networks compared to previous architectures.\r\n\r\nThe key innovation lies in the explicit reformulation of layers as learning residual functions with reference to the layer inputs. Instead of learning functions directly, the network learns to capture the residual, or the difference between the desired output and the input at each layer. By doing so, the model is encouraged to focus on learning the incremental changes in representations, making the optimization process more manageable.\r\n\r\nThe empirical evidence provided in the paper demonstrates that these residual networks are not only easier to optimize but also exhibit improved accuracy with increased depth. The authors evaluate residual networks on the ImageNet dataset with an impressive depth of up to 152 layers. This depth is eight times greater than that of VGG nets, a notable architecture in the field. Despite the increased depth, residual networks maintain lower complexity, showcasing their efficiency.\r\n\r\nOn the ImageNet dataset, an ensemble of residual nets achieves a remarkable 3.57% error rate on the test set. This outstanding performance resulted in the model securing the 1st place in the ILSVRC 2015 classification task, underscoring the effectiveness of the proposed approach. The authors also extend their analysis to CIFAR-10, experimenting with network depths of 100 and 1000 layers, further demonstrating the scalability and robustness of the residual learning framework.\r\n\r\nThe significance of representation depth is highlighted in the context of visual recognition tasks. The authors observe that, due to the extremely deep representations learned by their model, they achieve a substantial 28% relative improvement on the COCO object detection dataset. This improvement underscores the impact of the proposed residual networks on tasks requiring nuanced and sophisticated feature extraction.\r\n\r\nThe success of deep residual networks is further emphasized through their performance in prestigious competitions. The authors\' submissions to the ILSVRC and COCO 2015 competitions secured 1st places across multiple tasks, including ImageNet detection, ImageNet localization, COCO detection, and COCO segmentation. These achievements underscore the practical relevance and state-of-the-art performance of the residual learning framework in real-world, large-scale visual recognition challenges.\r\n\r\nIn conclusion, the paper introduces a groundbreaking approach to training deeper neural networks through the residual learning framework. The empirical results on ImageNet and CIFAR-10 demonstrate the effectiveness of this approach in terms of both optimization ease and accuracy improvement with increased depth. The impact extends to practical applications, as evidenced by the substantial improvement in object detection tasks and the model\'s success in prominent competitions.', 'Deeper neural networks have been proven to be more challenging to train due to issues like vanishing gradients and difficulties in capturing meaningful representations. To address these challenges, the authors of the paper introduce a novel approach called the residual learning framework. This frame...', 1, '2024-01-01', 'papers/1.pdf', '2024-01-28'),
(34, 16, 'ImageNet Classification with Deep Convolutional Neural Networks', 'Alex Krizhevsky  Ilya Sutskever Geoffrey E. Hinton', 'In this groundbreaking study, the authors describe their achievement in training a large, deep convolutional neural network to tackle the formidable task of classifying 1.2 million high-resolution images in the ImageNet LSVRC-2010 contest. Their approach resulted in a model that outperformed the previous state-of-the-art, showcasing remarkable top-1 and top-5 error rates of 37.5% and 17.0%, respectively, on the test data.\r\n\r\nThe neural network in question is a formidable computational entity, boasting an impressive configuration with 60 million parameters and 650,000 neurons. Its architecture includes five convolutional layers, some of which are followed by max-pooling layers for spatial down-sampling, and three fully-connected layers culminating in a final 1000-way softmax layer for classification. The intricacy of this architecture reflects the depth and complexity necessary to handle the diverse and intricate visual patterns present in the ImageNet dataset.\r\n\r\nA key aspect contributing to the efficiency of the training process is the use of non-saturating neurons, which aids in accelerating the convergence of the network during the training phase. Additionally, the authors leverage a highly efficient GPU implementation of the convolution operation, capitalizing on the parallel processing capabilities of modern graphics processing units to significantly enhance the speed of computation.\r\n\r\nTo address the issue of overfitting, a common concern in deep learning models with a large number of parameters, the authors employ a regularization technique known as \"dropout.\" This method involves randomly dropping out neurons during training, preventing the model from becoming overly reliant on specific neurons and promoting a more robust generalization to unseen data. The efficacy of dropout in mitigating overfitting is demonstrated as a crucial factor in enhancing the model\'s generalization capabilities.\r\n\r\nIn their pursuit of even greater challenges, the authors entered a variant of their model into the ILSVRC-2012 competition. The results were nothing short of spectacular, with the model achieving a top-5 test error rate of 15.3%. This performance stands in stark contrast to the second-best entry, which recorded a considerably higher error rate of 26.2%. The victory in the ILSVRC-2012 competition further solidifies the robustness and generalization power of the proposed neural network architecture.\r\n\r\nThe success of this study is not only attributed to the sheer computational power of the model but also to the thoughtful integration of innovative techniques such as dropout regularization and efficient GPU implementation. The authors\' meticulous attention to detail, both in the architectural design of the neural network and in the strategies employed for training and regularization, underscores the significance of this work in advancing the field of computer vision and deep learning.\r\n\r\nIn conclusion, this research represents a pivotal moment in the development of deep learning models for image classification tasks. The authors have not only demonstrated state-of-the-art performance on the ImageNet dataset but have also showcased the adaptability and robustness of their model through successful participation in a prestigious competition. As the field of deep learning continues to evolve, this study stands as a testament to the importance of sophisticated architectures, efficient implementation, and effective regularization techniques in achieving remarkable results on complex visual recognition tasks.', 'In this groundbreaking study, the authors describe their achievement in training a large, deep convolutional neural network to tackle the formidable task of classifying 1.2 million high-resolution images in the ImageNet LSVRC-2010 contest. Their approach resulted in a model that outperformed the pre...', 1, '2024-01-28', 'papers/2.pdf', '2024-01-28'),
(35, 16, 'ADAM: A METHOD FOR STOCHASTIC OPTIMIZATION', 'Diederik P. Kingma   Jimmy Lei Ba', 'In this seminal paper, the authors introduce Adam, an algorithm designed for first-order gradient-based optimization of stochastic objective functions. Adam stands out for its efficiency, ease of implementation, and adaptability to a wide range of optimization challenges, making it a compelling choice for practitioners in the field. The algorithm leverages adaptive estimates of lower-order moments, offering a dynamic and responsive approach to optimization.\r\n\r\nOne of the key strengths of Adam lies in its simplicity of implementation. The algorithm is designed to be straightforward to integrate into existing optimization frameworks, making it accessible to a broad audience of researchers and practitioners. This ease of use is complemented by the algorithm\'s computational efficiency, a crucial factor when dealing with large-scale problems that involve extensive datasets and numerous parameters.\r\n\r\nMemory efficiency is another notable feature of Adam. The algorithm exhibits minimal memory requirements, allowing it to operate effectively even in scenarios where memory resources are limited. This characteristic is particularly advantageous when dealing with problems that involve vast amounts of data or an extensive parameter space.\r\n\r\nAn intriguing property of Adam is its invariance to diagonal rescaling of the gradients. This means that the algorithm maintains its effectiveness even when the gradients are subjected to scaling along the diagonal direction. This robustness adds to the versatility of Adam, enabling its application to a diverse set of optimization challenges.\r\n\r\nAdam\'s suitability for problems characterized by non-stationary objectives is emphasized in the paper. The algorithm demonstrates resilience in scenarios where the optimization landscape evolves over time, a quality that is crucial in dynamic real-world applications. Furthermore, Adam is well-adapted to problems featuring very noisy and/or sparse gradients, making it a valuable tool in situations where obtaining precise gradient information is challenging.\r\n\r\nThe hyper-parameters of the Adam algorithm are highlighted for their intuitive interpretations and low tuning requirements. This feature simplifies the process of deploying Adam in practical applications, as users can leverage default parameter values with confidence in many cases. The paper delves into the connections between Adam and related algorithms that inspired its development, providing insights into the algorithm\'s conceptual foundations.\r\n\r\nThe theoretical convergence properties of Adam are thoroughly analyzed in the paper. The authors provide a regret bound on the convergence rate, comparing favorably to the best-known results under the online convex optimization framework. This theoretical underpinning enhances the credibility of Adam as a reliable optimization tool with provable convergence guarantees.\r\n\r\nEmpirical validation is a crucial aspect of assessing the practical efficacy of any optimization algorithm, and Adam does not disappoint in this regard. The paper presents empirical results that showcase the algorithm\'s strong performance in practice. Comparative analyses with other stochastic optimization methods underscore Adam\'s competitiveness and highlight its effectiveness across a range of scenarios.\r\n\r\nIn the latter part of the paper, the authors introduce AdaMax, a variant of Adam based on the infinity norm. This extension reflects the algorithm\'s adaptability and the authors\' commitment to exploring variations that can further enhance performance in specific contexts.\r\n\r\nIn summary, the introduction of Adam represents a significant contribution to the field of optimization. Its combination of simplicity, efficiency, memory economy, and adaptability to various challenges positions it as a valuable tool for researchers and practitioners alike. The algorithm\'s strong theoretical foundations, intuitive hyper-parameters, and empirical success underscore its relevance and impact in the domain of stochastic gradient-based optimization.', 'In this seminal paper, the authors introduce Adam, an algorithm designed for first-order gradient-based optimization of stochastic objective functions. Adam stands out for its efficiency, ease of implementation, and adaptability to a wide range of optimization challenges, making it a compelling choi...', 0, NULL, 'papers/3.pdf', '2024-01-28'),
(36, 16, 'Generative Adversarial Nets', 'Ian J. Goodfellow, Jean Pouget-Abadie, Mehdi Mirza, Bing Xu David Warde-Farley, Sherjil Ozair Aaron Courville, Yoshua Bengio', 'In this groundbreaking paper, the authors introduce a novel framework for estimating generative models through an adversarial process, presenting a paradigm-shifting approach to training generative and discriminative models simultaneously. This innovative method involves training two models, a generative model G that captures the underlying data distribution and a discriminative model D that evaluates the likelihood of a sample originating from the training data rather than from the generative model G.\r\n\r\nThe training process for the generative model G is unique and intriguing—it aims to maximize the probability of the discriminative model D making a mistake. This adversarial training framework can be conceptualized as a minimax two-player game, where the generative and discriminative models engage in a strategic competition. This dynamic approach leads to a solution in the space of arbitrary functions G and D, resulting in a unique equilibrium where G accurately captures the training data distribution, and D remains constant at 1/2 across the entire space.\r\n\r\nAn interesting aspect of this proposed framework is its applicability to models defined by multilayer perceptrons. In such cases, the entire system can be effectively trained using backpropagation, avoiding the need for intricate Markov chains or unrolled approximate inference networks during both the training and generation phases. This makes the approach computationally efficient and accessible, providing a streamlined solution for training generative models.\r\n\r\nThe absence of Markov chains or unrolled approximate inference networks simplifies the training and generation processes, contributing to the elegance and efficiency of the proposed framework. By leveraging backpropagation in the context of multilayer perceptrons, the authors eliminate the need for computationally expensive components, making the method not only conceptually appealing but also practically feasible.\r\n\r\nTo validate the efficacy of the proposed framework, the authors conduct a series of experiments that include both qualitative and quantitative evaluations of the generated samples. These experiments serve to demonstrate the potential and robustness of the adversarial training approach, showcasing its ability to produce high-quality samples that align with the underlying data distribution. The qualitative evaluation provides visual insights into the diversity and realism of the generated samples, while the quantitative assessment offers a rigorous measure of the framework\'s performance.\r\n\r\nIn conclusion, this paper introduces a transformative framework for estimating generative models through an adversarial process, where the interplay between a generative model G and a discriminative model D leads to a unique equilibrium. The elegant simplicity of the proposed approach, coupled with its effectiveness in training and generating high-quality samples, positions it as a compelling contribution to the field of generative modeling. The experimental validation further solidifies the potential of this framework, inspiring confidence in its applicability and impact on advancing the state of the art in generative model training.', 'In this groundbreaking paper, the authors introduce a novel framework for estimating generative models through an adversarial process, presenting a paradigm-shifting approach to training generative and discriminative models simultaneously. This innovative method involves training two models, a gener...', 0, NULL, 'papers/4.pdf', '2024-01-28'),
(37, 17, 'Going Deeper with Convolutions', 'Christian Szegedy, Wei Liu, Yangqing Jia, Pierre Sermanet, Scott Reed Dragomir Anguelov Dumitru Erhan Vincent Vanhoucke Andrew Rabinovich', 'In this pioneering work, the authors introduce a revolutionary deep convolutional neural network (CNN) architecture named Inception, which not only attains a new state-of-the-art performance but also redefines the landscape of classification and detection tasks in the ImageNet Large-Scale Visual Recognition Challenge 2014 (ILSVRC14). The distinguishing feature of the Inception architecture lies in its remarkable ability to maximize the utilization of computational resources within the network, representing a significant leap forward in the field of deep learning.\r\n\r\nA key innovation of the Inception architecture is the strategic enhancement of the network\'s depth and width, all the while maintaining a constant computational budget. This careful design choice reflects a nuanced understanding of the intricate relationship between model complexity and computational efficiency. The authors achieve this delicate balance by incorporating architectural modifications that harness the potential of Hebbian principles, which emphasize the importance of capturing patterns and connections between neurons, and the intuitive concept of multi-scale processing.\r\n\r\nBy drawing inspiration from the Hebbian principle, the Inception architecture exhibits a keen focus on learning representations that capture meaningful patterns and relationships within the data. This attention to detail is critical for achieving superior performance in complex visual recognition tasks, such as classification and detection. Additionally, the incorporation of multi-scale processing further contributes to the effectiveness of the model in handling features at various levels of granularity, enabling it to comprehend intricate details and global structures simultaneously.\r\n\r\nThe specific instantiation of the Inception architecture, known as GoogLeNet, represents a notable achievement with its staggering depth of 22 layers. GoogLeNet serves as the model of choice for the authors\' submission to the ILSVRC14, where it undergoes rigorous evaluation in the context of both classification and detection tasks. The quality of GoogLeNet is a testament to the success of the architectural decisions informed by Hebbian principles and multi-scale processing intuition.\r\n\r\nIn the realm of classification, GoogLeNet stands out by achieving unprecedented accuracy and outperforming its predecessors. The depth and width augmentation contribute to the model\'s ability to capture intricate features and nuanced patterns within the images, leading to enhanced discriminative power. The improvements in classification accuracy, when compared to previous architectures, underscore the efficacy of the Inception architecture in advancing the state of the art.\r\n\r\nEqually impressive is the impact of Inception on object detection tasks. The enhanced depth allows GoogLeNet to develop a richer hierarchy of features, facilitating the accurate localization and recognition of objects within images. This is particularly crucial in real-world applications where robust detection is imperative. The Inception architecture, through GoogLeNet, showcases its versatility by excelling not only in classification but also in tasks demanding precise object detection.\r\n\r\nThe success of Inception extends beyond numerical achievements and transcends into the broader landscape of computational efficiency. The ability to achieve state-of-the-art performance with a constant computational budget is a testament to the ingenuity of the design choices incorporated into Inception. This efficiency is paramount in real-world applications, where computational resources are often limited, and the demand for high-performance models is ever-growing.\r\n\r\nIn conclusion, the introduction of the Inception architecture, and its exemplary instantiation in GoogLeNet, represents a paradigm shift in the field of deep learning. The meticulous design choices driven by Hebbian principles and multi-scale processing intuition have not only propelled the model to achieve unprecedented accuracy in classification and detection tasks but have also showcased the potential for maximizing computational resources within a neural network. As the field continues to evolve, Inception stands as a beacon of innovation, inspiring future advancements and setting new standards in the pursuit of excellence in deep neural network architectures.', 'In this pioneering work, the authors introduce a revolutionary deep convolutional neural network (CNN) architecture named Inception, which not only attains a new state-of-the-art performance but also redefines the landscape of classification and detection tasks in the ImageNet Large-Scale Visual Rec...', 1, '2023-10-02', 'papers/5.pdf', '2024-01-28'),
(38, 17, 'Bagging Predictors', 'LEO BBEIMAN', 'Bagging predictors, a powerful ensemble learning technique, involves the creation of multiple versions of a predictor and subsequently aggregating them to form a robust and accurate model. This methodology is particularly effective for both classification and regression tasks. In essence, bagging relies on the principle of bootstrap replicates to generate diverse learning sets, allowing for the construction of varied predictors. The final aggregated predictor is derived through methods such as averaging for numerical outcomes or a plurality vote for classification tasks.\r\n\r\nThe process begins by forming bootstrap replicates of the original learning set. Bootstrap sampling involves randomly selecting instances from the original dataset with replacement, creating subsets of data that may contain duplicate observations. These subsets serve as the foundation for constructing different versions of the predictor. By introducing variability through bootstrap replicates, bagging addresses the issue of instability in prediction methods.\r\n\r\nThe success of bagging is intricately tied to the notion of instability in prediction methods. When the prediction method is sensitive to perturbations in the learning set, meaning that slight changes in the training data can lead to significant variations in the constructed predictor, bagging becomes a potent tool for enhancing accuracy. The ensemble learning strategy leverages the diversity introduced by the multiple predictors to mitigate the impact of outliers, noise, or other sources of instability that may adversely affect the performance of individual models.\r\n\r\nExtensive empirical evidence, derived from tests conducted on both real-world and simulated datasets, underscores the effectiveness of bagging across various scenarios. The experiments involve employing classification and regression trees as well as subset selection in linear regression. The consistent observation is that bagging can yield substantial gains in predictive accuracy, especially when the underlying prediction method exhibits instability.\r\n\r\nFor classification tasks, the aggregation of predictions through a plurality vote results in a more robust and reliable classification model. By combining the outputs of multiple predictors, bagging reduces the risk of overfitting to noise or outliers present in the training data. The ensemble nature of bagging helps the model generalize well to unseen instances, enhancing its predictive power on new, unseen data.\r\n\r\nIn regression scenarios, bagging achieves accuracy improvement by averaging the predictions of individual models. This averaging process helps smooth out fluctuations and uncertainties in predictions, resulting in a more stable and accurate predictor for numerical outcomes. The aggregated model is less susceptible to the influence of outliers or peculiarities in the training set, contributing to a more robust regression model.\r\n\r\nA key advantage of bagging is its versatility, demonstrated by its successful application to diverse prediction methods. The empirical results establish bagging as a go-to strategy for improving the accuracy and stability of predictive models. Moreover, the technique offers a practical solution for scenarios where the prediction method\'s instability poses a challenge to achieving reliable and accurate results.\r\n\r\nIn conclusion, bagging predictors stands as a powerful and widely applicable ensemble learning technique that significantly enhances predictive accuracy in both classification and regression tasks. Through the creation of diverse predictors using bootstrap replicates and the subsequent aggregation of their outputs, bagging addresses the issue of instability in prediction methods. The empirical evidence from experiments on various datasets and prediction methods underscores the consistent gains in accuracy achieved by bagging. Its ability to mitigate the impact of instability makes bagging a valuable tool in the machine learning toolbox, contributing to the development of more robust and reliable predictive models.', 'Bagging predictors, a powerful ensemble learning technique, involves the creation of multiple versions of a predictor and subsequently aggregating them to form a robust and accurate model. This methodology is particularly effective for both classification and regression tasks. In essence, bagging re...', 0, NULL, 'papers/6.pdf', '2024-01-28'),
(39, 17, 'Attention Is All You Need', 'Ashish Vaswani,Noam Shazeer, Niki Parmar, Jakob Uszkoreit', 'In this groundbreaking study, the authors challenge the prevailing paradigm of sequence transduction models, introducing a revolutionary network architecture known as the Transformer. While dominant models in this domain typically rely on intricate recurrent or convolutional neural networks comprising an encoder and a decoder, the Transformer takes a departure from tradition, building exclusively on attention mechanisms and completely discarding the need for recurrence and convolutions.\r\n\r\nThe heart of the Transformer\'s innovation lies in its attention mechanisms, facilitating superior model performance with increased parallelizability and significantly reduced training time. The absence of recurrence and convolutions streamlines the architecture, making it not only more efficient but also more adaptable to various tasks.\r\n\r\nExperimental validation on two machine translation tasks demonstrates the remarkable capabilities of the Transformer architecture. In the WMT 2014 English-to-German translation task, the Transformer achieves a BLEU score of 28.4, surpassing existing best results, including ensembles, by an impressive margin of over 2 BLEU. The significance of this improvement is underscored by the fact that it not only enhances translation quality but also substantially reduces the time required for training.\r\n\r\nIn the case of the WMT 2014 English-to-French translation task, the Transformer sets a new benchmark by establishing a single-model state-of-the-art BLEU score of 41.8. Remarkably, this achievement is attained after a mere 3.5 days of training on eight GPUs, presenting a cost-effective alternative to the resource-intensive training processes of existing literature models. The Transformer\'s ability to deliver such exceptional results with reduced training costs is a testament to its efficiency and generalization capabilities.\r\n\r\nThe versatility of the Transformer extends beyond machine translation tasks. The authors showcase its adaptability by successfully applying it to English constituency parsing, demonstrating competence with both large and limited training datasets. This versatility positions the Transformer as a robust and flexible architecture that can transcend the boundaries of specific tasks.\r\n\r\nOne of the key advantages of the Transformer is its improved parallelizability, allowing for more efficient use of computational resources during training. This parallel processing capability not only expedites training times but also enhances scalability, enabling the model to handle larger datasets and more complex tasks with ease.\r\n\r\nThe results presented in this study not only challenge the established norms in sequence transduction models but also open up new possibilities for efficient and high-performance neural network architectures. The Transformer\'s ability to outperform existing models on translation tasks while drastically reducing training costs signifies a significant leap forward in the field of natural language processing and machine learning. As the Transformer continues to demonstrate its prowess across various applications, it paves the way for the evolution of neural network architectures, redefining the standards for efficiency and performance in the realm of sequence transduction models.', 'In this groundbreaking study, the authors challenge the prevailing paradigm of sequence transduction models, introducing a revolutionary network architecture known as the Transformer. While dominant models in this domain typically rely on intricate recurrent or convolutional neural networks comprisi...', 0, NULL, 'papers/7.pdf', '2024-01-28'),
(40, 17, 'A Review of Algorithms and Hardware Implementations for Spiking Neural Networks', 'Duy-Anh Nguyen, Xuan-Tu Tran, Francesca Iacopi ', 'Deep Learning (DL) has undeniably revolutionized various applications, ranging from image recognition to complex tasks such as mastering the game of Go. The formidable success of DL, however, comes with a significant computational cost, posing challenges when porting DL applications to conventional hardware platforms. In response to this challenge, Spiking Neural Networks (SNN) have emerged as promising candidates for achieving more energy-efficient solutions. SNNs represent the third generation of Artificial Neural Networks (ANNs), introducing a novel communication paradigm where neurons communicate using discrete spikes in an event-based manner.\r\n\r\nThe distinguishing feature of SNNs lies in their potential to offer superior energy efficiency compared to their ANN counterparts. The event-driven communication mechanism allows SNNs to leverage the inherent sparsity in neural activity, reducing the computational workload and, consequently, energy consumption. While it is acknowledged that SNN models may exhibit a certain level of accuracy loss compared to traditional ANNs, recent advancements in algorithms have made significant strides in bridging this accuracy gap.\r\n\r\nThe primary focus of this work is to delve into the realm of SNNs, exploring their fundamental background, the current state of training algorithms, and their implementations on various hardware platforms. By gaining a comprehensive understanding of these aspects, we aim to shed light on the potential of SNNs in addressing the computational challenges associated with DL applications.\r\n\r\nTo begin, it is essential to appreciate the foundational principles of SNNs. Unlike conventional ANNs, where neurons communicate continuously, SNNs employ discrete spikes for communication in an event-driven manner. This paradigm shift allows for more efficient utilization of resources, making SNNs an attractive alternative for energy-conscious applications.\r\n\r\nTraining algorithms play a pivotal role in the effectiveness of any neural network, and SNNs are no exception. The review will delve into the current state and challenges of training algorithms tailored for SNNs. While the inherently discrete and event-based nature of SNNs poses unique challenges, innovative algorithms have been developed to enhance their training efficiency and, consequently, their performance in real-world applications.\r\n\r\nHardware implementations of SNNs have garnered considerable attention within the neuromorphic hardware research community. The efficiency gains promised by SNNs align with the growing demand for energy-efficient hardware solutions. Exploring the current landscape of SNN implementations on various hardware platforms will provide insights into the practical feasibility and scalability of SNNs in real-world applications.\r\n\r\nIn conclusion, this review embarks on a journey through the landscape of Spiking Neural Networks, unraveling their foundational principles, assessing the current state of training algorithms, and examining their hardware implementations. As the demand for energy-efficient solutions intensifies, the unique characteristics of SNNs position them as promising contenders for addressing the computational challenges posed by Deep Learning applications. By understanding the advancements and challenges in this field, we pave the way for the continued evolution and integration of SNNs in the landscape of neural network architectures.', 'Deep Learning (DL) has undeniably revolutionized various applications, ranging from image recognition to complex tasks such as mastering the game of Go. The formidable success of DL, however, comes with a significant computational cost, posing challenges when porting DL applications to conventional ...', 0, NULL, 'papers/8.pdf', '2024-01-28'),
(41, 18, 'Internet of Things: A Review on Theory Based Impedance Matching Techniques for Energy Efficient RF Systems', 'Benoit Couraud , Remy Vauche , Spyridon Nektarios Daskalakis  , David Flynn  , Thibaut Deleruyelle, Edith Kussener, Stylianos Assimonis ', 'In an era of escalating connectivity and the widespread integration of Internet of Things (IoT) applications, the burgeoning challenge lies in optimizing power consumption and data transfer efficiency. The proliferation of IoT devices necessitates a meticulous approach to Radio Frequency (RF) system design, where the quest for maximal power gain confronts obstacles such as impedance mismatches and suboptimal configurations. At present, the power efficiency of an RF system hinges on the synergy between efficiently designed commercial chips and intricate RF simulations that validate bespoke configurations.\r\n\r\nA critical consideration in this landscape is the impedance matching between the transmitter\'s chip and its antenna. Even if a standard 50 Ω transmitter\'s chip boasts an efficiency of 90%, coupling it with a conventional antenna of 72 Ω can lead to a substantial 10% reduction in the overall power efficiency of the RF system. This underscores the imperative for scalable IoT networks to employ optimal RF system designs tailored for each transceiver.\r\n\r\nThis work introduces a versatile design framework rooted in established theoretical methods, including transducer gain, power wave approach, and transmission line theory. The framework aims not only to streamline the computational complexities associated with designing and prototyping power-efficient RF systems but also to enhance the precision of the analysis. The design framework addresses the constituent elements of a typical RF system, encompassing an antenna, a matching network, a load (such as an integrated circuit), and the transmission lines that interconnect these components.\r\n\r\nThe overarching goal is to deliver optimal power to the load within the RF system. By leveraging theoretical foundations and explanatory analyses, the design framework seeks to provide a more efficient and accurate means of achieving this objective. Simulated and measured results across a broad 0–4 GHz spectrum validate the effectiveness and precision of the proposed design framework.\r\n\r\nTo illustrate the practical benefits of the RF design framework, a case study is presented, focusing on the design of an RF system tailored for Bluetooth applications. The case study serves as a testament to the advantages conferred by the comprehensive and versatile design framework, showcasing its ability to navigate the intricacies of RF system design in a real-world application context.\r\n\r\nIn conclusion, as the IoT landscape continues to expand, the demand for power-efficient RF systems becomes paramount. The proposed design framework stands as a beacon, offering a systematic and theoretically grounded approach to RF system design. Its versatility, coupled with the ability to enhance accuracy and streamline computational efforts, positions it as a valuable tool in the arsenal of IoT developers and researchers striving to optimize the performance of RF systems across diverse applications.', 'In an era of escalating connectivity and the widespread integration of Internet of Things (IoT) applications, the burgeoning challenge lies in optimizing power consumption and data transfer efficiency. The proliferation of IoT devices necessitates a meticulous approach to Radio Frequency (RF) system...', 1, '2023-12-05', 'papers/9.pdf', '2024-01-28'),
(42, 18, 'AST-2: Single and bi-layered 2-D acoustic soft tactile skin', ' Vishnu Rajendran , Simon Parsons1 and Amir Ghalamzan E', 'This paper introduces a cutting-edge and economically viable design for Acoustic Soft Tactile (AST) Skin, strategically crafted to substantially enhance the accuracy of 2-D tactile feature estimation. The primary hurdle in tactile feature estimation, particularly in capturing precise contact geometry characteristics, demands cost-effective solutions. In response to this challenge, our hypothesis posits that harnessing acoustic energy through dedicated channels embedded in two layers beneath the sensing surface, coupled with the analysis of amplitude modulation, can effectively decode interactions on the sensory surface, leading to a significant improvement in tactile feature estimation.\r\n\r\nOur approach involves the innovative separation of hardware components responsible for emitting and receiving acoustic signals, resulting in a modular and highly customizable skin design. Through practical tests, we validate the efficacy of this novel design, demonstrating remarkable precision in estimating key tactile parameters. Specifically, the AST skin achieves notable accuracy in estimating contact normal forces (Mean Absolute Error, MAE < 0.8 N), 2D contact localization (MAE < 0.7 mm), and contact surface diameter (MAE < 0.3 mm).\r\n\r\nThe distinguishing feature of the AST skin lies in its ability to effectively address the challenge of tactile feature estimation. The modular architecture, with distinct hardware components, enhances adaptability and customization for diverse applications. The presented results not only attest to the AST skin\'s efficacy in precisely estimating various tactile features but also underscore its practicality and cost-effectiveness, making it a compelling solution for robotic applications.\r\n\r\nIn conclusion, the AST skin, with its innovative design and modular architecture, emerges as a successful solution to the intricate task of tactile feature estimation. By showcasing remarkable precision in practical tests, it establishes itself as a practical and cost-effective choice for robotic applications. The unique combination of acoustic energy utilization and modular design positions the AST skin as a frontrunner in advancing the field of tactile sensing, offering a promising avenue for enhanced robotic interactions in various domains.', 'This paper introduces a cutting-edge and economically viable design for Acoustic Soft Tactile (AST) Skin, strategically crafted to substantially enhance the accuracy of 2-D tactile feature estimation. The primary hurdle in tactile feature estimation, particularly in capturing precise contact geometr...', 1, '2024-01-28', 'papers/10.pdf', '2024-01-28'),
(43, 18, 'Learning to navigate efficiently and precisely in real environments', 'Guillaume Bono, Herv´e Poirier, Leonid Antsfeld, Gianluca Monaci, Boris Chidlovskii, Christian Wolf', 'In the realm of autonomous navigation for terrestrial robots, the development of realistic models for agent dynamics and sensing plays a pivotal role. This practice is widespread in both academic literature and commercial applications, where these models are harnessed for model-based control, localization, and mapping. On the flip side, the more recent advancements in Embodied AI literature have taken a divergent path, focusing on the training of modular or end-to-end agents within simulators such as Habitat or AI-Thor. Here, the emphasis is primarily on achieving photorealistic rendering and scene diversity, with less priority given to high-fidelity robot motion. This dichotomy between traditional robotics literature and the evolving Embodied AI paradigm has given rise to a notable sim2real gap, significantly affecting the successful transfer of trained models to real robotic platforms.\r\n\r\nIn response to this challenge, our work delves into the realm of end-to-end training for agents within simulations, aiming to minimize the sim2real gap in both sensing and actuation domains. Unlike traditional approaches, our agent is designed to directly predict discretized velocity commands, which are subsequently executed through closed-loop control on the real robot. To further bridge the sim2real gap, we take a novel approach by identifying and simulating the behavior of the real robot, including its underlying low-level controller, within a modified Habitat simulator. Additionally, we introduce noise models for odometry and localization to contribute to the reduction of the sim2real gap.\r\n\r\nThe core innovation in our approach lies in the integration of end-to-end training within simulation settings that closely mirror real-world scenarios. By directly predicting velocity commands, our agent learns to navigate and interact with its environment in a manner that is conducive to real-world execution. The incorporation of closed-loop control ensures that the simulated predictions translate seamlessly into real-world actions, minimizing the discrepancies between simulation and reality.\r\n\r\nOur evaluation extends to real-world navigation scenarios, where we explore various localization and point goal calculation methods. The results of our experiments reveal substantial gains in performance and robustness compared to prior work. By tackling the sim2real gap from both sensing and actuation perspectives, our approach demonstrates the potential to enhance the transferability of trained models to real robotic platforms.\r\n\r\nIn conclusion, our work represents a significant step towards closing the sim2real gap in the context of autonomous navigation for terrestrial robots. The incorporation of end-to-end training within simulation settings, coupled with the direct prediction of velocity commands, showcases a novel paradigm that aligns simulated agent behavior more closely with real-world execution. The reported gains in performance and robustness underscore the potential impact of our approach on advancing the field of autonomous robotics. As we continue to bridge the gap between simulation and reality, we pave the way for more effective and reliable deployment of robotic systems in diverse environments.', 'In the realm of autonomous navigation for terrestrial robots, the development of realistic models for agent dynamics and sensing plays a pivotal role. This practice is widespread in both academic literature and commercial applications, where these models are harnessed for model-based control, locali...', 0, NULL, 'papers/11.pdf', '2024-01-28'),
(44, 18, 'Equitable Persistent Coverage of Non-Convex Environments with Graph-Based Planning', 'Jose Manuel Palacios-Gas , Danilo Tardioli, Eduardo Montijano, Carlos Sagues', 'This paper addresses the challenging problem of achieving persistent coverage in a complex non-convex environment using a team of robots. The scenarios considered involve environments where the quality of coverage deteriorates over time, necessitating continuous revisits to every point within the space. Our proposed solution comprises two key steps aimed at optimizing the coverage process and ensuring efficiency in a dynamic and evolving environment.\r\n\r\nIn the initial step of our approach, we focus on finding a partition of the environment that distributes the workload equally among the robots. This distribution is weighted by the importance of each point in the environment. To achieve this, we employ a power diagram and develop a distributed control law on the power weights. The distributed control law is designed to be provably correct and ensures an equitable partition. Notably, our solution stands out from existing methods by addressing a continuous environment formulation with non-convex obstacles, thereby expanding the applicability of partitioning techniques to more realistic scenarios.\r\n\r\nMoving to the second step of our solution, each robot is tasked with computing a graph that captures sweep-like paths, enabling comprehensive coverage within its designated partition. At each planning iteration, the coverage error at the vertices of the graph is assigned as weights to the corresponding edges. This strategic assignment facilitates the identification of an optimal open coverage path through the graph, considering the coverage error per unit distance traversed. By incorporating this optimization approach, our solution ensures that the robots efficiently navigate the environment, minimizing the coverage error while maximizing the distance covered.\r\n\r\nTo validate the effectiveness of our proposal, we present simulation and experimental results. These results serve as empirical evidence of the capabilities and performance of our two-step solution in real-world scenarios. The simulation results offer insights into the robustness and efficiency of the proposed approach under varying environmental conditions, providing a foundation for its practical implementation. The experimental results further demonstrate the feasibility and effectiveness of our solution in a physical setting, showcasing its potential for real-world applications.\r\n\r\nIn conclusion, our paper introduces a comprehensive and effective solution to the persistent coverage problem in complex non-convex environments using a team of robots. The combination of equitable partitioning through a power diagram and the optimization of coverage paths using graph-based techniques establishes a versatile and robust approach. The consideration of continuous environments with non-convex obstacles enhances the practicality and realism of our solution. Simulation and experimental validations underline the promising performance of our proposed solution, paving the way for its application in diverse scenarios requiring persistent coverage by robotic teams.', 'This paper addresses the challenging problem of achieving persistent coverage in a complex non-convex environment using a team of robots. The scenarios considered involve environments where the quality of coverage deteriorates over time, necessitating continuous revisits to every point within the sp...', 0, NULL, 'papers/12.pdf', '2024-01-28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Avatar` varchar(255) NOT NULL DEFAULT 'img/test.png',
  `IsAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `IsSuperuser` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `Username`, `Email`, `Password`, `Avatar`, `IsAdmin`, `IsSuperuser`) VALUES
(13, 'adminAcc', 'adminAcc@gmail.com', '$2y$10$leabMsDcJYKxqTwCo2RWf.2OQnNXL0bElGT9k8KazUNh27P553HVS', 'img/admin.png', 1, 0),
(14, 'normalAcc', 'normalAcc@gmail.com', '$2y$10$SLI/0038vPZOivOChSz78O.ogUn.Gy6YINBOyQ11xloedDjo.qZ76', 'img/test.png', 0, 1),
(16, 'gerindAcc', 'gerindAcc@gmail.com', '$2y$10$Mynu8C5QwL3QNpHj1EelWeve8PIVi/VMgEbKyXtADlzvXkp4GO3N6', 'img/test.png', 0, 0),
(17, 'florianAcc', 'florianAcc@gmail.com', '$2y$10$dnjOyFdutxKitCh7kinTZOgymS831nAbnyR7UqnrzJioWAReu3QTa', 'img/test.png', 0, 0),
(18, 'sofiAcc', 'sofiAcc@gmail.com', '$2y$10$wvLNWDUxAC1s59JC66YEouiGcL8/mbJkctsXfDrpmNN0ipMfvUmKq', 'img/test.png', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Indexes for table `categorytopaper`
--
ALTER TABLE `categorytopaper`
  ADD PRIMARY KEY (`CategoryID`,`PaperID`),
  ADD KEY `category_fk` (`CategoryID`),
  ADD KEY `paper_fk` (`PaperID`);

--
-- Indexes for table `categorytouser`
--
ALTER TABLE `categorytouser`
  ADD PRIMARY KEY (`CategoryID`,`UserID`),
  ADD KEY `category_fk` (`CategoryID`),
  ADD KEY `user_fk` (`UserID`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`CommentID`),
  ADD KEY `fk_comments_user` (`UserID`),
  ADD KEY `fk_comments_paper` (`PaperID`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`UserID`,`PaperID`),
  ADD KEY `user_fk` (`UserID`),
  ADD KEY `paper_fk` (`PaperID`);

--
-- Indexes for table `papers`
--
ALTER TABLE `papers`
  ADD PRIMARY KEY (`PaperID`),
  ADD KEY `fk_papers_user` (`UserID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `CommentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `papers`
--
ALTER TABLE `papers`
  MODIFY `PaperID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_paper` FOREIGN KEY (`PaperID`) REFERENCES `papers` (`PaperID`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_comments_user` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `fk_favorite_user` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE;

--
-- Constraints for table `papers`
--
ALTER TABLE `papers`
  ADD CONSTRAINT `fk_papers_user` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
