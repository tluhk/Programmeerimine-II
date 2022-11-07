DROP SCHEMA `test`;
CREATE SCHEMA IF NOT EXISTS `test`;

CREATE TABLE IF NOT EXISTS `test`.`statuses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NULL,
  `createdDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedDate` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `status_UNIQUE` (`status` ASC) VISIBLE);

CREATE TABLE IF NOT EXISTS `test`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(255) NULL,
  `lastName` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `role` VARCHAR(45) NULL DEFAULT 'User',
  `password` VARCHAR(255) NULL,
  `createdDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedDate` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE IF NOT EXISTS `test`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL,
  `content` LONGTEXT NULL,
  `createdDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedDate` DATETIME NULL DEFAULT NULL,
  `userId` INT NOT NULL,
  `statusId` INT NOT NULL,
  PRIMARY KEY (`id`, `userId`, `statusId`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_posts_users_idx` (`userId` ASC) VISIBLE,
  INDEX `fk_posts_statuses1_idx` (`statusId` ASC) VISIBLE,
  CONSTRAINT `fk_posts_users`
    FOREIGN KEY (`userId`)
    REFERENCES `test`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_posts_statuses1`
    FOREIGN KEY (`statusId`)
    REFERENCES `test`.`statuses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `test`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` LONGTEXT NULL,
  `createdDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedDate` DATETIME NULL DEFAULT NULL,
  `postId` INT NOT NULL,
  `userId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `postId`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_comments_posts1_idx` (`postId` ASC) VISIBLE,
  INDEX `fk_comments_users1_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_comments_posts1`
    FOREIGN KEY (`postId`)
    REFERENCES `test`.`posts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comments_users1`
    FOREIGN KEY (`userId`)
    REFERENCES `test`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

USE test;

/* Statuses */
INSERT INTO statuses (status)
	VALUES
		('Draft'),
		('Public'),
		('Private');

/* Users */
INSERT INTO users (firstName, lastName, email, password, role)
	VALUES
		('Juhan', 'Juurikas', 'juhan@juurikas.ee', '$2b$10$.XOfSwy.cbdtSeFoStKv4e2XyQV2m91i8h.4tBPxbGw7LzTpfYXCu', 'Admin');
INSERT INTO users (firstName, lastName, email, password)
	VALUES
        ('Mati', 'Maasikas', 'mati@maasikas.ee', '$2b$10$oCYuOU5owBZ4lCUz9xpfQuUV6c9oZbEHrUrdpyumXjqSDSWfO3hs.');

/* Posts */
INSERT INTO posts (title, content, userId, statusId)
	VALUES
		('Esimene postitus', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, 2),
        ('Teine postitus', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?', 1, 1),
        ('Kolmas postitus', 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?', 1, 3),
        ('Esimene postitus', 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', 2, 2),
        ('Teine postitus', 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.', 2, 2);

INSERT INTO posts (title, content, userId, statusId, deletedDate)
	VALUES
	('Kustutatud postitus', 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.', 2, 2, NOW());

/* Comments */
INSERT INTO comments (userId, postId, content)
	VALUES
		(2, 1, 'Väga tore postitus, kiidan!'),
        (1, 4, 'Mulle väga meeldib selle postituse sisu ja stiil!');
INSERT INTO comments (postId, content)
	VALUES
        (1, 'Mida Sa sellega mõtled?'),
        (1, 'Kuule halloooo!!!');