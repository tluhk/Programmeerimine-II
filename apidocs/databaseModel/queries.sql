/* users */
SELECT firstName, lastName, email, role FROM users;
SELECT firstName, lastName, email, role FROM users WHERE id=1;
SELECT * FROM users WHERE email='juhan@juurikas.ee' AND deletedDate IS NULL;

/* Statuses */
SELECT * FROM statuses;
SELECT * FROM statuses WHERE id=1 AND deletedDate IS NULL;

/* Comments */
SELECT * FROM comments;
SELECT * FROM comments WHERE id=1 AND deletedDate IS NULL;

/* Posts */
SELECT * FROM posts;
SELECT * FROM posts WHERE id=1;
SELECT P.id, P.content, P.createdDate, P.updatedDate, U.id, U.email
	FROM
		posts P
    INNER JOIN
		users U ON P.userId = U.id
	WHERE
		P.id=1 AND P.statusId=(SELECT id FROM statuses WHERE status='Public') AND P.deletedDate IS NULL;
        
SELECT P.id, P.content, P.createdDate, P.updatedDate, S.status
	FROM
		posts P
    INNER JOIN
		statuses S ON P.statusId = S.id
	WHERE
		P.userId=1 AND P.deletedDate IS NULL;
