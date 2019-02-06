# ACR_SQL

-- 1a
-- SELECT a.first_name, a.last_name
-- FROM actor a

-- 1b
-- SELECT CONCAT(a.first_name, ' , ', a.last_name) AS Actor_Name
-- FROM actor a

-- 2a
-- SELECT a.actor_id, a.first_name, a.last_name
-- FROM actor a
-- Where a.first_name = 'Joe'

-- 2b
-- SELECT a.actor_id, a.first_name, a.last_name
-- FROM actor a
-- WHERE a.last_name LIKE '%GEN%'

-- 2c
-- SELECT a.actor_id, a.first_name, a.last_name
-- FROM actor a
-- WHERE a.last_name LIKE '%LI%'
-- ORDER BY a.last_name DESC


-- 2d
-- SELECT c.country, c.country_id
-- FROM country c
-- WHERE c.country IN ('Afghanistan', 'Bangladesh', 'China')

-- 3a
-- ALTER TABLE actor
--   ADD COLUMN description BLOB

-- 3b
-- ALTER TABLE actor
--   DROP COLUMN description

-- 4a
-- SELECT a.last_name, COUNT(*)
-- FROM actor a
-- GROUP BY a.last_name
-- ORDER BY COUNT(*) DESC

-- 4B
-- SELECT a.last_name, COUNT(a.last_name)
-- FROM actor a
-- GROUP BY 1
-- HAVING COUNT(a.last_name) >= 2
-- ORDER BY 2 DESC

-- 4c
-- UPDATE actor
-- SET first_name = 'HARPO'
-- WHERE actor_id = '172'

-- 4d
-- UPDATE actor
-- SET first_name = 'GROUCHO'
-- WHERE actor_id = '172'

-- SELECT a.actor_id, a.first_name, a.last_name
-- FROM actor a
-- WHERE a.actor_id = '172'

-- 5a
-- SHOW CREATE TABLE address

-- 6a
-- SELECT s.first_name, s.last_name, ad.address
-- FROM staff s
-- 	LEFT JOIN address ad ON s.address_id = ad.address_id

-- 6b
-- SELECT s.first_name, s.last_name, SUM(p.amount) as August_2005_Sales
-- FROM payment p
-- 	JOIN staff s ON p.staff_id = s.staff_id 
-- WHERE MONTH(p.payment_date) = '8' AND YEAR(p.payment_date) = '2005'
-- GROUP BY 1,2
-- ORDER BY 3 DESC

-- 6c
-- SELECT fa.film_id, f.title, COUNT(fa.actor_id)
-- FROM film f
-- 	INNER JOIN film_actor fa ON f.film_id = fa.film_id
-- GROUP BY 1, 2
-- ORDER BY 3 DESC

-- 6d
-- SELECT f.title, COUNT(*)
-- from film f
-- 	JOIN inventory i ON i.film_id = f.film_id
-- WHERE f.title = 'Hunchback Impossible'


-- 6e
-- SELECT c.first_name, c.last_name, SUM(p.amount)
-- from customer c
-- 	JOIN payment p ON c.customer_id = p.customer_id
-- GROUP BY 1,2
-- ORDER BY 2 ASC

-- 7a
-- SELECT t.title, t.name
-- FROM (SELECT f.title, l.name
-- 	FROM film f
-- 		JOIN language l 
-- 		ON f.language_id = l.language_id 
-- 	WHERE f.title LIKE ('Q%') OR f.title LIKE ('K%')) AS t
-- WHERE t.name = 'English'

-- 7b
-- SELECT fa.film_id, f.title, a.first_name, a.last_name
-- FROM film f
-- 	INNER JOIN film_actor fa ON f.film_id = fa.film_id
-- 	INNER JOIN actor a ON fa.actor_id = a.actor_id
-- WHERE f.title = 'Alone Trip'

-- 7c
-- SELECT c.first_name, c.last_name, co.country, c.email
-- FROM customer c
-- 	JOIN address a ON c.address_id = a.address_id
-- 	JOIN city ci ON a.city_id = ci.city_id
-- 	JOIN country co ON ci.country_id = co.country_id
-- WHERE co.country = 'Canada'

-- 7d
-- SELECT f.title, c.name
-- FROM category c
-- 	JOIN film_category fc ON c.category_id = fc.category_id
-- 	JOIN film f ON fc.film_id = f.film_id
-- WHERE c.name = 'Family'

-- 7e
-- SELECT f.title, COUNT(*)
-- FROM rental r
-- 	JOIN inventory i ON r.inventory_id = i.inventory_id
-- 	JOIN film f ON i.film_id = f.film_id
-- GROUP BY 1
-- ORDER BY 2 DESC

-- 7f
-- SELECT st.store_id as Location, SUM(p.amount) as Sales
-- FROM payment p
-- 	JOIN staff s on p.staff_id = s.staff_id
-- 	JOIN store st ON s.store_id = st.store_id
-- GROUP BY 1
-- ORDER BY 2 DESC

-- 7g
-- SELECT a.address, c.city, co.country
-- FROM store s
-- 	join address a ON s.address_id = a.address_id
-- 	join city c on a.city_id = c.city_id
-- 	join country co ON c.country_id = co.country_id

-- 7h
-- SELECT c.name AS Movie_Genres, SUM(p.amount) as Gross_Revenue
-- FROM category c
-- 	JOIN film_category fc ON c.category_id = fc.category_id
-- 	JOIN inventory i ON fc.film_id = i.film_id
-- 	JOIN rental r ON i.inventory_id = r.inventory_id
-- 	JOIN payment p ON r.rental_id = p.rental_id
-- GROUP BY 1
-- ORDER BY 2 DESC
-- LIMIT 5

-- 8a
-- CREATE VIEW TOP_5_GENRE_REVENUE
-- AS SELECT c.name AS Movie_Genres, SUM(p.amount) as Gross_Revenue
-- FROM category c
-- 	JOIN film_category fc ON c.category_id = fc.category_id
-- 	JOIN inventory i ON fc.film_id = i.film_id
-- 	JOIN rental r ON i.inventory_id = r.inventory_id
-- 	JOIN payment p ON r.rental_id = p.rental_id
-- GROUP BY 1
-- ORDER BY 2 DESC
-- LIMIT 5

-- 8b
-- SELECT * FROM top_5_genre_revenue

-- 8c
-- DROP VIEW top_5_genre_revenue